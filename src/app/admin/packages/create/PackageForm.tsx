"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Sparkles, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createPackage, updatePackage } from "@/app/actions/package";

interface PackageFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function PackageForm({ initialData, isEdit }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Parse initial features
  let initialFeatures: string[] = [];
  try {
    if (initialData?.features) {
      const parsed = JSON.parse(initialData.features);
      if (Array.isArray(parsed)) initialFeatures = parsed;
    }
  } catch (e) {}

  if (initialFeatures.length === 0) {
    initialFeatures = ["Desain UI/UX Modern & Responsif", "Source Code Bersih & Terstruktur", "Garansi Maintenance & Support"];
  }

  const [features, setFeatures] = useState<string[]>(initialFeatures);
  const [newFeatureInput, setNewFeatureInput] = useState("");

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Web Development",
    price: initialData?.price?.toString() || "",
    originalPrice: initialData?.originalPrice?.toString() || "",
    deliveryTime: initialData?.deliveryTime || "3-7 Hari Kerja",
    revisionCount: initialData?.revisionCount || "3x Revisi",
    description: initialData?.description || "",
    isPopular: initialData?.isPopular || false,
    published: initialData?.published !== false,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isEdit) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setFormData(prev => ({ ...prev, name: val, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, name: val }));
    }
  };

  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setFeatures(prev => [...prev, newFeatureInput.trim()]);
    setNewFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        features: JSON.stringify(features),
      };

      if (isEdit && initialData?.id) {
        const res = await updatePackage(initialData.id, payload);
        if (res.success) {
          router.push("/admin/packages");
          router.refresh();
        } else {
          setError(res.error || "Gagal memperbarui paket layanan");
        }
      } else {
        const res = await createPackage(payload);
        if (res.success) {
          router.push("/admin/packages");
          router.refresh();
        } else {
          setError(res.error || "Gagal membuat paket layanan");
        }
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/packages"
            className="text-muted hover:text-primary transition-colors text-xs font-mono flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Paket
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isEdit ? "Edit Paket Layanan Development" : "Tambah Paket Layanan Development"}
          </h1>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 custom-shadow">
          
          {/* 1. Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Nama Paket Layanan *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Misal: Landing Page Bisnis Pro"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Slug URL *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })}
                placeholder="misal: landing-page-bisnis-pro"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Kategori Layanan *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Application">Mobile Application (Android & iOS)</option>
                <option value="UI/UX Design">UI/UX Design System</option>
                <option value="Custom SaaS Solution">Custom SaaS & Enterprise Solution</option>
                <option value="E-Commerce Platform">E-Commerce & Payment System</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Harga Mulai Dari (Rp) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Misal: 1500000"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-foreground mb-1.5 flex items-center justify-between">
                <span>Harga Coret (Rp)</span>
                <span className="text-[10px] text-muted font-normal font-mono">(Opsional)</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="Misal: 2500000"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Estimasi Pengerjaan *</label>
              <input
                type="text"
                required
                value={formData.deliveryTime}
                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                placeholder="Misal: 3-5 Hari Kerja"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Garansi Revisi *</label>
              <input
                type="text"
                required
                value={formData.revisionCount}
                onChange={(e) => setFormData({ ...formData, revisionCount: e.target.value })}
                placeholder="Misal: 3x Revisi / Unlimited"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Deskripsi Ringkas Paket *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsikan untuk siapa paket ini cocok dan ringkasan solusinya..."
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* 2. Deliverables / Features Checklist Builder */}
          <div className="pt-4 border-t border-border space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Daftar Fitur & Deliverables</h3>
              <p className="text-xs text-muted">Tambahkan poin-poin keuntungan atau fitur yang didapatkan klien pada paket ini.</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeatureInput}
                onChange={(e) => setNewFeatureInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddFeature(); } }}
                placeholder="Misal: Free Domain & Hosting 1 Tahun, Integrasi WhatsApp..."
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2.5 bg-surface border border-border hover:border-primary hover:text-primary text-foreground text-xs font-mono uppercase font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-primary" />
                <span>Tambah Poin</span>
              </button>
            </div>

            {/* Feature List Items */}
            <div className="space-y-2 pt-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border text-xs">
                  <div className="flex items-center gap-2.5 text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1 text-muted hover:text-red-500 transition-colors cursor-pointer"
                    title="Hapus poin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Toggles & Options */}
          <div className="pt-4 border-t border-border flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary"
              />
              <span className="text-xs font-bold text-foreground flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Tandai sebagai Best Seller / Paling Diminati
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary"
              />
              <span className="text-xs font-bold text-foreground">Publikasikan Paket Ini</span>
            </label>
          </div>

        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/packages"
            className="px-5 py-2.5 text-xs uppercase font-bold font-mono text-muted hover:text-foreground rounded-lg transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-7 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 rounded-lg cursor-pointer disabled:opacity-50 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Menyimpan..." : "Simpan Paket"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
