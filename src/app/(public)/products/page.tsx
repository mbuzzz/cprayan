import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Star, ShoppingCart, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // Disable static caching for dynamic data

export default async function ProductsPage() {
  const productsRaw = await prisma.product.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  const products = productsRaw.map(p => {
    let images = ["/asset/logorayan.png"];
    try {
      if (p.screenshots) images = JSON.parse(p.screenshots as string);
    } catch(e) {}

    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category?.name || "Uncategorized",
      price: p.price,
      rating: 5.0, // Mock for now until reviews are implemented
      sales: p.id.length % 100, // Mock
      image: images[0] || "/asset/logorayan.png",
      author: "Rayan Smart Kreatif"
    };
  });

  return (
    <div className="bg-[#0a0b0c] min-h-screen relative overflow-hidden">
      {/* Glow effect */}
      <div className="glow-blob bg-primary/10 w-[800px] h-[800px] top-0 left-1/2 -translate-x-1/2"></div>
      
      <div className="bg-[#121415]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)] pt-20 pb-16 relative z-10 custom-shadow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">MARKETPLACE <span className="golden-text">DIGITAL</span></h1>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">Temukan aset digital premium, mulai dari source code, template presentasi (PPT), font, gambar, hingga audio berkualitas tinggi untuk project Anda.</p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto flex gap-3">
            <div className="relative flex-grow group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Cari script, font, template PPT, atau audio..." 
                className="w-full bg-[#121415]/80 border border-[rgba(255,255,255,0.1)] rounded-[15px] pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
              />
            </div>
            <button className="btn-primary py-4 px-8 rounded-[15px] flex items-center gap-2">
              <Search className="w-4 h-4" /> Cari
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <div className="w-full lg:w-1/4">
            <div className="card-hover p-6 sticky top-28">
              <div className="flex items-center gap-2 font-bold mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                <Filter className="w-5 h-5 text-primary" /> Filter Produk
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm text-white">Kategori</h4>
                <div className="space-y-2.5">
                  {["Semua Kategori", "Scripts & Code", "Presentation (PPT)", "Fonts", "Graphics & Photos", "Audio & Video", "Web Themes"].map((cat, i) => (
                    <label key={i} className="flex items-center gap-3 text-sm text-muted hover:text-white cursor-pointer group transition-colors">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input type="checkbox" className="peer w-4 h-4 rounded bg-[#121415] border-gray-600 text-primary focus:ring-primary focus:ring-offset-[#121415] transition-all" defaultChecked={i===0} />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm text-white">Harga</h4>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 text-sm text-muted hover:text-white cursor-pointer group transition-colors">
                    <input type="radio" name="price" className="bg-[#121415] border-gray-600 text-primary focus:ring-primary focus:ring-offset-[#121415]" defaultChecked />
                    <span className="group-hover:translate-x-1 transition-transform">Semua Harga</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-muted hover:text-white cursor-pointer group transition-colors">
                    <input type="radio" name="price" className="bg-[#121415] border-gray-600 text-primary focus:ring-primary focus:ring-offset-[#121415]" />
                    <span className="group-hover:translate-x-1 transition-transform">Di bawah Rp 100.000</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-muted hover:text-white cursor-pointer group transition-colors">
                    <input type="radio" name="price" className="bg-[#121415] border-gray-600 text-primary focus:ring-primary focus:ring-offset-[#121415]" />
                    <span className="group-hover:translate-x-1 transition-transform">Rp 100.000 - Rp 500.000</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-muted hover:text-white cursor-pointer group transition-colors">
                    <input type="radio" name="price" className="bg-[#121415] border-gray-600 text-primary focus:ring-primary focus:ring-offset-[#121415]" />
                    <span className="group-hover:translate-x-1 transition-transform">Di atas Rp 500.000</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted text-sm">Menampilkan <span className="text-white font-bold px-2 py-0.5 bg-card rounded-md border border-[rgba(255,255,255,0.05)]">{products.length}</span> produk</p>
              <div className="relative group">
                <select className="appearance-none bg-card/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-[12px] pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors cursor-pointer hover:border-primary/50">
                  <option>Terbaru</option>
                  <option>Terpopuler</option>
                  <option>Harga: Rendah ke Tinggi</option>
                  <option>Harga: Tinggi ke Rendah</option>
                  <option>Rating Tertinggi</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-muted group-hover:text-primary transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="card-hover overflow-hidden group flex flex-col h-full relative">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-[#121415] flex items-center justify-center p-6 border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={120}
                      height={120}
                      className="opacity-70 group-hover:scale-110 transition-transform duration-700 object-contain drop-shadow-[0_0_10px_rgba(198,161,91,0.2)]"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-[rgba(255,255,255,0.1)] px-3 py-1 rounded-[8px] text-[10px] font-bold golden-text tracking-wider uppercase">
                      {product.category}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 flex-grow flex flex-col relative z-10">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-snug">
                      <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                        {product.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted mb-4 flex items-center gap-1.5">
                      by <span className="text-gray-300 font-medium flex items-center gap-1">{product.author} <CheckCircle className="w-3 h-3 text-blue-400" /></span>
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm bg-[#121415] px-2 py-1 rounded-md border border-[rgba(255,255,255,0.05)]">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                        <span className="font-bold text-white">{product.rating}</span>
                        <span className="text-muted text-xs ml-0.5">({product.sales})</span>
                      </div>
                      <div className="text-lg font-bold golden-text">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions (Hover) */}
                  <div className="px-5 pb-5 pt-0 relative z-10">
                    <div className="flex gap-3">
                      <Link href={`/products/${product.slug}`} className="flex-grow btn-secondary text-center py-2.5 text-sm flex items-center justify-center">
                        Detail
                      </Link>
                      <button className="w-11 h-11 bg-primary text-black rounded-[12px] flex items-center justify-center hover:bg-[#D4AF37] transition-all shrink-0 shadow-[0_0_10px_rgba(198,161,91,0.3)] hover:shadow-[0_0_15px_rgba(198,161,91,0.5)] transform hover:-translate-y-1">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-14">
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-[12px] bg-card/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-muted hover:text-white hover:border-primary transition-all shadow-sm hover:shadow-[0_0_10px_rgba(198,161,91,0.2)]">1</button>
                <button className="w-10 h-10 rounded-[12px] bg-primary text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(198,161,91,0.3)]">2</button>
                <button className="w-10 h-10 rounded-[12px] bg-card/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-muted hover:text-white hover:border-primary transition-all shadow-sm hover:shadow-[0_0_10px_rgba(198,161,91,0.2)]">3</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
