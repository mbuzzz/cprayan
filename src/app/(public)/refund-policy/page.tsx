import PageHeader from "@/components/PageHeader";
import { RefreshCw, AlertCircle, CheckCircle2, ShieldAlert, FileText, HeadphonesIcon } from "lucide-react";

export const metadata = {
  title: "Kebijakan Pengembalian Dana & Pembatalan | PT. Rayan Smart Kreatif",
  description: "Kebijakan Pengembalian Dana (Refund Policy) dan Pembatalan Pesanan Produk Digital PT. Rayan Smart Kreatif.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      <PageHeader
        title="KEBIJAKAN REFUND & PEMBATALAN"
        subtitle="Aturan Pengembalian Dana, Garansi Produk Digital, dan Pembatalan Jasa Development"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 custom-shadow space-y-10 text-sm leading-relaxed text-muted">
          
          {/* Notice Box */}
          <div className="p-5 rounded-xl bg-surface border border-border text-foreground space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold font-mono text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" /> Kebijakan Produk Digital & Layanan
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Kebijakan ini mengatur hak dan ketentuan pengembalian dana (*refund*) atas pembelian produk digital instan (source code, template, modul) serta pembatalan kontrak jasa rekayasa perangkat lunak di <strong>PT. RAYAN SMART KREATIF</strong>.
            </p>
            <span className="text-[11px] font-mono text-muted/60 block pt-1">
              Terakhir diperbarui: 18 Agustus 2026
            </span>
          </div>

          {/* 1. Ketentuan Produk Digital (No Refund Standard) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              1. Ketentuan Produk Digital (*Intangible Goods*)
            </h2>
            <p>
              Karena sifat produk digital berupa source code, file arsip ZIP, dan lisensi yang langsung dapat diakses dan disalin setelah pembayaran berhasil, <strong>seluruh transaksi produk digital yang telah diunduh bersifat final dan tidak dapat dibatalkan atau dikembalikan dananya (*No Refund Policy*)</strong>, kecuali memenuhi kondisi khusus pada poin ke-2.
            </p>
          </section>

          {/* 2. Kondisi Pengecualian yang Berhak Mendapat Refund */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              2. Pengecualian Pengembalian Dana Produk Digital
            </h2>
            <p>Pengembalian dana 100% dapat disetujui apabila memenuhi salah satu kondisi berikut:</p>
            <ul className="space-y-2.5 pl-4 list-disc marker:text-primary">
              <li>
                <strong className="text-foreground">Pembayaran Ganda (Duplicate Charge):</strong> Anda tidak sengaja melakukan transfer atau terpotong saldo lebih dari 1 kali untuk nomor order yang sama karena kendala gateway.
              </li>
              <li>
                <strong className="text-foreground">File Rusak Parah (Corrupted Files):</strong> Berkas unduhan rusak / tidak lengkap dan tim teknis kami gagal memperbaiki atau mengirimkan berkas pengganti dalam waktu 3x24 jam sejak laporan diajukan.
              </li>
              <li>
                <strong className="text-foreground">Ketidaksesuaian Deskripsi Fatal:</strong> Produk yang diterima memiliki fungsi inti yang sama sekali berbeda dengan deskripsi spesifikasi pada halaman katalog produk.
              </li>
            </ul>
          </section>

          {/* 3. Garansi Dukungan Teknis & Perbaikan Bug */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              3. Garansi Perbaikan Bug & Dukungan Teknis
            </h2>
            <p>
              Sebelum mengajukan komplain, pelanggan berhak mendapatkan <strong>Dukungan Teknis Gratis</strong> dari tim developer kami:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc marker:text-primary">
              <li>Bantuan panduan instalasi dan setup environment.</li>
              <li>Perbaikan bug atau eror bawaan source code yang belum dimodifikasi.</li>
              <li>Pembaruan versi source code jika terdapat patch keamanan terbaru.</li>
            </ul>
          </section>

          {/* 4. Pembatalan Layanan Jasa Development */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              4. Pembatalan Layanan Jasa Custom Development
            </h2>
            <p>
              Untuk kontrak proyek pembuatan website, aplikasi mobile, atau software custom:
            </p>
            <ul className="space-y-2 pl-4 list-disc marker:text-primary">
              <li>Uang muka (DP) yang telah dibayarkan sebelum tahap pengerjaan dimulai dapat dikembalikan setelah dipotong biaya administrasi dan studi kelayakan 20%.</li>
              <li>Jika proyek telah memasuki tahap perancangan arsitektur/coding (&gt;30%), uang muka tidak dapat ditarik kembali karena telah dialokasikan untuk jam kerja tim engineer.</li>
            </ul>
          </section>

          {/* 5. Alur Pengajuan Klaim */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              5. Prosedur Pengajuan Klaim Refund
            </h2>
            <p>Untuk mengajukan klaim pengembalian dana atau komplain transaksi:</p>
            <ol className="space-y-2 pl-4 list-decimal marker:text-primary font-mono text-xs">
              <li>Kirimkan email ke <strong>support@rayan.web.id</strong> atau WhatsApp CS resmi kami.</li>
              <li>Sertakan Nomor Order (misal: <code>ORD-XXXXXX</code>), alamat email pembelian, bukti transfer, dan detail kendala beserta screenshot.</li>
              <li>Tim keuangan kami akan memverifikasi permohonan dalam waktu 1-3 hari kerja. Dana yang disetujui akan ditransfer kembali ke rekening asal dalam 3-5 hari kerja.</li>
            </ol>
          </section>

          {/* Contact Box */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-foreground">Butuh Bantuan Transaksi atau Klaim?</h4>
              <p className="text-xs text-muted">Tim customer care kami siap membantu kendala Anda.</p>
            </div>
            <a
              href="https://wa.me/6285226117387?text=Halo%20Admin%20Rayan%2C%20saya%20ingin%20berkonsultasi%20mengenai%20transaksi%20pesanan%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 btn-primary text-xs font-mono font-bold rounded-xl flex items-center gap-2"
            >
              <HeadphonesIcon className="w-4 h-4" />
              <span>Hubungi CS WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
