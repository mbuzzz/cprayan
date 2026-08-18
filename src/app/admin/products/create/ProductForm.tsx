"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Link as LinkIcon, FileText, DownloadCloud } from "lucide-react";
import Link from "next/link";
import { createProduct, updateProduct } from "@/app/actions/product";
import RichTextEditor from "@/components/admin/RichTextEditor";
import FileUpload from "@/components/admin/FileUpload";

export default function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    price: initialData?.price?.toString() || "0",
    categoryId: initialData?.categoryId || (categories.length > 0 ? categories[0].id : ""),
    version: initialData?.version || "1.0.0",
    filePath: initialData?.filePath || "",
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
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md font-mono text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-border pb-2 text-foreground">Informasi Dasar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nama Produk *</label>
                <input 
                  type="text" name="title" required value={formData.title} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Misal: Template Undangan Web" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Slug URL *</label>
                <input 
                  type="text" name="slug" required value={formData.slug} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-muted focus:outline-none focus:border-primary transition-colors font-mono" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Deskripsi Singkat *</label>
              <textarea 
                name="description" required value={formData.description} onChange={handleChange} rows={3}
                className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors" 
                placeholder="Deskripsikan ringkasan produk Anda..." 
              />
            </div>

            {/* Rich Text Editor for Detailed Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Konten & Dokumentasi Lengkap (Rich Text WYSIWYG)
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                placeholder="Tulis fitur lengkap, cara instalasi, dan dokumentasi produk..."
                minHeight="280px"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Harga (Rp) *</label>
                <input 
                  type="number" name="price" required value={formData.price} onChange={handleChange} min="0"
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Kategori *</label>
                <select 
                  name="categoryId" required value={formData.categoryId} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Versi</label>
                <input 
                  type="text" name="version" value={formData.version} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors font-mono" 
                  placeholder="1.0.0"
                />
              </div>
            </div>
          </div>

          {/* Media & Digital File Upload */}
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2 text-foreground">
              <ImageIcon className="w-5 h-5 text-primary" /> Media & Berkas Digital
            </h3>
            
            {/* Screenshots Upload */}
            <div>
              <FileUpload
                label="Screenshots & Gambar Produk"
                multiple={true}
                accept="image/*"
                value={formData.screenshots}
                onChange={(val) => setFormData(prev => ({ ...prev, screenshots: val }))}
                helperText="Upload gambar tangkapan layar produk (gambar pertama akan menjadi cover katalog)."
              />
            </div>

            {/* Digital Product Archive Upload (ZIP/PDF) */}
            <div className="border-t border-border/40 pt-4">
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <DownloadCloud className="w-4 h-4 text-primary" /> Berkas Unduhan Digital (ZIP / PDF)
              </label>
              <FileUpload
                multiple={false}
                accept=".zip,.pdf,.gz,.tar"
                value={formData.filePath}
                onChange={(val) => setFormData(prev => ({ ...prev, filePath: val }))}
                helperText="Upload arsip file source code atau ebook digital yang akan diunduh oleh pembeli setelah pembayaran terverifikasi."
              />
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-lg p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Status & Visibilitas</h3>
            
            <label className="flex items-center gap-3 cursor-pointer group mb-4">
              <div className="relative flex items-center">
                <input type="checkbox" name="published" checked={formData.published} onChange={handleCheckbox} className="sr-only" />
                <div className={`w-10 h-5 bg-card border border-border rounded-full transition-colors ${formData.published ? 'bg-primary/20 border-primary' : ''}`}></div>
                <div className={`absolute left-1 top-1 w-3 h-3 rounded-full transition-transform ${formData.published ? 'translate-x-5 bg-primary shadow-sm' : 'bg-gray-400'}`}></div>
              </div>
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">Published (Publik)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleCheckbox} className="sr-only" />
                <div className={`w-10 h-5 bg-card border border-border rounded-full transition-colors ${formData.featured ? 'bg-primary/20 border-primary' : ''}`}></div>
                <div className={`absolute left-1 top-1 w-3 h-3 rounded-full transition-transform ${formData.featured ? 'translate-x-5 bg-primary shadow-sm' : 'bg-gray-400'}`}></div>
              </div>
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">Featured (Tampil di Home)</span>
            </label>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Aksi</h3>
            
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 mb-3 cursor-pointer">
              {loading ? <span className="animate-pulse">Menyimpan...</span> : <><Save className="w-4 h-4" /> {isEdit ? 'Simpan Perubahan' : 'Buat Produk'}</>}
            </button>
            
            <Link href="/admin/products" className="btn-secondary w-full flex items-center justify-center gap-2 py-3 bg-card">
              <ArrowLeft className="w-4 h-4" /> Batal & Kembali
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}