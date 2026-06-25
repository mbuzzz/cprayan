import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Check, Calendar, Tag, RefreshCw, FileCode, MonitorPlay, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductTabs from "@/components/ProductTabs";

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, published: true },
    include: { 
      category: true,
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      },
      _count: { select: { orderItems: true } }
    }
  });

  if (!product) notFound();

  // Parse JSON fields safely
  let screenshots = ["/asset/logorayan.png"];
  let demoLinks = [];
  try {
    if (product.screenshots) screenshots = JSON.parse(product.screenshots);
    if (product.demoLinks) demoLinks = JSON.parse(product.demoLinks);
  } catch(e) {}

  const mainImage = screenshots[0] || "/asset/logorayan.png";
  const liveDemoLink = demoLinks.length > 0 ? demoLinks[0].url : "#";
  
  const productForCart = {
    ...product,
    image: mainImage
  };

  // Calculate average rating
  const avgRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length 
    : 5.0;

  return (
    <div className="bg-background min-h-screen pb-20 transition-colors duration-300">
      {/* Product Header */}
      <div className="bg-card border-b border-border pt-8 pb-10 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{product.category?.name || "Uncategorized"}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{product.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${avgRating >= i ? 'text-primary fill-primary' : 'text-muted'}`} />)}
              </div>
              <span className="text-foreground font-bold">{avgRating.toFixed(1)}</span>
              <span className="text-muted">({product.reviews.length} reviews)</span>
            </div>
            
            <div className="flex items-center gap-2 border-l border-border pl-6">
              <ShoppingCart className="w-4 h-4 text-muted" />
              <span className="text-foreground font-medium">{product._count.orderItems || "0"} Sales</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Image/Preview Card */}
            <div className="bg-card border border-border rounded-lg overflow-hidden mb-8 custom-shadow group relative transition-colors duration-300">
              <div className="aspect-[16/9] relative bg-[#121415] flex items-center justify-center p-8">
                <Image 
                  src={mainImage} 
                  alt={product.title} 
                  width={600} 
                  height={400} 
                  className="object-contain w-full h-full drop-shadow-[0_0_20px_rgba(198,161,91,0.2)]"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Link href={liveDemoLink} target="_blank" className="btn-primary flex items-center gap-2 px-8 py-4">
                    <MonitorPlay className="w-5 h-5" /> Live Preview
                  </Link>
                </div>
              </div>
            </div>

            {/* Tabs & Description handled by Client Component */}
            <ProductTabs product={product} reviews={product.reviews} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Purchase Card */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6 custom-shadow sticky top-24 transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted font-bold">Regular License</span>
                <span className="text-3xl font-bold golden-text">Rp {product.price.toLocaleString('id-ID')}</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted">Quality checked by Rayan</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted">Future updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted">6 months support</span>
                </div>
              </div>
              
              <AddToCartButton product={productForCart} />
              
              <Link href={`/checkout?product=${product.id}`} className="btn-primary w-full py-3 text-center block">
                Buy Now
              </Link>
              
              <p className="text-xs text-center text-muted mt-4">Price is in Indonesian Rupiah (IDR)</p>
            </div>

            {/* Product Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 custom-shadow transition-colors duration-300">
              <h3 className="font-bold border-b border-border pb-4 mb-4 text-foreground">Item Information</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted flex items-center gap-2"><Calendar className="w-4 h-4" /> Released</span>
                  <span className="text-foreground">{product.releaseDate ? new Date(product.releaseDate).toLocaleDateString('id-ID') : new Date(product.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Last Update</span>
                  <span className="text-foreground">{new Date(product.updatedAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted flex items-center gap-2"><Tag className="w-4 h-4" /> Version</span>
                  <span className="text-foreground">{product.version || "1.0.0"}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted flex items-center gap-2"><FileCode className="w-4 h-4" /> Category</span>
                  <span className="text-primary font-medium">{product.category?.name || "Uncategorized"}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
