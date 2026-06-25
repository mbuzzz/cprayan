import PageHeader from "@/components/PageHeader";
import { CheckCircle, Clock, Copy, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ManualPaymentPage({ searchParams }: { searchParams: { orderId?: string, ref?: string } }) {
  const { orderId } = await searchParams;
  
  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-muted">
        Pesanan tidak ditemukan. <br/><br/>
        <Link href="/products" className="btn-primary mt-4">Kembali ke Produk</Link>
      </div>
    );
  }

  // Fetch Order
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });

  if (!order) notFound();

  // Fetch WhatsApp Number from Settings
  const waSetting = await prisma.siteSetting.findUnique({
    where: { key: 'whatsapp_number' }
  });
  
  // Default fallback if not set in admin
  const adminWa = waSetting?.value || "6281234567890"; 
  
  // Generate WhatsApp Message
  const waMessage = encodeURIComponent(
    `Halo Admin, saya ingin melakukan pembayaran untuk pesanan digital saya.\n\n*Detail Pesanan:*\n- No. Order: ${order.orderNumber}\n- Ref: ${order.referenceNumber}\n- Total: Rp ${order.total.toLocaleString('id-ID')}\n- Nama: ${order.customerName}\n\nMohon info rekening pembayarannya. Terima kasih.`
  );
  
  const waUrl = `https://wa.me/${adminWa}?text=${waMessage}`;

  return (
    <div className="pb-20 transition-colors duration-300">
      <PageHeader 
        title="PEMBAYARAN" 
        subtitle="Langkah terakhir untuk mendapatkan pesanan Anda" 
      />
      
      <div className="container mx-auto px-4 py-10">
        
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Pesanan Berhasil Dibuat!</h2>
            <p className="text-muted text-lg">Silakan selesaikan pembayaran manual via WhatsApp untuk memproses pesanan Anda.</p>
          </div>

          {/* Main Card */}
          <div className="bg-card border border-border rounded-xl p-8 md:p-10 mb-8 custom-shadow text-center transition-colors duration-300">
            <p className="text-muted mb-2 font-medium uppercase tracking-wider text-sm">Total Pembayaran</p>
            <h3 className="text-4xl md:text-5xl font-bold golden-text mb-6">Rp {order.total.toLocaleString('id-ID')}</h3>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-sm font-bold mb-8">
              <Clock className="w-4 h-4" /> Batas Pembayaran: {new Date(order.paymentDeadline).toLocaleString('id-ID')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-10">
              <div className="bg-background border border-border rounded-lg p-4 transition-colors">
                <p className="text-xs text-muted mb-1">Order ID</p>
                <p className="font-bold text-foreground font-mono">{order.orderNumber}</p>
              </div>
              <div className="bg-background border border-border rounded-lg p-4 transition-colors">
                <p className="text-xs text-muted mb-1 flex justify-between items-center">
                  Nomor Referensi
                </p>
                <p className="font-bold text-foreground font-mono">{order.referenceNumber}</p>
              </div>
            </div>

            {/* ACTION: WhatsApp Link */}
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all transform hover:-translate-y-1 w-full md:w-auto"
            >
              <MessageSquare className="w-6 h-6" /> Konfirmasi Pembayaran via WhatsApp
            </a>
            <p className="text-xs text-muted mt-4">Klik tombol di atas untuk membuka WhatsApp secara otomatis.</p>
          </div>

          {/* Timeline Guide */}
          <div className="bg-card border border-border rounded-xl p-8 custom-shadow transition-colors duration-300">
            <h3 className="font-bold text-foreground mb-6 border-b border-border pb-4">Cara Membayar</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-foreground">Hubungi Admin</h4>
                  <p className="text-sm text-muted mt-1">Klik tombol WhatsApp di atas. Pesan otomatis sudah disiapkan dengan detail order Anda.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-foreground">Transfer Pembayaran</h4>
                  <p className="text-sm text-muted mt-1">Admin akan memberikan nomor rekening BCA / Mandiri / e-Wallet sesuai preferensi Anda.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-foreground">Kirim Bukti</h4>
                  <p className="text-sm text-muted mt-1">Kirimkan screenshot bukti transfer ke WhatsApp admin.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0 shadow-sm">4</div>
                <div>
                  <h4 className="font-bold text-foreground">Download Produk</h4>
                  <p className="text-sm text-muted mt-1">Setelah diverifikasi, sistem akan otomatis mengirimkan file produk ke email Anda, atau bisa diunduh via dashboard member.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
              Kembali eksplorasi produk <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}