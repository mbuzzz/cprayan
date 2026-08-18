import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { consumeRateLimit } from '@/lib/rate-limit';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    if (!consumeRateLimit(`download:ip:${ip}`, 20, 15 * 60 * 1000)) {
      return NextResponse.json({ error: 'Terlalu banyak permintaan download. Silakan coba lagi nanti.' }, { status: 429 });
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    // 1. Verify the download token
    const orderItem = await prisma.orderItem.findUnique({
      where: { downloadToken: token },
      include: {
        order: true,
        product: true
      }
    });

    if (!orderItem) {
      return NextResponse.json({ error: 'Invalid or expired download token.' }, { status: 403 });
    }

    // 2. Verify ownership
    if (orderItem.order.customerEmail !== session.user.email) {
      return NextResponse.json({ error: 'Forbidden. This product belongs to another account.' }, { status: 403 });
    }

    // 3. Verify order status
    if (orderItem.order.orderStatus !== 'COMPLETED') {
      return NextResponse.json({ error: 'Order not completed yet.' }, { status: 403 });
    }

    // 4. Update download count
    await prisma.orderItem.update({
      where: { id: orderItem.id },
      data: { downloadCount: { increment: 1 } }
    });

    // 5. Generate secure URL
    // In production with AWS S3:
    // const s3Url = await generatePresignedUrl(orderItem.product.filePath);
    // return NextResponse.redirect(s3Url);

    // Mock response for local development since we don't have AWS S3 configured:
    const mockFilePath = orderItem.product.filePath || '#';
    
    if (mockFilePath === '#') {
      return NextResponse.json({ 
        message: 'Download ready. (In production, this would redirect to AWS S3 / Cloudflare R2)',
        fileName: `${orderItem.product.slug}.zip`,
        success: true
      });
    }

    const fileUrl = new URL(mockFilePath, request.url);
    if (fileUrl.origin !== new URL(request.url).origin || !["http:", "https:"].includes(fileUrl.protocol)) {
      return NextResponse.json({ error: "Download URL tidak valid." }, { status: 500 });
    }
    return NextResponse.redirect(fileUrl);

  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}