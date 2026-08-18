import PageHeader from "@/components/PageHeader";
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Syarat & Ketentuan Layanan | PT. Rayan Smart Kreatif",
  description: "Syarat dan Ketentuan Penggunaan Layanan serta Lisensi Produk Digital PT. Rayan Smart Kreatif.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      <PageHeader
        title="SYARAT & KETENTUAN"
        subtitle="Ketentuan Penggunaan Platform, Pembelian Aset Digital, dan Layanan Rekayasa Perangkat Lunak"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 custom-shadow space-y-10 text-sm leading-relaxed text-muted">
          
          {/* Header Notice */}
          <div className="p-5 rounded-xl bg-surface border border-border text-foreground space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold font-mono text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Entitas Hukum Resmi
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Platform ini dikelola dan dioperasikan secara sah oleh <strong>PT. RAYAN SMART KREATIF</strong>. Dengan mengakses, membuat akun, membeli produk digital, atau menyewa layanan jasa kami, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan di bawah ini.
            </p>
            <span className="text-[11px] font-mono text-muted/60 block pt-1">
              Terakhir diperbarui: 18 Agustus 2026
            </span>
          </div>

          {/* 1. Definisi & Ketentuan Umum */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              1. Definisi & Ketentuan Umum
            </h2>
            <p>
              "Platform" merujuk pada situs web resmi <code>rayan.web.id</code> beserta seluruh subdomain dan layanan turunannya. "Pengguna" atau "Klien" adalah individu atau entitas hukum yang mengakses platform atau melakukan transaksi pembelian.
            </p>
            <p>
              Seluruh produk digital yang dijual (termasuk source code aplikasi, template website, modul backend, dan desain antarmuka) merupakan karya intelektual orisinal dari PT. Rayan Smart Kreatif atau kreator terverifikasi kami.
            </p>
          </section>

          {/* 2. Lisensi Penggunaan Produk Digital */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              2. Lisensi Penggunaan Produk Digital
            </h2>
            <p>
              Setiap pembelian produk digital memberikan hak lisensi non-eksklusif, tidak dapat dipindahtangankan, dan berlaku seumur hidup (*lifetime*) sesuai jenis lisensi yang dipilih:
            </p>
            <ul className="space-y-2 pl-4 list-disc marker:text-primary">
              <li>
                <strong className="text-foreground">Lisensi Standar (Standard License):</strong> Memberikan hak untuk menggunakan source code pada 1 (satu) domain atau proyek komersial pribadi/klien. Dilarang menjual ulang (*resell*) source code dalam bentuk mentah.
              </li>
              <li>
                <strong className="text-foreground">Lisensi Extended / Developer:</strong> Memberikan hak untuk menggunakan aset pada multi-proyek atau turunan aplikasi SaaS komersial.
              </li>
              <li>
                <strong className="text-foreground">Larangan Tegas:</strong> Dilarang keras mendistribusikan ulang, membagikan gratis, mengunggah ke repositori publik tak berizin, atau mengklaim kepemilikan hak cipta atas source code yang dibeli.
              </li>
            </ul>
          </section>

          {/* 3. Pembayaran & Payment Gateway */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              3. Transaksi & Ketentuan Pembayaran
            </h2>
            <p>
              Pembayaran transaksi diproses secara aman melalui gerbang pembayaran resmi mitra terlisensi (<strong>Sumopod Payment Gateway / QRIS / Virtual Account</strong>) dengan standar enkripsi SSL 256-bit.
            </p>
            <p>
              Semua nominal harga tertera dalam mata uang Rupiah (IDR) dan telah disesuaikan dengan ketentuan perpajakan PPN 11% sesuai perundang-undangan Republik Indonesia. Tautan unduhan produk digital akan segera diaktifkan otomatis oleh sistem setelah verifikasi pembayaran berhasil.
            </p>
          </section>

          {/* 4. Layanan Jasa Development */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              4. Ketentuan Jasa Custom Development
            </h2>
            <p>
              Untuk pemesanan paket jasa pembuatan website, aplikasi mobile, atau software custom:
            </p>
            <ul className="space-y-2 pl-4 list-disc marker:text-primary">
              <li>Pengerjaan dimulai setelah penandatanganan brief / Surat Perjanjian Kerja (SPK) dan pembayaran uang muka (DP).</li>
              <li>Revisi pengerjaan mengacu pada kuota revisi yang tertera pada paket yang dipilih.</li>
              <li>Garansi bug dan pemeliharaan teknis berlaku selama periode yang disepakati bersama.</li>
            </ul>
          </section>

          {/* 5. Hak Kekayaan Intelektual & Hukum yang Berlaku */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2">
              5. Hukum yang Berlaku
            </h2>
            <p>
              Syarat dan Ketentuan ini diatur dan ditafsirkan berdasarkan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan secara musyawarah mufakat atau melalui yurisdiksi Pengadilan Negeri yang berwenang.
            </p>
          </section>

          {/* Contact Box */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-foreground">Pertanyaan Terkait Syarat & Ketentuan?</h4>
              <p className="text-xs text-muted">Hubungi tim legal & kepatuhan kami melalui email resmi.</p>
            </div>
            <a
              href="mailto:legal@rayan.web.id"
              className="px-5 py-2.5 bg-surface border border-border text-foreground hover:border-primary hover:text-primary text-xs font-mono font-bold rounded-xl transition-colors"
            >
              legal@rayan.web.id
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
