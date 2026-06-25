"use client";

import { useState } from "react";
import { Save, Settings2, Image as ImageIcon, MessageSquare, Phone, MapPin, AlignLeft, Layout, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/app/actions/setting";

export default function SettingsForm({ initialData }: { initialData: Record<string, string> }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await saveSettings(formData);
      if (result.success) {
        alert("Pengaturan berhasil disimpan!");
      } else {
        setError(result.error || "Gagal menyimpan pengaturan");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "general", label: "Umum", icon: <Settings2 className="w-4 h-4" /> },
    { id: "hero", label: "Hero Banner", icon: <Layout className="w-4 h-4" /> },
    { id: "contact", label: "Kontak & Sosmed", icon: <Phone className="w-4 h-4" /> },
    { id: "about", label: "Halaman About", icon: <AlignLeft className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Tabs */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-lg p-3 custom-shadow sticky top-24 transition-colors duration-300">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                    : 'text-muted hover:text-foreground hover:bg-background'
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
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 lg:p-8 custom-shadow transition-colors duration-300">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {/* GENERAL TAB */}
          <div className={activeTab === 'general' ? 'block' : 'hidden'}>
            <h2 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" /> Pengaturan Umum
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nama Website</label>
                <input 
                  type="text" name="site_name" value={formData.site_name || ""} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Deskripsi Singkat (SEO)</label>
                <textarea 
                  name="site_description" value={formData.site_description || ""} onChange={handleChange} rows={2}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Logo URL (PNG/SVG)</label>
                <input 
                  type="text" name="site_logo" value={formData.site_logo || "/asset/logorayan.png"} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors font-mono text-sm" 
                />
              </div>
            </div>
          </div>

          {/* HERO TAB */}
          <div className={activeTab === 'hero' ? 'block' : 'hidden'}>
            <h2 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-primary" /> Hero Banner (Beranda)
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Headline Utama</label>
                <input 
                  type="text" name="hero_title" value={formData.hero_title || ""} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Sub-Headline (Deskripsi Bawah Headline)</label>
                <textarea 
                  name="hero_subtitle" value={formData.hero_subtitle || ""} onChange={handleChange} rows={4}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                />
              </div>
            </div>
          </div>

          {/* CONTACT TAB */}
          <div className={activeTab === 'contact' ? 'block' : 'hidden'}>
            <h2 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" /> Kontak & Sosial Media
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nomor WhatsApp Admin</label>
                  <input 
                    type="text" name="whatsapp_number" value={formData.whatsapp_number || ""} onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                    placeholder="Contoh: 6281234567890"
                  />
                  <p className="text-xs text-muted mt-1">Gunakan format 62 tanpa spasi atau plus.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email Publik</label>
                  <textarea 
                    name="contact_email" value={formData.contact_email || ""} onChange={handleChange} rows={2}
                    className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Alamat Kantor</label>
                <textarea 
                  name="contact_address" value={formData.contact_address || ""} onChange={handleChange} rows={3}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Social Media Links (JSON)</label>
                <textarea 
                  name="social_media" value={formData.social_media || ""} onChange={handleChange} rows={3}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors font-mono text-sm" 
                  placeholder='{"instagram": "url", "linkedin": "url"}'
                />
              </div>
            </div>
          </div>

          {/* ABOUT TAB */}
          <div className={activeTab === 'about' ? 'block' : 'hidden'}>
            <h2 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
              <AlignLeft className="w-5 h-5 text-primary" /> Konten Halaman About
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Cerita / Latar Belakang Perusahaan</label>
                <textarea 
                  name="about_story" value={formData.about_story || ""} onChange={handleChange} rows={4}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Visi</label>
                <textarea 
                  name="about_vision" value={formData.about_vision || ""} onChange={handleChange} rows={3}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Misi (JSON Array String)</label>
                <textarea 
                  name="about_mission" value={formData.about_mission || ""} onChange={handleChange} rows={4}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:ring-1 focus:ring-primary transition-colors font-mono text-sm" 
                  placeholder='["Misi pertama", "Misi kedua"]'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-border flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto px-10">
              {loading ? <span className="animate-pulse">Menyimpan...</span> : <><Save className="w-4 h-4" /> Simpan Pengaturan</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}