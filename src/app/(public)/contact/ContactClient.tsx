"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, MessageSquare, Send, CheckCircle2, Clock, ShieldCheck, Building2, AlertCircle } from "lucide-react";
import { submitContactMessage } from "@/app/actions/contact";

export default function ContactClient({ settings }: { settings: Record<string, string> }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const address = settings.contact_address || "Gedung Perkantoran Sudirman, Lt. 12\nJl. Jend. Sudirman Kav. 1, Jakarta Pusat, 10220";
  const email = settings.contact_email || "contact@rayan.web.id";
  const rawPhone = settings.whatsapp_number || "6285226117387";
  const hours = settings.contact_hours || "Senin - Jumat: 09:00 - 18:00 WIB";
  const mapsEmbed = settings.contact_maps_embed || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError(res.error || "Gagal mengirimkan pesan. Silakan coba lagi.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
      
      {/* 2-Column Section: Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Official Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              KONSULTASI & PERTANYAAN
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Mari Terhubung & <span className="golden-text">Berdiskusi</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Diskusikan rancangan sistem software Anda, tanyakan spesifikasi lisensi produk digital, atau konsultasikan kebutuhan kustomisasi dengan tech team kami.
            </p>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            
            {/* Address */}
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 custom-shadow">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted font-mono">Alamat Kantor Resmi</h4>
                <p className="text-xs sm:text-sm text-foreground whitespace-pre-line leading-relaxed font-medium">
                  {address}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 custom-shadow">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted font-mono">Email Korespondensi</h4>
                <a href={`mailto:${email.split('\n')[0]}`} className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors font-mono font-semibold block">
                  {email}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 custom-shadow">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted font-mono">WhatsApp Customer Care</h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                  <span className="text-xs sm:text-sm text-foreground font-mono font-bold">
                    +{rawPhone.replace(/\D/g, "")}
                  </span>
                  <a
                    href={`https://wa.me/${rawPhone.replace(/\D/g, "")}?text=Halo%20Admin%20PT.%20Rayan%20Smart%20Kreatif%2C%20saya%20ingin%20berkonsultasi`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-mono font-bold hover:bg-emerald-500 hover:text-black transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Chat WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 custom-shadow">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted font-mono">Jam Operasional</h4>
                <p className="text-xs sm:text-sm text-foreground font-mono">
                  {hours}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 custom-shadow space-y-6">
            <div className="border-b border-border pb-4 space-y-1">
              <h3 className="font-heading font-bold text-xl text-foreground">
                Kirim Pesan Langsung
              </h3>
              <p className="text-xs text-muted">
                Isi formulir di bawah ini. Pesan Anda akan langsung diteruskan ke email admin tech lead kami.
              </p>
            </div>

            {success ? (
              <div className="p-8 text-center space-y-4 rounded-xl bg-surface border border-border">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading font-bold text-lg text-foreground">Pesan Berhasil Terkirim!</h4>
                  <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                    Terima kasih telah menghubungi kami. Notifikasi telah diteruskan ke tim kami dan kami akan merespons melalui email/WhatsApp Anda sesegera mungkin.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="btn-primary px-6 py-2.5 text-xs font-mono uppercase font-bold rounded-xl"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nama Lengkap Anda"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@perusahaan.com"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="081234567890"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                      Topik / Subjek
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Misal: Penawaran Pembuatan Aplikasi"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                    Isi Pesan / Rincian Kebutuhan *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Deskripsikan ide proyek, pertanyaan lisensi, atau kebutuhan sistem Anda..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 text-xs uppercase font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span className="animate-pulse">Mengirimkan Pesan...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Google Maps Embed Section (If Configured) */}
      {mapsEmbed && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden custom-shadow">
          <div className="p-4 bg-surface border-b border-border font-mono text-xs font-bold text-muted flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" /> Peta Lokasi Kantor PT. Rayan Smart Kreatif
          </div>
          <div 
            className="w-full h-80"
            dangerouslySetInnerHTML={{ __html: mapsEmbed }}
          />
        </div>
      )}

    </div>
  );
}
