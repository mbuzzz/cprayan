"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Star, Sparkles, Check, Clock, RefreshCw, Layers } from "lucide-react";
import { deletePackage, togglePopularPackage, togglePublishedPackage } from "@/app/actions/package";

export default function PackageListClient({ initialPackages }: { initialPackages: any[] }) {
  const [packages, setPackages] = useState<any[]>(initialPackages);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = Array.from(new Set(packages.map(p => p.category).filter(Boolean)));

  const filteredPackages = packages.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.slug.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleTogglePopular = async (id: string, name: string) => {
    try {
      const res = await togglePopularPackage(id);
      if (res.success) {
        setPackages(prev => prev.map(p => p.id === id ? { ...p, isPopular: res.isPopular } : p));
      } else {
        alert(res.error || "Gagal mengubah status popular");
      }
    } catch (err: any) {
      alert(err.message || "Gagal mengubah status popular");
    }
  };

  const handleTogglePublished = async (id: string) => {
    try {
      const res = await togglePublishedPackage(id);
      if (res.success) {
        setPackages(prev => prev.map(p => p.id === id ? { ...p, published: res.published } : p));
      } else {
        alert(res.error || "Gagal mengubah status publikasi");
      }
    } catch (err: any) {
      alert(err.message || "Gagal mengubah status publikasi");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus paket layanan "${name}"?`)) return;
    try {
      const res = await deletePackage(id);
      if (res.success) {
        setPackages(prev => prev.filter(p => p.id !== id));
      } else {
        alert(res.error || "Gagal menghapus paket");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menghapus paket");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Paket Layanan Development</h1>
          <p className="text-sm text-muted">
            Kelola paket harga jasa pembuatan website, aplikasi mobile, UI/UX, dan custom software.
          </p>
        </div>
        <Link
          href="/admin/packages/create"
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase font-bold tracking-wider rounded-lg shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket Baru</span>
        </Link>
      </div>

      {/* Filter & Search */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between custom-shadow">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari nama paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono transition-colors"
          >
            <option value="all">Semua Kategori Layanan</option>
            {categories.map((c: any) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <span className="text-xs text-muted font-mono">
            Total: <strong className="text-foreground font-bold">{filteredPackages.length}</strong> Paket
          </span>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden custom-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-xs font-bold text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Nama Paket</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga Mulai Dari</th>
                <th className="p-4">Pengerjaan & Revisi</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Best Seller</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-muted">
                    <Layers className="w-10 h-10 mx-auto mb-2 text-primary opacity-50" />
                    Belum ada paket layanan development. Klik "Tambah Paket Baru" untuk membuat.
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => {
                  let featureCount = 0;
                  try {
                    const parsed = JSON.parse(pkg.features);
                    featureCount = Array.isArray(parsed) ? parsed.length : 0;
                  } catch (e) {}

                  return (
                    <tr key={pkg.id} className="hover:bg-surface/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                              {pkg.name}
                            </span>
                            {pkg.isPopular && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-primary/20 text-primary border border-primary/30">
                                <Sparkles className="w-2.5 h-2.5" /> Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted line-clamp-1 mt-0.5">{pkg.description}</p>
                          <span className="text-[10px] font-mono text-muted/60">{featureCount} fitur deliverables</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface border border-border text-xs font-mono text-foreground">
                          {pkg.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <div>
                          {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                            <span className="line-through text-muted text-[10px] font-mono block">
                              Rp {pkg.originalPrice.toLocaleString("id-ID")}
                            </span>
                          )}
                          <span className="font-mono font-bold golden-text text-sm">
                            Rp {pkg.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-xs text-muted space-y-0.5 font-mono">
                        <div className="flex items-center gap-1.5 text-foreground">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{pkg.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted">
                          <RefreshCw className="w-3 h-3" />
                          <span>{pkg.revisionCount}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(pkg.id)}
                          className="cursor-pointer"
                          title="Klik untuk ubah status"
                        >
                          {pkg.published ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20 hover:opacity-80">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Aktif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20 hover:opacity-80">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Draft
                            </span>
                          )}
                        </button>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePopular(pkg.id, pkg.name)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono font-bold ${
                            pkg.isPopular
                              ? "bg-primary/10 border-primary/40 text-primary shadow-sm hover:bg-primary/20"
                              : "bg-surface border-border text-muted/50 hover:border-primary hover:text-primary"
                          }`}
                          title={pkg.isPopular ? "Best Seller Aktif (Klik untuk matikan)" : "Jadikan Best Seller"}
                        >
                          <Star className={`w-4 h-4 ${pkg.isPopular ? "fill-primary text-primary" : ""}`} />
                        </button>
                      </td>

                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/packages/${pkg.id}/edit`}
                            className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
                            title="Edit Paket"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(pkg.id, pkg.name)}
                            className="p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 border border-transparent hover:border-red-500 transition-all cursor-pointer"
                            title="Hapus Paket"
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
