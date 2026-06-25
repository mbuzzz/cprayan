import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// This is a secure endpoint that generates a time-limited download URL
// In a real production setup, this would return an AWS S3 Presigned URL.
// For now, it returns a direct file path if verification passes.

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = await params;
  
  try {
    const session = await getServerSession(authOptions);
    
    // In some cases, downloads are allowed without login if the token is valid,
    // but enforcing session is safer for digital products.
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

    return NextResponse.redirect(new URL(mockFilePath, request.url));

  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}