"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Star, StarOff, Tag, ExternalLink, ShieldCheck } from "lucide-react";
import { deleteProduct } from "@/app/actions/product";

export default function ProductListClient({ initialProducts, categoryCount }: { initialProducts: any[], categoryCount: number }) {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Extract unique categories
  const categories = Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category?.name === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus produk "${title}"?`)) return;
    try {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert(res.error || "Gagal menghapus produk");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menghapus produk");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manajemen Produk</h1>
          <p className="text-sm text-muted">Kelola katalog produk digital, harga, berkas source code, dan lisensi.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products/categories"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface border border-border hover:border-primary hover:text-primary text-foreground text-xs uppercase font-mono tracking-wider rounded-lg transition-all font-semibold"
          >
            <Tag className="w-4 h-4 text-primary" />
            <span>Kelola Kategori ({categoryCount})</span>
          </Link>
          <Link
            href="/admin/products/create"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase font-bold tracking-wider rounded-lg shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between custom-shadow">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari nama atau slug produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono transition-colors"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c: any) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <span className="text-xs text-muted font-mono">
            Total: <strong className="text-foreground font-bold">{filteredProducts.length}</strong> produk
          </span>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden custom-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-xs font-bold text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Lisensi</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-muted">
                    Tidak ada produk yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  let image = "/asset/logorayan.png";
                  try {
                    const parsed = JSON.parse(product.screenshots);
                    if (parsed.length > 0) image = parsed[0];
                  } catch (e) {}

                  return (
                    <tr key={product.id} className="hover:bg-surface/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                            <Image src={image} alt={product.title} width={36} height={36} className="object-contain" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                              {product.title}
                            </p>
                            <p className="text-xs text-muted font-mono">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface border border-border text-xs text-foreground font-mono">
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold golden-text text-sm">
                        Rp {product.price.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4">
                        {product.license ? (
                          <span className="inline-flex items-center gap-1 text-xs text-foreground font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            <span className="max-w-[130px] truncate">{product.license}</span>
                          </span>
                        ) : (
                          <span className="text-xs text-muted italic">Regular</span>
                        )}
                      </td>
                      <td className="p-4">
                        {product.published ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Draft
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {product.featured ? (
                          <Star className="w-4 h-4 text-primary fill-primary inline-block" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted/40 inline-block" />
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-muted hover:text-primary hover:bg-surface border border-transparent hover:border-border transition-all"
                            title="Lihat Produk"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
                            title="Edit Produk"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.title)}
                            className="p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 border border-transparent hover:border-red-500 transition-all cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
