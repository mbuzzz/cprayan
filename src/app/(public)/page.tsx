import Link from "next/link";
import { ArrowRight, Star, ShoppingBag, Layers } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  // 1. Fetch site settings directly from database
  let settings: { key: string; value: string }[] = [];
  try {
    settings = await prisma.siteSetting.findMany();
  } catch (e) {
    console.error("Failed to fetch settings from database:", e);
  }

  const getSetting = (key: string, fallback: string) => {
    const s = settings.find((s) => s.key === key);
    return s ? s.value : fallback;
  };

  const heroTitle = getSetting("hero_title", "BUILD. BUY. GROW.");
  const heroSubtitle = getSetting(
    "hero_subtitle",
    "PT. Rayan Smart Kreatif menghadirkan solusi teknologi enterprise, dari pengembangan sistem kustom hingga aset produk digital premium untuk mempercepat proyek Anda."
  );

  // 2. Fetch real products from database
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { published: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  // 3. Fetch real categories from database
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      take: 8,
      orderBy: { name: "asc" },
    });
  } catch (e) {
    console.error("Failed to fetch categories:", e);
  }

  // 4. Fetch featured project from database
  let featuredProject: any = null;
  try {
    featuredProject = await prisma.project.findFirst({
      where: { published: true, featured: true },
      orderBy: { createdAt: "desc" },
    });
    if (!featuredProject) {
      featuredProject = await prisma.project.findFirst({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {
    console.error("Failed to fetch featured project:", e);
  }

  let projectScreenshots: string[] = [];
  if (featuredProject?.screenshots) {
    try {
      projectScreenshots = JSON.parse(featuredProject.screenshots);
    } catch (e) {}
  }
  const featuredProjectImage = projectScreenshots[0] || "/asset/logorayan.png";

  // 5. Fetch real services from database
  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      where: { published: true },
      take: 4,
      orderBy: { order: "asc" },
    });
  } catch (e) {
    console.error("Failed to fetch services:", e);
  }

  return (
    <div className="flex flex-col bg-[#080808] text-[#e3e2e2] selection:bg-[#f2ca50] selection:text-[#3c2f00]">
      {/* 1. HERO SECTION (Swiss Asymmetry Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
        <div className="lg:col-span-6 z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121414] border border-[#4d4635]/40 text-[#f2ca50] text-[11px] font-mono uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#f2ca50] rounded-full animate-pulse"></span>
            Aureum Digital Studio
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[0.95] text-[#e3e2e2]">
            {heroTitle.includes(" ") ? (
              <>
                {heroTitle.split(" ").slice(0, 2).join(" ")}
                <br />
                <span className="text-[#f2ca50]">
                  {heroTitle.split(" ").slice(2).join(" ") || "GROW."}
                </span>
              </>
            ) : (
              <span className="text-[#f2ca50]">{heroTitle}</span>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#d0c5af] max-w-lg leading-relaxed font-normal">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
            <Link
              href="/products"
              className="px-6 sm:px-8 py-3.5 border border-[#f2ca50] text-[#f2ca50] font-mono text-xs uppercase tracking-widest hover:bg-[#f2ca50] hover:text-[#080808] transition-all duration-300 font-semibold"
            >
              Explore Marketplace
            </Link>
            <Link
              href="/services"
              className="px-6 sm:px-8 py-3.5 text-[#e3e2e2] font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:text-[#f2ca50] transition-colors duration-300 group"
            >
              Custom Solutions{" "}
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-[#f2ca50]" />
            </Link>
          </div>
        </div>

        {/* Hero Showcase */}
        <div className="lg:col-span-6 relative mt-8 lg:mt-0">
          {featuredProject ? (
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="aspect-[16/11] w-full block relative group overflow-hidden border border-[#4d4635]/40 bg-[#121414]"
            >
              <img
                src={featuredProjectImage}
                alt={featuredProject.title}
                className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#080808]/95 via-[#080808]/70 to-transparent border-t border-[#4d4635]/20">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#f2ca50] mb-1 block">
                  01 / FEATURED SHOWCASE
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#f2ca50] transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-xs text-[#d0c5af] mt-1 line-clamp-1">
                  {featuredProject.description}
                </p>
              </div>
            </Link>
          ) : (
            <div className="aspect-[16/11] w-full flex flex-col items-center justify-center border border-[#4d4635]/40 bg-[#121414] p-8 text-center">
              <Layers className="w-12 h-12 text-[#f2ca50] mb-4 opacity-80" />
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                Bespoke Digital Portfolio
              </h3>
              <p className="text-xs text-[#d0c5af] max-w-sm">
                Lihat portofolio proyek dan solusi enterprise kustom yang telah kami kembangkan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. MARKETPLACE ENTRY & FEATURED PRODUCTS */}
      <section className="bg-[#121414] border-t border-[#4d4635]/30 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#e3e2e2] tracking-tight">
              Digital products, ready to build on.
            </h2>
            <p className="text-sm sm:text-base text-[#d0c5af] leading-relaxed">
              Accelerate your workflow with our meticulously crafted UI kits, templates, and comprehensive toolsets.
            </p>
          </div>

          {/* Category Filter Bar */}
          <div className="flex justify-start md:justify-center gap-6 border-b border-[#4d4635]/30 pb-4 overflow-x-auto whitespace-nowrap text-xs uppercase tracking-widest font-mono">
            <Link
              href="/products"
              className="text-[#f2ca50] border-b-2 border-[#f2ca50] pb-4 -mb-[18px] font-bold"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
              {products.map((product) => {
                let screenshots: string[] = [];
                try {
                  if (product.screenshots) screenshots = JSON.parse(product.screenshots);
                } catch (e) {}
                const productImage = screenshots[0] || "/asset/logorayan.png";

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group flex flex-col bg-[#1b1c1c] border border-[#4d4635]/30 hover:border-[#f2ca50]/70 transition-all duration-300 p-3.5"
                  >
                    <div className="aspect-[4/3] bg-[#292a2a] overflow-hidden relative mb-4 border border-[#4d4635]/20">
                      <img
                        src={productImage}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.featured && (
                        <div className="absolute top-2.5 left-2.5 bg-[#f2ca50] text-[#080808] px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-2.5 right-2.5 bg-[#080808]/90 text-[#e3e2e2] border border-[#4d4635]/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                        {product.category?.name || "ASSET"}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-heading font-semibold text-base text-[#e3e2e2] group-hover:text-[#f2ca50] transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <span className="font-mono font-bold text-sm text-[#f2ca50] ml-2 flex-shrink-0">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#858585] mt-auto pt-2 border-t border-[#4d4635]/20">
                      <span className="font-mono text-[10px] text-[#d0c5af]">
                        {product.version ? `v${product.version}` : product.category?.name || "Ready"}
                      </span>
                      <div className="flex items-center gap-1 text-[#f2ca50]">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-mono text-[11px] text-[#e3e2e2]">5.0</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-[#858585] border border-[#4d4635]/20 p-8">
              <ShoppingBag className="w-12 h-12 text-[#f2ca50] mx-auto mb-3 opacity-60" />
              <p className="text-sm">Belum ada produk yang dipublikasikan.</p>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <Link
              href="/products"
              className="px-8 py-3.5 border border-[#4d4635]/60 text-[#e3e2e2] font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all group"
            >
              View All Products{" "}
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FIND WHAT YOU'RE BUILDING (Category Bento Cards) */}
      <section className="border-t border-[#4d4635]/30 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#f2ca50]">
              Categories & Solutions
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#e3e2e2]">
              Find what you're building.
            </h2>
            <p className="text-sm text-[#d0c5af]">
              Browse our categories to find the perfect foundation for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category, idx) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="bg-[#121414] border border-[#4d4635]/30 p-6 sm:p-8 hover:border-[#f2ca50] transition-colors group flex flex-col justify-between space-y-6"
              >
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#e3e2e2] group-hover:text-[#f2ca50] transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#d0c5af] leading-relaxed">
                    {category.description || "Koleksi aset dan template berkualitas tinggi siap pakai."}
                  </p>
                </div>
                <div className="border-t border-[#4d4635]/20 pt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#f2ca50]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUILT FOR BUILDERS (3 Pillars) */}
      <section className="bg-[#121414] border-t border-[#4d4635]/30 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-b md:border-b-0 md:border-r border-[#4d4635]/30 pb-8 md:pb-0 md:pr-8 space-y-4">
            <span className="font-mono text-2xl font-bold text-[#f2ca50]">01</span>
            <h3 className="font-heading text-xl font-bold text-[#e3e2e2]">Quality First</h3>
            <p className="text-sm text-[#d0c5af] leading-relaxed">
              Every pixel, animation, and line of code is meticulously engineered to meet stringent enterprise standards.
            </p>
          </div>

          <div className="border-b md:border-b-0 md:border-r border-[#4d4635]/30 py-8 md:py-0 md:px-8 space-y-4">
            <span className="font-mono text-2xl font-bold text-[#f2ca50]">02</span>
            <h3 className="font-heading text-xl font-bold text-[#e3e2e2]">Build Faster</h3>
            <p className="text-sm text-[#d0c5af] leading-relaxed">
              Stop reinventing boilerplate. Start with solid architectural foundations and focus on your core differentiators.
            </p>
          </div>

          <div className="pt-8 md:pt-0 md:pl-8 space-y-4">
            <span className="font-mono text-2xl font-bold text-[#f2ca50]">03</span>
            <h3 className="font-heading text-xl font-bold text-[#e3e2e2]">Ready to Scale</h3>
            <p className="text-sm text-[#d0c5af] leading-relaxed">
              Modern modular architecture built to scale effortlessly from agile MVP to multi-region production loads.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEED SOMETHING CUSTOM (Agency Services) */}
      <section className="border-t border-[#4d4635]/30 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#f2ca50] font-semibold block">
              Agency & Bespoke Engineering
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#e3e2e2] leading-tight">
              Need something custom?
            </h2>
            <p className="text-sm sm:text-base text-[#d0c5af] leading-relaxed">
              Kami bermitra dengan bisnis dan enterprise untuk merancang serta mengembangkan sistem kustom, arsitektur cloud, dan solusi web berskala tinggi.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-block px-8 py-3.5 border border-[#f2ca50] text-[#f2ca50] font-mono text-xs uppercase tracking-widest hover:bg-[#f2ca50] hover:text-[#080808] transition-all font-semibold"
              >
                View Agency Services
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((svc) => {
                let features: string[] = [];
                try {
                  if (svc.features) features = JSON.parse(svc.features);
                } catch (e) {}
                return (
                  <div
                    key={svc.id}
                    className="p-6 bg-[#121414] border border-[#4d4635]/30 hover:border-[#f2ca50]/60 transition-colors"
                  >
                    <h3 className="font-heading font-bold text-lg text-white mb-2">{svc.title}</h3>
                    <p className="text-xs text-[#d0c5af] mb-4 leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="font-mono text-[9px] uppercase px-2 py-0.5 bg-[#1f2020] text-[#f2ca50] border border-[#4d4635]/20"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FROM IDEA TO PRODUCT (4-Step Methodology) */}
      <section className="bg-[#121414] border-t border-[#4d4635]/30 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#e3e2e2]">
              From Idea to Product
            </h2>
            <p className="text-sm text-[#d0c5af]">
              Our rigorous Swiss-inspired engineering methodology for building high-performing digital platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-[#080808] border border-[#f2ca50] text-[#f2ca50] flex items-center justify-center font-heading text-2xl font-bold">
                1
              </div>
              <h3 className="font-heading text-lg font-bold text-[#e3e2e2]">Discover</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Thorough requirements scoping, architectural blueprints, and technology stack selection.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 bg-[#080808] border border-[#f2ca50] text-[#f2ca50] flex items-center justify-center font-heading text-2xl font-bold">
                2
              </div>
              <h3 className="font-heading text-lg font-bold text-[#e3e2e2]">Design</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Objective UX/UI systems, design tokens, interactive prototyping, and brand precision.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 bg-[#080808] border border-[#f2ca50] text-[#f2ca50] flex items-center justify-center font-heading text-2xl font-bold">
                3
              </div>
              <h3 className="font-heading text-lg font-bold text-[#e3e2e2]">Build</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Clean, type-safe development, automated testing, API integrations, and database tuning.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 bg-[#080808] border border-[#f2ca50] text-[#f2ca50] flex items-center justify-center font-heading text-2xl font-bold">
                4
              </div>
              <h3 className="font-heading text-lg font-bold text-[#e3e2e2]">Grow</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Continuous deployment, monitoring, SEO optimization, analytics tracking, and scaling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BECOME A CREATOR */}
      <section className="border-t border-[#4d4635]/30 py-20 px-4 sm:px-8 text-center bg-[#080808]">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#f2ca50] font-semibold block">
            Ecosystem Partners
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#e3e2e2]">
            Become a Creator
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] max-w-xl mx-auto leading-relaxed">
            Bergabunglah dengan marketplace kurasi kami dan jual produk digital, template, serta script berkualitas tinggi Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 border border-[#4d4635]/60 text-[#e3e2e2] font-mono text-xs uppercase tracking-widest hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all font-semibold"
            >
              Apply to Sell
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL DUAL SPLIT CTA */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-[#4d4635]/30 min-h-[40vh]">
        <Link
          href="/products"
          className="bg-[#080808] hover:bg-[#121414] transition-colors duration-500 flex flex-col justify-center items-center text-center p-12 sm:p-20 border-b md:border-b-0 md:border-r border-[#4d4635]/30 group cursor-pointer"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#e3e2e2] group-hover:text-[#f2ca50] transition-colors mb-3">
            Need a product?
          </h2>
          <p className="text-xs sm:text-sm text-[#d0c5af] mb-6">
            Browse our curated marketplace of production-ready digital assets.
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-[#f2ca50] flex items-center gap-2 font-semibold">
            Shop Now{" "}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </span>
        </Link>

        <Link
          href="/contact"
          className="bg-[#121414] hover:bg-[#080808] transition-colors duration-500 flex flex-col justify-center items-center text-center p-12 sm:p-20 group cursor-pointer"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#e3e2e2] group-hover:text-[#f2ca50] transition-colors mb-3">
            Need something unique?
          </h2>
          <p className="text-xs sm:text-sm text-[#d0c5af] mb-6">
            Hire our specialized studio for custom software engineering and branding.
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-[#f2ca50] flex items-center gap-2 font-semibold">
            Contact Us{" "}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </span>
        </Link>
      </section>
    </div>
  );
}
