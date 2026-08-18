import PageHeader from "@/components/PageHeader";
import { QrCode, CreditCard, MessageSquare, Download, CheckCircle2, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Panduan Pembayaran Resmi | PT. Rayan Smart Kreatif",
  description: "Tata cara pembayaran resmi melalui QRIS, Virtual Account, dan Transfer Bank di PT. Rayan Smart Kreatif.",
};

export default function PaymentGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      <PageHeader
        title="PANDUAN PEMBAYARAN"
        subtitle="Tata Cara Pembayaran Otomatis & Akses Unduhan Produk Digital PT. Rayan Smart Kreatif"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-12">
        
        {/* Method 1: QRIS Payment */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-wider block">
                Otomatis & Terverifikasi Instan
              </span>
              <h2 className="text-lg font-bold text-foreground font-heading">
                1. Pembayaran via QRIS (Semua E-Wallet & Mobile Banking)
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
            <p>
              Metode pembayaran tercepat dan paling direkomendasikan. Mendukung seluruh aplikasi perbankan digital dan e-wallet di Indonesia:
            </p>

            <div className="flex flex-wrap gap-2 py-1">
              {["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja", "BCA Mobile", "Livin' by Mandiri", "BRImo", "BNI Mobile", "CIMB Niaga"].map((app) => (
                <span key={app} className="px-2.5 py-1 rounded-md bg-surface border border-border text-xs font-mono font-bold text-foreground">
                  {app}
                </span>
              ))}
            </div>

            <ol className="space-y-2.5 pl-4 list-decimal marker:text-primary font-medium">
              <li>Pilih metode pembayaran <strong>"Sumopod Payment Gateway (QRIS)"</strong> pada halaman checkout, lalu klik <strong>"Bayar Sekarang"</strong>.</li>
              <li>Sistem akan mengarahkan Anda ke laman pembayaran resmi dengan kode QRIS terenkripsi.</li>
              <li>Buka aplikasi Mobile Banking atau E-Wallet pilihan Anda di smartphone.</li>
              <li>Pilih menu <strong>"Scan / Bayar QR"</strong> dan arahkan kamera ke kode QR di layar Anda.</li>
              <li>Periksa nominal tagihan (pastikan penerima adalah merchant resmi <strong>PT. RAYAN SMART KREATIF / SUMOPOD</strong>) dan masukkan PIN transaksi Anda.</li>
              <li>Setelah berhasil, Anda akan otomatis dialihkan ke halaman <strong>Konfirmasi Sukses</strong> dan tombol unduh file source code (.ZIP) langsung aktif detik itu juga.</li>
            </ol>
          </div>
        </div>

        {/* Method 2: Transfer Manual WhatsApp */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider block">
                Didampingi CS Langsung
              </span>
              <h2 className="text-lg font-bold text-foreground font-heading">
                2. Pembayaran Transfer Bank Manual (WhatsApp CS)
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
            <p>
              Bagi instansi atau pembeli yang membutuhkan transfer rekening antar-bank dan komunikasi langsung dengan tim kami:
            </p>

            <ol className="space-y-2.5 pl-4 list-decimal marker:text-primary font-medium">
              <li>Pilih opsi <strong>"Transfer Manual via WhatsApp Admin"</strong> pada form checkout.</li>
              <li>Klik tombol <strong>"Bayar Sekarang"</strong> untuk diarahkan ke chat resmi Customer Service WhatsApp kami beserta nomor referensi pesanan.</li>
              <li>Admin CS akan memberikan detail nomor rekening resmi perusahaan.</li>
              <li>Lakukan transfer sesuai nominal total dan kirimkan bukti transfer berupa struk / screenshot m-Banking.</li>
              <li>Admin memverifikasi pembayaran (1-5 menit pada jam kerja) dan mengirimkan tautan akses unduhan berlisensi langsung kepada Anda.</li>
            </ol>
          </div>
        </div>

        {/* Accessing Downloaded Products */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground font-heading">
                3. Cara Mengunduh & Mengakses File Produk Digital
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
            <ul className="space-y-2.5 pl-4 list-disc marker:text-primary">
              <li>
                <strong>Akses Langsung:</strong> Tombol <strong>"Unduh File (.ZIP)"</strong> dapat langsung diklik pada halaman sukses pembayaran.
              </li>
              <li>
                <strong>Salinan Email:</strong> Tautan token unduhan cadangan otomatis terkirim ke alamat email yang Anda masukkan saat checkout.
              </li>
              <li>
                <strong>Dashboard Akun:</strong> Anda juga dapat mengakses riwayat unduhan kapan saja melalui menu <Link href="/dashboard/orders" className="text-primary underline font-bold">Dashboard Pesanan</Link> setelah login.
              </li>
            </ul>
          </div>
        </div>

        {/* Action CTA */}
        <div className="p-8 bg-surface border border-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 custom-shadow text-center sm:text-left">
          <div>
            <h3 className="font-heading font-bold text-base text-foreground">Siap Memilih Produk atau Layanan?</h3>
            <p className="text-xs text-muted">Jelajahi produk digital siap pakai atau konsultasikan kebutuhan software Anda.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/products" className="btn-primary px-6 py-2.5 text-xs font-mono uppercase font-bold rounded-xl shadow">
              Katalog Produk
            </Link>
            <Link href="/services" className="px-6 py-2.5 bg-card border border-border text-foreground hover:border-primary hover:text-primary text-xs font-mono uppercase font-bold rounded-xl transition-colors">
              Paket Layanan
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
