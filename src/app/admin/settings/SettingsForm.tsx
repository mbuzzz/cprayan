"use client";

import { useState } from "react";
import { 
  Save, 
  Settings2, 
  Image as ImageIcon, 
  MessageSquare, 
  Phone, 
  MapPin, 
  AlignLeft, 
  Layout, 
  Mail, 
  Server, 
  ShieldCheck, 
  Clock, 
  Globe 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/app/actions/setting";
import RichTextEditor from "@/components/admin/RichTextEditor";
import FileUpload from "@/components/admin/FileUpload";
import TagInput from "@/components/admin/TagInput";

export default function SettingsForm({ initialData }: { initialData: Record<string, string> }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const result = await saveSettings(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Gagal menyimpan pengaturan");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "general", label: "Umum", icon: <Settings2 className="w-4 h-4" /> },
    { id: "hero", label: "Hero Banner", icon: <Layout className="w-4 h-4" /> },
    { id: "contact", label: "Halaman Kontak", icon: <Phone className="w-4 h-4" /> },
    { id: "smtp", label: "Server SMTP Email", icon: <Mail className="w-4 h-4" /> },
    { id: "about", label: "Halaman About", icon: <AlignLeft className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Tabs */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-xl p-3 custom-shadow sticky top-24 transition-colors duration-300">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-sm' 
                    : 'text-muted hover:text-primary hover:bg-primary/10'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 lg:p-8 custom-shadow transition-colors duration-300 space-y-6">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl font-mono text-xs">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl font-mono text-xs">
              ✓ Pengaturan berhasil disimpan dan langsung diterapkan ke seluruh website!
            </div>
          )}
          
          {/* 1. GENERAL TAB */}
          <div className={activeTab === 'general' ? 'block space-y-5' : 'hidden'}>
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-3 flex items-center gap-2 font-heading">
              <Settings2 className="w-5 h-5 text-primary" /> Pengaturan Umum Studio
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Nama Perusahaan / Website</label>
                <input 
                  type="text" name="site_name" value={formData.site_name || "PT. Rayan Smart Kreatif"} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Deskripsi Singkat (SEO Meta Description)</label>
                <textarea 
                  name="site_description" value={formData.site_description || ""} onChange={handleChange} rows={2}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors leading-relaxed" 
                />
              </div>
              <div>
                <FileUpload
                  label="Logo Website (Upload Gambar PNG/SVG/WEBP)"
                  multiple={false}
                  accept="image/*"
                  value={formData.site_logo || "/asset/logorayan.png"}
                  onChange={(val) => setFormData(prev => ({ ...prev, site_logo: val }))}
                  helperText="Upload file logo resmi studio."
                />
              </div>
            </div>
          </div>

          {/* 2. HERO TAB */}
          <div className={activeTab === 'hero' ? 'block space-y-5' : 'hidden'}>
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-3 flex items-center gap-2 font-heading">
              <Layout className="w-5 h-5 text-primary" /> Hero Banner (Beranda)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Headline Utama Beranda</label>
                <input 
                  type="text" name="hero_title" value={formData.hero_title || ""} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors font-bold text-base" 
                  placeholder="SOLUSI DIGITAL KREATIF"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Sub-Headline Narasi</label>
                <textarea 
                  name="hero_subtitle" value={formData.hero_subtitle || ""} onChange={handleChange} rows={3}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors leading-relaxed" 
                />
              </div>
            </div>
          </div>

          {/* 3. CONTACT TAB */}
          <div className={activeTab === 'contact' ? 'block space-y-5' : 'hidden'}>
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-3 flex items-center gap-2 font-heading">
              <Phone className="w-5 h-5 text-primary" /> Pengaturan Kontak & Halaman Contact
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Nomor WhatsApp Admin CS</label>
                  <input 
                    type="text" name="whatsapp_number" value={formData.whatsapp_number || "6285226117387"} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                    placeholder="Contoh: 6285226117387"
                  />
                  <p className="text-[10px] text-muted mt-1 font-mono">Gunakan format 62 tanpa spasi atau tanda plus (+).</p>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Email Publik / Support</label>
                  <input 
                    type="email" name="contact_email" value={formData.contact_email || "contact@rayan.web.id"} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Email Tujuan Notifikasi Pesan Masuk</label>
                  <input 
                    type="email" name="contact_notification_email" value={formData.contact_notification_email || "contact@rayan.web.id"} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                    placeholder="admin@rayan.web.id"
                  />
                  <p className="text-[10px] text-muted mt-1 font-mono">Email admin yang akan menerima kiriman pesan form kontak.</p>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Jam Operasional Layanan</label>
                  <input 
                    type="text" name="contact_hours" value={formData.contact_hours || "Senin - Jumat: 09:00 - 18:00 WIB"} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Alamat Kantor Resmi</label>
                <textarea 
                  name="contact_address" value={formData.contact_address || ""} onChange={handleChange} rows={2}
                  placeholder="Gedung Perkantoran Sudirman, Lt. 12, Jl. Jend. Sudirman Kav. 1, Jakarta Pusat, 10220"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" 
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Google Maps Iframe Embed Code (Opsional)</label>
                <textarea 
                  name="contact_maps_embed" value={formData.contact_maps_embed || ""} onChange={handleChange} rows={3}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                  placeholder='<iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Social Media Links (JSON)</label>
                <textarea 
                  name="social_media" value={formData.social_media || ""} onChange={handleChange} rows={2}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                  placeholder='{"instagram": "https://instagram.com/rayan", "github": "https://github.com/rayan"}'
                />
              </div>
            </div>
          </div>

          {/* 4. SMTP TAB */}
          <div className={activeTab === 'smtp' ? 'block space-y-5' : 'hidden'}>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 font-heading">
                <Mail className="w-5 h-5 text-primary" /> Pengaturan Server Email SMTP
              </h2>
              <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Untuk Reset Password & Notifikasi
              </span>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              Konfigurasi server SMTP digunakan untuk mengirimkan email <strong>pemulihan kata sandi</strong>, notifikasi pesan kontak masuk, dan struk pembelian produk digital.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">SMTP Host Server</label>
                  <input 
                    type="text" name="smtp_host" value={formData.smtp_host || ""} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                    placeholder="smtp.gmail.com / mail.rayan.web.id"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">SMTP Port</label>
                  <input 
                    type="number" name="smtp_port" value={formData.smtp_port || "587"} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                    placeholder="587 (TLS) atau 465 (SSL)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">SMTP Username / Email Pengirim</label>
                  <input 
                    type="text" name="smtp_user" value={formData.smtp_user || ""} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                    placeholder="noreply@rayan.web.id / akun@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">SMTP Password / App Password</label>
                  <input 
                    type="password" name="smtp_pass" value={formData.smtp_pass || ""} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Nama & Email Pengirim (From)</label>
                  <input 
                    type="text" name="smtp_from" value={formData.smtp_from || "PT. Rayan Smart Kreatif <noreply@rayan.web.id>"} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                    placeholder="PT. Rayan Smart Kreatif <noreply@rayan.web.id>"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">Enkripsi SSL / TLS</label>
                  <select
                    name="smtp_secure"
                    value={formData.smtp_secure || "false"}
                    onChange={(e) => setFormData(prev => ({ ...prev, smtp_secure: e.target.value }))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono"
                  >
                    <option value="false">STARTTLS (Port 587 - Standar)</option>
                    <option value="true">SSL / TLS Direct (Port 465)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ABOUT TAB */}
          <div className={activeTab === 'about' ? 'block space-y-5' : 'hidden'}>
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-3 flex items-center gap-2 font-heading">
              <AlignLeft className="w-5 h-5 text-primary" /> Konten Halaman About
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-2 font-mono">Cerita & Narasi Perusahaan</label>
                <RichTextEditor
                  value={formData.about_story || ""}
                  onChange={(val) => setFormData(prev => ({ ...prev, about_story: val }))}
                  placeholder="Tuliskan narasi visi dan studio..."
                  minHeight="180px"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-2 font-mono">Visi Perusahaan</label>
                <RichTextEditor
                  value={formData.about_vision || ""}
                  onChange={(val) => setFormData(prev => ({ ...prev, about_vision: val }))}
                  placeholder="Tuliskan visi perusahaan..."
                  minHeight="120px"
                />
              </div>
              <div>
                <TagInput
                  label="Daftar Misi Perusahaan"
                  value={formData.about_mission || "[]"}
                  onChange={(val) => setFormData(prev => ({ ...prev, about_mission: val }))}
                  placeholder="Ketik butir misi lalu tekan Enter..."
                  helperText="Daftar pilar misi yang dijalankan oleh studio."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-border flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto px-8 py-3 text-xs uppercase font-bold tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-lg">
              <Save className="w-4 h-4" />
              <span>{loading ? "Menyimpan..." : "Simpan Semua Pengaturan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}