"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { createProduct, updateProduct } from "@/app/actions/product";

export default function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "0",
    categoryId: initialData?.categoryId || "",
    version: initialData?.version || "1.0.0",
    published: initialData ? initialData.published : true,
    featured: initialData ? initialData.featured : false,
    screenshots: initialData?.screenshots || '["/asset/logorayan.png"]',
    demoLinks: initialData?.demoLinks || '[]'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generate slug from title if creating new
    if (name === "title" && !isEdit) {
      setFormData(prev => ({ 
        ...prev, 
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      let result;
      if (isEdit) {
        result = await updateProduct(initialData.id, formData);
      } else {
        result = await createProduct(formData);
      }
      
      if (result.success) {
        alert(isEdit ? "Produk berhasil diperbarui!" : "Produk berhasil ditambahkan!");
        router.push("/admin/products");
      } else {
        setError(result.error || "Gagal menyimpan produk");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-[rgba(255,255,255,0.05)] pb-2">Informasi Dasar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nama Produk *</label>
                <input 
                  type="text" name="title" required value={formData.title} onChange={handleChange}
                  className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Misal: Template Undangan Web" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Slug URL *</label>
                <input 
                  type="text" name="slug" required value={formData.slug} onChange={handleChange}
                  className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-muted focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Deskripsi Singkat *</label>
              <textarea 
                name="description" required value={formData.description} onChange={handleChange} rows={3}
                className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" 
                placeholder="Deskripsikan produk Anda..." 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Harga (Rp) *</label>
                <input 
                  type="number" name="price" required value={formData.price} onChange={handleChange} min="0"
                  className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors font-mono" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Kategori *</label>
                <select 
                  name="categoryId" required value={formData.categoryId} onChange={handleChange}
                  className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Versi</label>
                <input 
                  type="text" name="version" value={formData.version} onChange={handleChange}
                  className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="1.0.0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold border-b border-[rgba(255,255,255,0.05)] pb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" /> Media & Link
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Screenshots (JSON Array URL)</label>
              <input 
                type="text" name="screenshots" value={formData.screenshots} onChange={handleChange}
                className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors font-mono text-sm" 
              />
              <p className="text-xs text-muted mt-1">Gunakan format ["url1", "url2"]. Sementara gunakan ["/asset/logorayan.png"]</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Demo Links (JSON Array)</label>
              <input 
                type="text" name="demoLinks" value={formData.demoLinks} onChange={handleChange}
                className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors font-mono text-sm" 
              />
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <div className="bg-[#121415] border border-[rgba(255,255,255,0.05)] rounded-[12px] p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2">Status & Visibilitas</h3>
            
            <label className="flex items-center gap-3 cursor-pointer group mb-4">
              <div className="relative flex items-center">
                <input type="checkbox" name="published" checked={formData.published} onChange={handleCheckbox} className="sr-only" />
                <div className={`w-10 h-5 bg-[#0a0b0c] border border-[rgba(255,255,255,0.1)] rounded-full transition-colors ${formData.published ? 'bg-primary/20 border-primary' : ''}`}></div>
                <div className={`absolute left-1 top-1 w-3 h-3 rounded-full transition-transform ${formData.published ? 'translate-x-5 bg-primary shadow-[0_0_5px_rgba(198,161,91,0.8)]' : 'bg-gray-500'}`}></div>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Published (Publik)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleCheckbox} className="sr-only" />
                <div className={`w-10 h-5 bg-[#0a0b0c] border border-[rgba(255,255,255,0.1)] rounded-full transition-colors ${formData.featured ? 'bg-primary/20 border-primary' : ''}`}></div>
                <div className={`absolute left-1 top-1 w-3 h-3 rounded-full transition-transform ${formData.featured ? 'translate-x-5 bg-primary shadow-[0_0_5px_rgba(198,161,91,0.8)]' : 'bg-gray-500'}`}></div>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Featured (Tampil di Home)</span>
            </label>
          </div>
          
          <div className="bg-[#121415] border border-[rgba(255,255,255,0.05)] rounded-[12px] p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2">Aksi</h3>
            
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 mb-3">
              {loading ? <span className="animate-pulse">Menyimpan...</span> : <><Save className="w-4 h-4" /> {isEdit ? 'Simpan Perubahan' : 'Buat Produk'}</>}
            </button>
            
            <Link href="/admin/products" className="btn-secondary w-full flex items-center justify-center gap-2 py-3 bg-[#0a0b0c]">
              <ArrowLeft className="w-4 h-4" /> Batal & Kembali
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}