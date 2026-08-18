"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Code, FileText } from "lucide-react";
import Link from "next/link";
import { createProject, updateProject } from "@/app/actions/project";
import RichTextEditor from "@/components/admin/RichTextEditor";
import FileUpload from "@/components/admin/FileUpload";
import TagInput from "@/components/admin/TagInput";

export default function ProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    published: initialData ? initialData.published : true,
    featured: initialData ? initialData.featured : false,
    screenshots: initialData?.screenshots || '["/asset/logorayan.png"]',
    techStack: initialData?.techStack || '["Next.js", "Tailwind CSS"]',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        result = await updateProject(initialData.id, formData);
      } else {
        result = await createProject(formData);
      }
      
      if (result.success) {
        alert(isEdit ? "Project berhasil diperbarui!" : "Project berhasil ditambahkan!");
        router.push("/admin/projects");
      } else {
        setError(result.error || "Gagal menyimpan project");
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
                <label className="block text-sm font-medium text-foreground mb-1">Nama Project *</label>
                <input 
                  type="text" name="title" required value={formData.title} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Misal: Website E-Commerce Toko X" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Slug URL *</label>
                <input 
                  type="text" name="slug" required value={formData.slug} onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Deskripsi Singkat *</label>
              <textarea 
                name="description" required value={formData.description} onChange={handleChange} rows={3}
                className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                placeholder="Ringkasan project untuk card portfolio..." 
              />
            </div>

            {/* Rich Text Editor for Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Konten Studi Kasus (Rich Text WYSIWYG)
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                placeholder="Tulis latar belakang, tantangan, dan solusi project di sini..."
                minHeight="280px"
              />
            </div>
            
            {/* Interactive Tag Input for Tech Stack */}
            <div>
              <TagInput
                label="Tech Stack"
                value={formData.techStack}
                onChange={(val) => setFormData(prev => ({ ...prev, techStack: val }))}
                placeholder="Ketik teknologi (misal: Next.js, PostgreSQL) lalu tekan Enter..."
                helperText="Teknologi yang digunakan dalam pembangunan project ini."
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2 text-foreground">
              <ImageIcon className="w-5 h-5 text-primary" /> Screenshots & Galeri Portfolio
            </h3>
            
            <div>
              <FileUpload
                label="Upload Screenshots"
                multiple={true}
                accept="image/*"
                value={formData.screenshots}
                onChange={(val) => setFormData(prev => ({ ...prev, screenshots: val }))}
                helperText="Drag & drop tangkapan layar project (gambar pertama akan menjadi cover)."
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
              {loading ? <span className="animate-pulse">Menyimpan...</span> : <><Save className="w-4 h-4" /> {isEdit ? 'Simpan Perubahan' : 'Buat Project'}</>}
            </button>
            
            <Link href="/admin/projects" className="btn-secondary w-full flex items-center justify-center gap-2 py-3 bg-card">
              <ArrowLeft className="w-4 h-4" /> Batal & Kembali
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}