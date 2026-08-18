import PageHeader from "@/components/PageHeader";
import { Search, Filter, ShoppingCart, Star, CheckCircle, ChevronRight, Sparkles, ShieldCheck, Tag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 0;

interface ProductItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  price: number;
  originalPrice?: number | null;
  version?: string | null;
  license?: string | null;
  releaseDate?: Date | null;
  filePath?: string | null;
  featured: boolean;
  published: boolean;
  screenshots: string;
  demoLinks?: string | null;
  categoryId?: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  } | null;
  _count: {
    orderItems: number;
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; sort?: string; page?: string }
}) {
  const { q, category, sort, page } = await searchParams;
  
  const query = q || "";
  const categoryFilter = category || "";
  const currentPage = parseInt(page || "1");
  const limit = 12;
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
    }) as Promise<ProductItem[]>,
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
      categoryName: p.category?.name || "Digital Asset"
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      
      {/* 1. Header Banner */}
      <section className="bg-surface border-b border-border py-16 sm:py-20 relative overflow-hidden transition-colors duration-300">
        <div className="glow-blob bg-primary/5 w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-card border border-border text-primary text-[11px] font-mono uppercase tracking-widest rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Katalog Produk Digital</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight">
            MARKETPLACE <span className="golden-text">DIGITAL</span>
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            Eksplorasi source code siap pakai, template aplikasi, UI kit enterprise, dan modul kustom karya engineer PT. Rayan Smart Kreatif.
          </p>
          
          {/* Search Form */}
          <form className="max-w-2xl mx-auto relative flex items-center pt-2" method="GET" action="/products">
            <Search className="w-5 h-5 absolute left-4 text-muted" />
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Cari nama template, source code, lisensi..." 
              className="w-full bg-background border border-border rounded-full pl-12 pr-32 py-3.5 text-sm text-foreground focus:outline-none focus:border-primary shadow-lg transition-colors font-medium"
            />
            {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
            {sort && <input type="hidden" name="sort" value={sort} />}
            
            <button type="submit" className="absolute right-2 btn-primary py-2 px-6 rounded-full text-xs uppercase font-bold tracking-wider">
              Cari
            </button>
          </form>

          {/* Quick Category Horizontal Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <Link
              href={`/products?q=${query}&sort=${sort}`}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                !categoryFilter
                  ? "bg-primary text-black font-bold shadow-md border border-primary"
                  : "bg-card border border-border text-muted hover:text-foreground hover:border-primary/50"
              }`}
            >
              Semua
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}&q=${query}&sort=${sort}`}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  categoryFilter === cat.slug
                    ? "bg-primary text-black font-bold shadow-md border border-primary"
                    : "bg-card border border-border text-muted hover:text-foreground hover:border-primary/50"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24 custom-shadow space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" /> Filter
                </h3>
                {(query || categoryFilter || sort) && (
                  <Link href="/products" className="text-xs text-primary font-mono hover:underline font-semibold">
                    Reset
                  </Link>
                )}
              </div>
              
              {/* Category Tree */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-bold">Kategori Produk</h4>
                <div className="space-y-1">
                  <Link 
                    href={`/products?q=${query}&sort=${sort}`}
                    className={`block text-xs py-1.5 px-2.5 rounded-md transition-colors ${!categoryFilter ? 'bg-primary/10 text-primary font-bold border border-primary/20' : 'text-muted hover:text-foreground hover:bg-surface'}`}
                  >
                    Semua Kategori
                  </Link>
                  {categories.map((cat) => (
                    <Link 
                      key={cat.id}
                      href={`/products?category=${cat.slug}&q=${query}&sort=${sort}`}
                      className={`block text-xs py-1.5 px-2.5 rounded-md transition-colors ${categoryFilter === cat.slug ? 'bg-primary/10 text-primary font-bold border border-primary/20' : 'text-muted hover:text-foreground hover:bg-surface'}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-bold">Urutkan</h4>
                <div className="space-y-1">
                  {[
                    { value: "", label: "Terbaru" },
                    { value: "popular", label: "Paling Diminati" },
                    { value: "price-asc", label: "Harga Terendah" },
                    { value: "price-desc", label: "Harga Tertinggi" }
                  ].map((s) => (
                    <Link 
                      key={s.value}
                      href={`/products?sort=${s.value}&category=${categoryFilter}&q=${query}`}
                      className={`block text-xs py-1.5 px-2.5 rounded-md transition-colors ${sort === s.value || (!sort && !s.value) ? 'bg-primary/10 text-primary font-bold border border-primary/20' : 'text-muted hover:text-foreground hover:bg-surface'}`}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted text-xs font-mono">
                Menampilkan <strong className="text-foreground font-bold">{totalProducts}</strong> item {query && `untuk "${query}"`}
              </p>
            </div>

            {products.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center space-y-4 custom-shadow">
                <Search className="w-12 h-12 text-primary mx-auto opacity-50" />
                <h3 className="font-heading text-xl font-bold text-foreground">Produk Tidak Ditemukan</h3>
                <p className="text-sm text-muted max-w-sm mx-auto">
                  Maaf, tidak ada produk digital yang cocok dengan filter atau kata kunci yang Anda masukkan.
                </p>
                <div className="pt-2">
                  <Link href="/products" className="btn-primary inline-block px-6 py-2.5 text-xs uppercase font-bold tracking-wider rounded-lg">
                    Reset Filter
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                  >
                    {/* Image Box */}
                    <Link 
                      href={`/products/${product.slug}`}
                      className="aspect-[4/3] bg-surface relative overflow-hidden flex items-center justify-center p-4"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={180}
                        height={180}
                        className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md border border-border px-2.5 py-0.5 rounded-full text-[9px] font-bold golden-text tracking-wider uppercase font-mono shadow-sm">
                        {product.categoryName}
                      </div>
                    </Link>
                    
                    {/* Content Box */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4 border-t border-border group-hover:border-primary/30 transition-colors">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted">
                          <Link 
                            href={`/products?category=${product.category?.slug || ""}`} 
                            className="font-mono text-[10px] uppercase tracking-wider text-muted hover:text-primary transition-colors"
                          >
                            {product.categoryName}
                          </Link>
                          {product.license && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-primary truncate max-w-[140px] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                              <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{product.license}</span>
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-heading font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          <Link href={`/products/${product.slug}`}>
                            {product.title}
                          </Link>
                        </h3>
                      </div>
                      
                      {/* Price & Actions */}
                      <div className="pt-3 border-t border-border/50 space-y-3">
                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                            <span className="font-bold text-foreground">5.0</span>
                            <span className="text-[10px] text-muted font-mono">({product._count.orderItems} sales)</span>
                          </div>
                          
                          <div className="text-right space-y-0.5">
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="flex items-center justify-end gap-1.5">
                                <span className="line-through text-muted text-[11px] font-mono">
                                  Rp {product.originalPrice.toLocaleString('id-ID')}
                                </span>
                                <span className="text-[10px] font-mono text-red-500 font-bold bg-red-500/10 px-1 py-0.2 rounded">
                                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                              </div>
                            )}
                            <div className="font-mono font-bold text-base golden-text">
                              {product.price > 0
                                ? new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0,
                                  }).format(product.price)
                                : "FREE"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <Link 
                            href={`/products/${product.slug}`} 
                            className="flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg bg-surface border border-border text-foreground hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>Lihat Detail</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <AddToCartButton product={product} variant="icon" />
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
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      currentPage === i + 1
                        ? 'bg-primary text-black shadow-md border border-primary'
                        : 'bg-card border border-border text-muted hover:text-foreground hover:border-primary'
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}