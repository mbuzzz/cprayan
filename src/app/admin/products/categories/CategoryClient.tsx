"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Tag, Layers, X, Save, AlertCircle, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/category";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: {
    products: number;
  };
}

export default function CategoryClient({ initialCategories }: { initialCategories: CategoryItem[] }) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "", description: "" });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description || "" });
    setError("");
    setIsModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!editingCategory) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setFormData({ ...formData, name: val, slug: generatedSlug });
    } else {
      setFormData({ ...formData, name: val });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingCategory) {
        const res = await updateCategory(editingCategory.id, formData);
        if (res.success && res.category) {
          setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, ...res.category } : c));
          setIsModalOpen(false);
        } else {
          setError(res.error || "Gagal memperbarui kategori");
        }
      } else {
        const res = await createCategory(formData);
        if (res.success && res.category) {
          setCategories(prev => [{ ...res.category, _count: { products: 0 } }, ...prev]);
          setIsModalOpen(false);
        } else {
          setError(res.error || "Gagal membuat kategori baru");
        }
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus kategori "${name}"? Produk yang terkait akan menjadi Uncategorized (tidak ikut terhapus).`)) {
      return;
    }

    try {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories(prev => prev.filter(c => c.id !== id));
      } else {
        alert(res.error || "Gagal menghapus kategori");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menghapus kategori");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/products" className="text-muted hover:text-primary transition-colors text-xs font-mono flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Produk
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Kategori Produk</h1>
          <p className="text-sm text-muted">Kelola taksonomi dan klasifikasi katalog produk digital marketplace Anda.</p>
        </div>

        <button
          onClick={openCreateModal}
          type="button"
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm cursor-pointer shadow-md rounded-lg font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 custom-shadow">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-xs text-muted font-mono w-full sm:w-auto text-right">
          Total: <strong className="text-foreground font-bold">{categories.length}</strong> Kategori
        </div>
      </div>

      {/* Category Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden custom-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-xs font-bold text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Kategori</th>
                <th className="p-4">Slug URL</th>
                <th className="p-4">Deskripsi</th>
                <th className="p-4 text-center">Jumlah Produk</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">
                    <Tag className="w-8 h-8 mx-auto mb-2 text-primary opacity-60" />
                    Belum ada kategori yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-surface/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                          <Tag className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-muted">
                      {cat.slug}
                    </td>
                    <td className="p-4 text-xs text-muted max-w-xs truncate">
                      {cat.description || <span className="italic opacity-50">Tidak ada deskripsi</span>}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-primary/10 text-primary border border-primary/20">
                        {cat._count?.products || 0} Produk
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="p-2 rounded-lg bg-surface hover:bg-primary/10 hover:text-primary text-muted border border-border transition-colors cursor-pointer"
                          title="Edit Kategori"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 transition-colors cursor-pointer"
                          title="Hapus Kategori"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface">
              <h3 className="font-heading font-bold text-lg text-foreground">
                {editingCategory ? "Edit Kategori Produk" : "Tambah Kategori Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Nama Kategori *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Misal: UI Kits & Templates"
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
                  placeholder="misal: ui-kits-templates"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5">Deskripsi (Opsional)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan singkat mengenai koleksi produk di kategori ini..."
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs uppercase font-bold font-mono text-muted hover:text-foreground rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-6 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 rounded-lg cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Menyimpan..." : "Simpan Kategori"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
