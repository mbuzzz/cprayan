import PageHeader from "@/components/PageHeader";
import { Search, Filter, ShoppingCart, Star, CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; sort?: string; page?: string }
}) {
  const { q, category, sort, page } = await searchParams;
  
  const query = q || "";
  const categoryFilter = category || "";
  const currentPage = parseInt(page || "1");
  const limit = 9;
  const skip = (currentPage - 1) * limit;

  // Build Prisma Where Clause
  const whereClause: any = {
    published: true,
  };

  if (query) {
    whereClause.title = { contains: query };
  }

  if (categoryFilter) {
    whereClause.category = { slug: categoryFilter };
  }

  // Build Prisma OrderBy Clause
  let orderByClause: any = { createdAt: "desc" };
  if (sort === "price-asc") orderByClause = { price: "asc" };
  if (sort === "price-desc") orderByClause = { price: "desc" };
  if (sort === "popular") orderByClause = { orderItems: { _count: "desc" } };

  // Fetch Data
  const [productsRaw, totalProducts, categories] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: { category: true, _count: { select: { orderItems: true } } },
      orderBy: orderByClause,
      skip,
      take: limit,
    }),
    prisma.product.count({ where: whereClause }),
    prisma.category.findMany({ orderBy: { name: "asc" } })
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  const products = productsRaw.map(p => {
    let images = ["/asset/logorayan.png"];
    try {
      if (p.screenshots) images = JSON.parse(p.screenshots as string);
    } catch(e) {}
    
    return {
      ...p,
      image: images[0] || "/asset/logorayan.png",
      categoryName: p.category?.name || "Uncategorized"
    };
  });

  return (
    <div className="pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-br from-background to-card border-b border-border pt-20 pb-16 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('/asset/logorayan.png')] bg-no-repeat bg-right-bottom bg-[length:500px] opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">MARKETPLACE <span className="golden-text">DIGITAL</span></h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">Temukan source code, template presentasi, grafis, dan font premium untuk mempercepat proyek Anda berikutnya.</p>
          
          <form className="max-w-2xl mx-auto relative flex items-center" method="GET" action="/products">
            <Search className="w-5 h-5 absolute left-4 text-muted" />
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Cari produk digital, tema, script..." 
              className="w-full bg-background border-2 border-primary/20 rounded-full pl-12 pr-32 py-4 text-foreground focus:outline-none focus:border-primary shadow-lg transition-colors"
            />
            {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
            {sort && <input type="hidden" name="sort" value={sort} />}
            
            <button type="submit" className="absolute right-2 btn-primary py-2 px-6 rounded-full text-sm">
              Cari
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <div className="w-full lg:w-1/4">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24 custom-shadow transition-colors duration-300">
              <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2"><Filter className="w-4 h-4" /> Filter</h3>
                {(query || categoryFilter || sort) && (
                  <Link href="/products" className="text-xs text-primary hover:underline">Reset</Link>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-sm text-foreground mb-3 uppercase tracking-wider">Kategori</h4>
                  <div className="space-y-2">
                    <Link 
                      href={`/products?q=${query}&sort=${sort}`}
                      className={`block text-sm ${!categoryFilter ? 'text-primary font-bold' : 'text-muted hover:text-foreground'}`}
                    >
                      Semua Kategori
                    </Link>
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id}
                        href={`/products?category=${cat.slug}&q=${query}&sort=${sort}`}
                        className={`block text-sm ${categoryFilter === cat.slug ? 'text-primary font-bold' : 'text-muted hover:text-foreground'}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-foreground mb-3 uppercase tracking-wider">Urutkan</h4>
                  <div className="space-y-2">
                    {[
                      { value: "", label: "Terbaru" },
                      { value: "popular", label: "Terpopuler" },
                      { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
                      { value: "price-desc", label: "Harga: Tinggi ke Rendah" }
                    ].map((s) => (
                      <Link 
                        key={s.value}
                        href={`/products?sort=${s.value}&category=${categoryFilter}&q=${query}`}
                        className={`block text-sm ${sort === s.value || (!sort && !s.value) ? 'text-primary font-bold' : 'text-muted hover:text-foreground'}`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted text-sm">Menampilkan <strong className="text-foreground">{totalProducts}</strong> produk {query && `untuk "${query}"`}</p>
            </div>

            {products.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Search className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">Produk Tidak Ditemukan</h3>
                <p className="text-muted mb-6">Maaf, kami tidak dapat menemukan produk yang sesuai dengan kriteria Anda.</p>
                <Link href="/products" className="btn-secondary">Reset Pencarian</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="card-hover group flex flex-col h-full relative p-2 transition-colors duration-300">
                    <div className="relative h-48 bg-background rounded-t-md flex items-center justify-center p-4 border-b border-border overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={160}
                        height={160}
                        className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 object-contain drop-shadow-md dark:drop-shadow-[0_0_10px_rgba(198,161,91,0.2)]"
                      />
                      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-md border border-border px-2 py-1 rounded text-[9px] font-bold golden-text tracking-wider uppercase">
                        {product.categoryName}
                      </div>
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col relative z-10 bg-card rounded-b-md">
                      <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" /> By Rayan
                      </div>
                      
                      <h3 className="font-bold text-sm mb-2 line-clamp-2 leading-snug">
                        <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors text-foreground">
                          {product.title}
                        </Link>
                      </h3>
                      
                      <div className="mt-auto pt-3 border-t border-border/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                            <span className="text-xs font-bold text-foreground">5.0</span>
                            <span className="text-[10px] text-muted">({product._count.orderItems} sales)</span>
                          </div>
                          <div className="font-bold golden-text">
                            Rp {product.price.toLocaleString('id-ID')}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/products/${product.slug}`} className="flex-1 btn-secondary py-2 text-xs">
                            Detail
                          </Link>
                          <div className="flex-1">
                            <AddToCartButton product={product} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Link
                    key={i}
                    href={`/products?page=${i + 1}&q=${query}&category=${categoryFilter}&sort=${sort}`}
                    className={`w-10 h-10 rounded-md flex items-center justify-center font-bold transition-all ${
                      currentPage === i + 1
                        ? 'bg-primary text-black shadow-md'
                        : 'bg-card border border-border text-muted hover:text-foreground hover:border-primary'
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}