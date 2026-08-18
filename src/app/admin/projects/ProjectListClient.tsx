"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, Star, StarOff, Sparkles, ExternalLink } from "lucide-react";
import { deleteProject, toggleFeaturedProject, togglePublishedProject } from "@/app/actions/project";

export default function ProjectListClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleFeatured = async (id: string, currentStatus: boolean, title: string) => {
    try {
      const res = await toggleFeaturedProject(id);
      if (res.success) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, featured: res.featured } : p));
      } else {
        alert(res.error || "Gagal mengubah status unggulan");
      }
    } catch (err: any) {
      alert(err.message || "Gagal mengubah status unggulan");
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const res = await togglePublishedProject(id);
      if (res.success) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, published: res.published } : p));
      } else {
        alert(res.error || "Gagal mengubah status publikasi");
      }
    } catch (err: any) {
      alert(err.message || "Gagal mengubah status publikasi");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus project "${title}"?`)) return;
    try {
      const res = await deleteProject(id);
      if (res.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        alert(res.error || "Gagal menghapus project");
      }
    } catch (err: any) {
      alert(err.message || "Gagal menghapus project");
    }
  };

  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manajemen Portofolio Proyek</h1>
          <p className="text-sm text-muted">
            Kelola studi kasus, showcase proyek, dan tentukan proyek unggulan yang tampil di beranda.
          </p>
        </div>
        <Link 
          href="/admin/projects/create" 
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase font-bold tracking-wider rounded-lg shadow-md"
        >
          <Plus className="w-4 h-4" /> Tambah Proyek Baru
        </Link>
      </div>

      {/* Info Banner for Featured Projects */}
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-foreground">
          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
          <span>
            Klik ikon <strong>Bintang (Star)</strong> pada tabel di bawah untuk langsung menjadikan proyek sebagai <strong>Proyek Unggulan di Beranda</strong>.
          </span>
        </div>
        <span className="font-mono text-primary font-bold bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20 flex-shrink-0">
          {featuredCount} Proyek Unggulan Aktif
        </span>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between custom-shadow">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Cari judul atau slug proyek..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-xs text-muted font-mono">
          Total: <strong className="text-foreground font-bold">{filteredProjects.length}</strong> Proyek
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden custom-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-xs font-bold text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Proyek</th>
                <th className="p-4">Teknologi</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Unggulan Beranda</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted">
                    Tidak ada proyek yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  let image = "/asset/logorayan.png";
                  let tech = [];
                  try {
                    const parsed = JSON.parse(project.screenshots);
                    if (parsed.length > 0) image = parsed[0];
                    tech = JSON.parse(project.techStack);
                  } catch (e) {}

                  return (
                    <tr key={project.id} className="hover:bg-surface/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-10 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                            <Image src={image} alt={project.title} width={56} height={36} className="object-cover w-full h-full rounded" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                              {project.title}
                            </p>
                            <p className="text-xs text-muted font-mono">{project.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {tech.slice(0, 3).map((t: string, i: number) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-surface border border-border text-muted">
                              {t}
                            </span>
                          ))}
                          {tech.length > 3 && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface border border-border text-muted">
                              +{tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(project.id, project.published)}
                          className="cursor-pointer"
                          title="Klik untuk mengubah status"
                        >
                          {project.published ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20 hover:opacity-80 transition-opacity">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20 hover:opacity-80 transition-opacity">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Draft
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(project.id, project.featured, project.title)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono font-bold ${
                            project.featured
                              ? "bg-primary/10 border-primary/40 text-primary shadow-sm hover:bg-primary/20"
                              : "bg-surface border-border text-muted/50 hover:border-primary hover:text-primary"
                          }`}
                          title={project.featured ? "Proyek Unggulan Aktif (Klik untuk matikan)" : "Jadikan Proyek Unggulan"}
                        >
                          <Star className={`w-4 h-4 ${project.featured ? "fill-primary text-primary" : ""}`} />
                          <span className="hidden sm:inline">
                            {project.featured ? "Unggulan" : "Biasa"}
                          </span>
                        </button>
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/projects/${project.slug}`} 
                            target="_blank" 
                            className="p-2 rounded-lg text-muted hover:text-primary hover:bg-surface border border-transparent hover:border-border transition-all" 
                            title="Lihat Halaman Proyek"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link 
                            href={`/admin/projects/${project.id}/edit`} 
                            className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all" 
                            title="Edit Proyek"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(project.id, project.title)}
                            className="p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 border border-transparent hover:border-red-500 transition-all cursor-pointer" 
                            title="Hapus Proyek"
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
