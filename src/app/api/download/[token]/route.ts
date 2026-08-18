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
    
    // Rate limit downloads by IP (max 20 downloads per 15 minutes)
    if (!consumeRateLimit(`download:ip:${ip}`, 20, 15 * 60 * 1000)) {
      return NextResponse.json({ 
        error: 'Terlalu banyak permintaan unduhan. Silakan coba lagi beberapa saat kemudian.' 
      }, { status: 429 });
    }

    if (!token || !/^[a-f0-9]{32,64}$/i.test(token)) {
      return NextResponse.json({ error: 'Token unduhan tidak valid.' }, { status: 400 });
    }

    // 1. Verify the download token in database
    const orderItem = await prisma.orderItem.findUnique({
      where: { downloadToken: token },
      include: {
        order: true,
        product: true
      }
    });

    if (!orderItem) {
      return NextResponse.json({ 
        error: 'Token unduhan tidak ditemukan atau telah kedaluwarsa.' 
      }, { status: 404 });
    }

    // 2. Verify order payment status
    const isPaid = orderItem.order.orderStatus === 'COMPLETED' || orderItem.order.paymentStatus === 'PAID';
    if (!isPaid) {
      return NextResponse.json({ 
        error: 'Akses unduhan terkunci. Pembayaran pesanan belum terverifikasi lunas.' 
      }, { status: 403 });
    }

    // 3. Optional: Verify session if user is logged in
    const session = await getServerSession(authOptions);
    if (session?.user?.email && (session.user as any).role !== 'ADMIN') {
      if (orderItem.order.customerEmail.toLowerCase() !== session.user.email.toLowerCase()) {
        return NextResponse.json({ 
          error: 'Akses ditolak. Berkas produk ini terdaftar atas akun email lain.' 
        }, { status: 403 });
      }
    }

    // 4. Update download count & audit log
    await prisma.orderItem.update({
      where: { id: orderItem.id },
      data: { downloadCount: { increment: 1 } }
    });

    const mockFilePath = orderItem.product.filePath || '';
    
    if (!mockFilePath || mockFilePath === '#' || mockFilePath === '/files/mock.zip') {
      return NextResponse.json({ 
        success: true,
        message: 'Akses verifikasi sukses! File source code siap diunduh.',
        fileName: `${orderItem.product.slug || 'source-code'}-v1.0.zip`,
        product: orderItem.productName,
        orderId: orderItem.order.orderNumber,
        downloadCount: orderItem.downloadCount + 1,
        license: orderItem.product.license || 'Standard Commercial License',
      });
    }

    const fileUrl = new URL(mockFilePath, request.url);
    if (fileUrl.origin !== new URL(request.url).origin || !["http:", "https:"].includes(fileUrl.protocol)) {
      return NextResponse.json({ error: "URL unduhan berkas tidak aman." }, { status: 500 });
    }

    return NextResponse.redirect(fileUrl);

  } catch (error: any) {
    console.error("Secure download route error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}