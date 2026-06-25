import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, Star, StarOff } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manajemen Produk</h1>
          <p className="text-sm text-muted">Kelola semua produk digital dan marketplace Anda.</p>
        </div>
        <Link href="/admin/products/create" className="btn-primary flex items-center gap-2 px-4 py-2 text-sm shadow-[0_0_15px_rgba(198,161,91,0.2)]">
          <Plus className="w-4 h-4" /> Tambah Produk
        </Link>
      </div>

      {/* Stats/Filters */}
      <div className="bg-card/50 backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-[15px] p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Cari produk..." 
            className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-[10px] pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto text-sm text-muted">
          <span>Total: <strong className="text-white">{products.length}</strong> produk</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card/80 backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-[20px] overflow-hidden custom-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#121415] border-b border-[rgba(255,255,255,0.05)] text-xs font-bold text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted">Belum ada produk.</td>
                </tr>
              ) : (
                products.map((product) => {
                  let image = "/asset/logorayan.png";
                  try {
                    const parsed = JSON.parse(product.screenshots);
                    if (parsed.length > 0) image = parsed[0];
                  } catch (e) {}

                  return (
                    <tr key={product.id} className="border-b border-[rgba(255,255,255,0.02)] hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[8px] bg-[#121415] border border-[rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden flex-shrink-0">
                            <Image src={image} alt={product.title} width={24} height={24} className="object-contain" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm group-hover:text-primary transition-colors line-clamp-1">{product.title}</p>
                            <p className="text-xs text-muted font-mono">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-[6px] bg-[#121415] border border-[rgba(255,255,255,0.05)] text-xs text-gray-300">
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold golden-text text-sm">Rp {product.price.toLocaleString('id-ID')}</span>
                      </td>
                      <td className="p-4">
                        {product.published ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-[6px] bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-[6px] bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Draft
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {product.featured ? (
                          <Star className="w-4 h-4 text-primary fill-primary inline-block" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted inline-block" />
                        )}
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/products/${product.slug}`} target="_blank" className="p-2 rounded-[8px] text-muted hover:text-white hover:bg-white/10 transition-all" title="Lihat">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/admin/products/${product.id}/edit`} className="p-2 rounded-[8px] text-muted hover:text-blue-400 hover:bg-blue-400/10 transition-all" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button className="p-2 rounded-[8px] text-muted hover:text-red-400 hover:bg-red-400/10 transition-all" title="Hapus">
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