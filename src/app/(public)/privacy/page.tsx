import PageHeader from "@/components/PageHeader";
import { Lock, ShieldCheck, Eye, Database, UserCheck, KeyRound } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi | PT. Rayan Smart Kreatif",
  description: "Kebijakan Privasi dan Perlindungan Data Pengguna PT. Rayan Smart Kreatif.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      <PageHeader
        title="KEBIJAKAN PRIVASI"
        subtitle="Komitmen Kami Dalam Menjaga Kerahasiaan & Keamanan Data Pribadi Anda"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 custom-shadow space-y-10 text-sm leading-relaxed text-muted">
          
          {/* Header Notice */}
          <div className="p-5 rounded-xl bg-surface border border-border text-foreground space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold font-mono text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" /> Kepatuhan Perlindungan Data (UU PDP)
            </div>
            <p className="text-xs text-muted leading-relaxed">
              <strong>PT. RAYAN SMART KREATIF</strong> sangat menghargai privasi setiap pengguna dan pelanggan kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022).
            </p>
            <span className="text-[11px] font-mono text-muted/60 block pt-1">
              Terakhir diperbarui: 18 Agustus 2026
            </span>
          </div>

          {/* 1. Informasi yang Kami Kumpulkan */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" /> 1. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Saat Anda mendaftar, melakukan pemesanan produk digital, atau berkonsultasi mengenai proyek software, kami mengumpulkan data yang mencakup:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc marker:text-primary">
              <li><strong>Data Identitas:</strong> Nama lengkap, nama perusahaan/instansi (opsional).</li>
              <li><strong>Data Kontak:</strong> Alamat email aktif, nomor telepon / WhatsApp.</li>
              <li><strong>Data Transaksi:</strong> Riwayat pesanan, nomor invoice, bukti pembayaran, dan jenis lisensi yang dibeli.</li>
              <li><strong>Data Teknis:</strong> Alamat IP, jenis peramban (browser), dan log akses unduhan berkas digital untuk tujuan keamanan.</li>
            </ul>
            <p className="text-xs text-muted/80">
              *Catatan: Kami <strong>tidak pernah</strong> menyimpan data nomor kartu kredit/debit atau PIN perbankan Anda. Seluruh pemrosesan pembayaran ditangani langsung oleh Payment Gateway berlisensi Bank Indonesia.
            </p>
          </section>

          {/* 2. Penggunaan Informasi */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" /> 2. Penggunaan Informasi Pribadi
            </h2>
            <p>Informasi yang dikumpulkan digunakan semata-mata untuk keperluan:</p>
            <ul className="space-y-1.5 pl-4 list-disc marker:text-primary">
              <li>Memproses transaksi pembelian dan menerbitkan invoice resmi.</li>
              <li>Mengirimkan link token unduhan produk digital dan lisensi perangkat lunak.</li>
              <li>Memberikan layanan purna jual, technical support, dan pembaruan berkas source code.</li>
              <li>Mencegah aktivitas penipuan, pelanggaran lisensi, dan transaksi ilegal.</li>
            </ul>
          </section>

          {/* 3. Keamanan & Perlindungan Data */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> 3. Keamanan Data & Enkripsi
            </h2>
            <p>
              Kami menerapkan standar keamanan teknis dan organisasi yang ketat, meliputi enkripsi <strong>SSL/TLS 256-bit</strong> pada seluruh transmisi data, sistem otentikasi kata sandi terenkripsi (bcrypt/Argon2), serta pembatasan akses database yang terisolasi dengan koneksi aman PgBouncer.
            </p>
          </section>

          {/* 4. Hak Pengguna atas Data */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-heading border-b border-border pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" /> 4. Hak Pengguna atas Data Pribadi
            </h2>
            <p>
              Sesuai ketentuan perundang-undangan, Anda berhak untuk meminta salinan data pribadi Anda yang tersimpan, memperbarui informasi yang tidak akurat, atau meminta penghapusan akun beserta data Anda dengan menghubungi layanan pelanggan kami.
            </p>
          </section>

          {/* Contact Box */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-foreground">Kontak Petugas Perlindungan Data (DPO)</h4>
              <p className="text-xs text-muted">Untuk pertanyaan atau permintaan terkait data pribadi Anda.</p>
            </div>
            <a
              href="mailto:privacy@rayan.web.id"
              className="px-5 py-2.5 bg-surface border border-border text-foreground hover:border-primary hover:text-primary text-xs font-mono font-bold rounded-xl transition-colors"
            >
              privacy@rayan.web.id
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
