import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, Star, StarOff } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Manajemen Portfolio</h1>
          <p className="text-sm text-muted">Kelola semua project showcase dan studi kasus.</p>
        </div>
        <Link href="/admin/projects/create" className="btn-primary flex items-center gap-2 px-4 py-2 text-sm shadow-[0_0_15px_rgba(198,161,91,0.2)]">
          <Plus className="w-4 h-4" /> Tambah Project
        </Link>
      </div>

      {/* Stats/Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between custom-shadow transition-colors duration-300">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Cari project..." 
            className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto text-sm text-muted">
          <span>Total: <strong className="text-foreground">{projects.length}</strong> project</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden custom-shadow transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-xs font-bold text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Project</th>
                <th className="p-4">Teknologi Utama</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">Belum ada portfolio project.</td>
                </tr>
              ) : (
                projects.map((project) => {
                  let image = "/asset/logorayan.png";
                  let tech = [];
                  try {
                    const parsed = JSON.parse(project.screenshots);
                    if (parsed.length > 0) image = parsed[0];
                    tech = JSON.parse(project.techStack);
                  } catch (e) {}

                  return (
                    <tr key={project.id} className="border-b border-border hover:bg-background/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                            <Image src={image} alt={project.title} width={64} height={40} className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">{project.title}</p>
                            <p className="text-xs text-muted font-mono">{project.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {tech.slice(0, 2).map((t: string, i: number) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-background border border-border text-muted">
                              {t}
                            </span>
                          ))}
                          {tech.length > 2 && (
                            <span className="inline-flex items-center px-1 py-0.5 rounded text-[10px] bg-background border border-border text-muted">
                              +{tech.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {project.published ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Draft
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {project.featured ? (
                          <Star className="w-4 h-4 text-primary fill-primary inline-block" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted inline-block" />
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/projects/${project.slug}`} target="_blank" className="p-2 rounded-md text-muted hover:text-foreground hover:bg-background transition-all" title="Lihat">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/admin/projects/${project.id}/edit`} className="p-2 rounded-md text-muted hover:text-blue-500 hover:bg-blue-500/10 transition-all" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button className="p-2 rounded-md text-muted hover:text-red-500 hover:bg-red-500/10 transition-all" title="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}