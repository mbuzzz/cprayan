import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingCart, 
  Star, 
  Check, 
  Calendar, 
  Tag, 
  RefreshCw, 
  FileCode, 
  MonitorPlay, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Download,
  Zap,
  Layers
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductTabs from "@/components/ProductTabs";

export const revalidate = 0;

interface ProductDetailItem {
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
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  } | null;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: {
      name: string | null;
    };
  }>;
  _count: {
    orderItems: number;
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const product = (await prisma.product.findUnique({
    where: { slug, published: true },
    include: { 
      category: true,
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      },
      _count: { select: { orderItems: true } }
    }
  })) as ProductDetailItem | null;

  if (!product) notFound();

  // Fetch Related Products from the same category
  const relatedProductsRaw = product.categoryId
    ? await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          published: true,
          NOT: { id: product.id },
        },
        include: { category: true, _count: { select: { orderItems: true } } },
        take: 3,
        orderBy: { createdAt: "desc" },
      })
    : [];

  const relatedProducts = relatedProductsRaw.map((p: any) => {
    let imgs = ["/asset/logorayan.png"];
    try {
      if (p.screenshots) imgs = JSON.parse(p.screenshots);
    } catch(e) {}
    return {
      ...p,
      image: imgs[0] || "/asset/logorayan.png",
      categoryName: p.category?.name || "Digital Asset"
    };
  });

  // Parse JSON fields safely
  let screenshots: string[] = ["/asset/logorayan.png"];
  let demoLinks: any[] = [];
  try {
    if (product.screenshots) screenshots = JSON.parse(product.screenshots);
    if (product.demoLinks) demoLinks = JSON.parse(product.demoLinks);
  } catch(e) {}

  const mainImage = screenshots[0] || "/asset/logorayan.png";
  const liveDemoLink = demoLinks.length > 0 ? demoLinks[0].url : "";
  
  const productForCart = {
    ...product,
    image: mainImage
  };

  // Calculate average rating
  const avgRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length 
    : 5.0;

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-background min-h-screen pb-24 text-foreground transition-colors duration-300">
      
      {/* 1. Header Banner */}
      <section className="bg-surface border-b border-border pt-10 pb-12 transition-colors duration-300 relative overflow-hidden">
        <div className="glow-blob bg-primary/5 w-[500px] h-[500px] top-0 right-0 pointer-events-none absolute"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-primary transition-colors">Produk</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {product.category ? (
              <Link 
                href={`/products?category=${product.category.slug}`} 
                className="text-primary font-bold hover:underline"
              >
                {product.category.name}
              </Link>
            ) : (
              <span className="text-muted">Digital Asset</span>
            )}
          </nav>
          
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {product.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex text-primary">
                {[1,2,3,4,5].map(i => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${avgRating >= i ? 'fill-primary text-primary' : 'text-muted'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-foreground font-mono">{avgRating.toFixed(1)}</span>
              <span className="text-muted font-mono">({product.reviews.length} ulasan)</span>
            </div>
            
            <div className="flex items-center gap-2 border-l border-border pl-6 text-muted font-mono">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">{product._count.orderItems || 0} Terjual</span>
            </div>

            {product.license && (
              <div className="flex items-center gap-1.5 border-l border-border pl-6 text-primary font-mono font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{product.license}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left: Gallery & Documentation Content */}
          <main className="lg:w-2/3 space-y-8">
            {/* Image Preview Box */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden custom-shadow group relative transition-colors duration-300">
              <div className="aspect-[16/10] relative bg-surface flex items-center justify-center p-8 overflow-hidden">
                <Image 
                  src={mainImage} 
                  alt={product.title} 
                  width={700} 
                  height={450} 
                  className="object-contain w-full h-full drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />

                {liveDemoLink && liveDemoLink !== "#" && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <Link 
                      href={liveDemoLink} 
                      target="_blank" 
                      className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-xs uppercase font-bold tracking-wider rounded-xl shadow-2xl"
                    >
                      <MonitorPlay className="w-5 h-5" /> 
                      <span>Buka Live Demo</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Multi-screenshot thumbnails if available */}
              {screenshots.length > 1 && (
                <div className="p-4 bg-background border-t border-border flex items-center gap-3 overflow-x-auto">
                  {screenshots.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="w-20 h-14 rounded-lg bg-surface border border-border flex-shrink-0 overflow-hidden flex items-center justify-center p-1 cursor-pointer hover:border-primary transition-colors"
                    >
                      <Image src={img} alt={`Preview ${idx + 1}`} width={80} height={50} className="object-contain max-h-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs & Description handled by Client Component */}
            <ProductTabs product={product} reviews={product.reviews} />

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <section className="pt-8 border-t border-border space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">Produk Serupa</h3>
                    <p className="text-xs text-muted">Rekomendasi aset lain dalam kategori {product.category?.name || "yang sama"}.</p>
                  </div>
                  {product.category && (
                    <Link 
                      href={`/products?category=${product.category.slug}`} 
                      className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold"
                    >
                      Lihat Semua <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((rel) => (
                    <div 
                      key={rel.id} 
                      className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between hover:border-primary transition-all duration-200 group custom-shadow"
                    >
                      <Link href={`/products/${rel.slug}`} className="block aspect-[4/3] bg-surface rounded-lg mb-3 overflow-hidden flex items-center justify-center p-2">
                        <Image 
                          src={rel.image} 
                          alt={rel.title} 
                          width={120} 
                          height={120} 
                          className="object-contain group-hover:scale-105 transition-transform max-h-full"
                        />
                      </Link>

                      <div className="space-y-1">
                        <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          <Link href={`/products/${rel.slug}`}>{rel.title}</Link>
                        </h4>
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-mono font-bold text-xs golden-text">
                            {rel.price > 0 ? `Rp ${rel.price.toLocaleString('id-ID')}` : "GRATIS"}
                          </span>
                          <Link 
                            href={`/products/${rel.slug}`} 
                            className="text-[10px] font-mono uppercase font-bold text-primary hover:underline"
                          >
                            Detail →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Right: Sidebar Purchase & Specs Card */}
          <aside className="lg:w-1/3 space-y-6">
            
            {/* Purchase Card */}
            <div className="bg-card border border-border rounded-2xl p-7 sticky top-24 custom-shadow space-y-6 transition-colors duration-300">
              
              {/* Pricing Header */}
              <div className="space-y-1 border-b border-border pb-6">
                <span className="text-xs font-mono text-muted uppercase tracking-wider block font-semibold">
                  {product.license || "Lisensi Standar"}
                </span>

                {/* Strikethrough & Price */}
                <div className="pt-2">
                  {discountPercent > 0 && product.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="line-through text-muted font-mono text-sm">
                        Rp {product.originalPrice.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md">
                        Hemat {discountPercent}%
                      </span>
                    </div>
                  )}
                  
                  <div className="font-mono text-3xl sm:text-4xl font-extrabold golden-text">
                    {product.price > 0 
                      ? `Rp ${product.price.toLocaleString('id-ID')}` 
                      : "GRATIS"}
                  </div>
                </div>
              </div>
              
              {/* Feature Checklist */}
              <div className="space-y-3.5 text-xs text-muted">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground">Unduh instan berkas source code & aset lengkap</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground">Akses pembaruan versi mendatang seumur hidup</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground">Dokumentasi integrasi & bantuan teknis</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <Link 
                  href={`/checkout?product=${product.id}`} 
                  className="btn-primary w-full py-3 text-center block text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 transition-opacity"
                >
                  Beli Sekarang
                </Link>

                <AddToCartButton product={productForCart} variant="detail" />
              </div>
              
              <p className="text-[11px] text-center text-muted font-mono">
                Transaksi aman & diproses secara instan (IDR)
              </p>
            </div>

            {/* Product Meta Info Card */}
            <div className="bg-card border border-border rounded-2xl p-6 custom-shadow space-y-4 transition-colors duration-300">
              <h3 className="font-heading font-bold text-sm text-foreground border-b border-border pb-3">
                Informasi Spesifikasi
              </h3>
              
              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-muted flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Dirilis
                  </span>
                  <span className="text-foreground font-semibold">
                    {product.releaseDate 
                      ? new Date(product.releaseDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) 
                      : new Date(product.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary" /> Pembaruan Terakhir
                  </span>
                  <span className="text-foreground font-semibold">
                    {new Date(product.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" /> Versi
                  </span>
                  <span className="text-foreground font-semibold">
                    v{product.version || "1.0.0"}
                  </span>
                </div>

                {product.license && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Lisensi
                    </span>
                    <span className="text-primary font-bold">
                      {product.license}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-border pt-3">
                  <span className="text-muted flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-primary" /> Kategori
                  </span>
                  {product.category ? (
                    <Link 
                      href={`/products?category=${product.category.slug}`} 
                      className="text-primary font-bold hover:underline"
                    >
                      {product.category.name}
                    </Link>
                  ) : (
                    <span className="text-foreground font-semibold">Digital Asset</span>
                  )}
                </div>
              </div>
            </div>

          </aside>
          
        </div>
      </div>
    </div>
  );
}
