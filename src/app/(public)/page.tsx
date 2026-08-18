import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShoppingBag, Code, ShieldCheck, Zap, Layers, Sparkles, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  // Fetch site settings
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
    "Premium digital products and bespoke engineering for ambitious brands. A unified ecosystem for creation and scale."
  );

  // Fetch featured products
  let featuredProductsRaw: any[] = [];
  try {
    featuredProductsRaw = await prisma.product.findMany({
      where: { published: true },
      include: { category: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  // Default fallback products if database is fresh
  const fallbackProducts = [
    {
      id: "demo-1",
      title: "Rayan Commerce",
      slug: "rayan-commerce",
      price: 49,
      badge: "Bestseller",
      type: "UI KIT",
      tech: "Figma + React",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "demo-2",
      title: "Rayan SaaS Dashboard",
      slug: "rayan-saas",
      price: 69,
      badge: "New",
      type: "TEMPLATE",
      tech: "React + Tailwind",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "demo-3",
      title: "Rayan Mobile Pro",
      slug: "rayan-mobile",
      price: 59,
      badge: "Popular",
      type: "APP KIT",
      tech: "Flutter / React Native",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "demo-4",
      title: "Rayan Admin Suite",
      slug: "rayan-admin",
      price: 89,
      badge: "Enterprise",
      type: "SYSTEM",
      tech: "Next.js + Prisma",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const displayProducts =
    featuredProductsRaw.length > 0
      ? featuredProductsRaw.map((p, idx) => {
          let images: string[] = [];
          try {
            if (p.screenshots) images = JSON.parse(p.screenshots as string);
          } catch (e) {}
          return {
            id: p.id,
            title: p.title,
            slug: p.slug,
            price: p.price,
            badge: idx === 0 ? "Bestseller" : idx === 1 ? "New" : undefined,
            type: p.category?.name?.toUpperCase() || "DIGITAL ASSET",
            tech: p.category?.name || "Full Stack",
            rating: 4.9,
            image: images[0] || fallbackProducts[idx % fallbackProducts.length].image,
          };
        })
      : fallbackProducts;

  // Fetch featured projects
  let featuredProjectsRaw: any[] = [];
  try {
    featuredProjectsRaw = await prisma.project.findMany({
      where: { published: true },
      take: 1,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {}

  const featuredProject =
    featuredProjectsRaw.length > 0
      ? {
          title: featuredProjectsRaw[0].title,
          slug: featuredProjectsRaw[0].slug,
          description: featuredProjectsRaw[0].description,
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        }
      : {
          title: "Nexus Architecture",
          slug: "nexus-arch",
          description: "Minimalist portfolio and digital ecosystem for world-class architectural studio.",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        };

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
            BUILD.<br />
            BUY.<br />
            <span className="text-[#f2ca50]">GROW.</span>
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

        {/* Hero Showcase Image */}
        <div className="lg:col-span-6 relative mt-8 lg:mt-0">
          <div className="aspect-[16/11] w-full relative group overflow-hidden border border-[#4d4635]/40 bg-[#121414]">
            <img
              src={featuredProject.image}
              alt={featuredProject.title}
              className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#080808]/90 via-[#080808]/60 to-transparent border-t border-[#4d4635]/20">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#f2ca50] mb-1 block">
                01 / FEATURED SHOWCASE
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                {featuredProject.title}
              </h3>
              <p className="text-xs text-[#d0c5af] mt-1 line-clamp-1">{featuredProject.description}</p>
            </div>
          </div>
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
            <Link href="/products" className="text-[#f2ca50] border-b-2 border-[#f2ca50] pb-4 -mb-[18px] font-bold">
              All
            </Link>
            <Link href="/products?cat=web" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4">
              Web
            </Link>
            <Link href="/products?cat=mobile" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4">
              Mobile
            </Link>
            <Link href="/products?cat=uikit" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4">
              UI Kits
            </Link>
            <Link href="/products?cat=saas" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4">
              SaaS
            </Link>
            <Link href="/products?cat=admin" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4">
              Admin
            </Link>
            <Link href="/products?cat=ecommerce" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4">
              E-Commerce
            </Link>
            <Link href="/products?cat=plugins" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors pb-4">
              Plugins
            </Link>
          </div>

          {/* Product Grid (4-Column) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col bg-[#1b1c1c] border border-[#4d4635]/30 hover:border-[#f2ca50]/70 transition-all duration-300 p-3.5"
              >
                <div className="aspect-[4/3] bg-[#292a2a] overflow-hidden relative mb-4 border border-[#4d4635]/20">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-[#f2ca50] text-[#080808] px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute top-2.5 right-2.5 bg-[#080808]/90 text-[#e3e2e2] border border-[#4d4635]/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                    {product.type}
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
                  <span className="font-mono text-[10px] text-[#d0c5af]">{product.tech}</span>
                  <div className="flex items-center gap-1 text-[#f2ca50]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-mono text-[11px] text-[#e3e2e2]">{product.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

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

      {/* 3. FIND WHAT YOU'RE BUILDING (Bento Cards) */}
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
              Browse our curated collections to find the perfect starting point.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Link
              href="/products?cat=ecommerce"
              className="bg-[#121414] border border-[#4d4635]/30 p-6 sm:p-8 hover:border-[#f2ca50] transition-colors group flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 className="font-heading text-xl font-bold text-[#e3e2e2] group-hover:text-[#f2ca50] transition-colors mb-2">
                  E-Commerce Systems
                </h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  High-conversion storefronts, inventory management, payment gateways, and admin panels.
                </p>
              </div>
              <div className="aspect-video bg-[#1f2020] border border-[#4d4635]/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0a67e55722c0?q=80&w=600&auto=format&fit=crop"
                  alt="E-Commerce"
                  className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            </Link>

            {/* Card 2 */}
            <Link
              href="/products?cat=saas"
              className="bg-[#121414] border border-[#4d4635]/30 p-6 sm:p-8 hover:border-[#f2ca50] transition-colors group flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 className="font-heading text-xl font-bold text-[#e3e2e2] group-hover:text-[#f2ca50] transition-colors mb-2">
                  SaaS & Dashboards
                </h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  Real-time data visualization, analytics pipelines, role-based access, and subscriptions.
                </p>
              </div>
              <div className="aspect-video bg-[#1f2020] border border-[#4d4635]/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                  alt="SaaS"
                  className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            </Link>

            {/* Card 3 */}
            <Link
              href="/products?cat=corporate"
              className="bg-[#121414] border border-[#4d4635]/30 p-6 sm:p-8 hover:border-[#f2ca50] transition-colors group flex flex-col justify-between space-y-6"
            >
              <div>
                <h3 className="font-heading text-xl font-bold text-[#e3e2e2] group-hover:text-[#f2ca50] transition-colors mb-2">
                  Corporate Portals
                </h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  High-impact brand showcases, enterprise digital headquarters, and editorial platforms.
                </p>
              </div>
              <div className="aspect-video bg-[#1f2020] border border-[#4d4635]/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
                  alt="Corporate"
                  className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            </Link>
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
              We partner with visionary founders and established enterprises to engineer bespoke digital products, tailored AI solutions, and scalable web architectures.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-block px-8 py-3.5 border border-[#f2ca50] text-[#f2ca50] font-mono text-xs uppercase tracking-widest hover:bg-[#f2ca50] hover:text-[#080808] transition-all font-semibold"
              >
                View Agency Work
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[16/10] bg-[#121414] border border-[#4d4635]/40 overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                alt="Bespoke Agency Solutions"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-[#080808]/90 border border-[#4d4635]/30 px-4 py-2 font-mono text-xs text-[#f2ca50]">
                Tailored Architecture • Custom Full-Stack
              </div>
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
            {/* Step 1 */}
            <div className="space-y-4 relative">
              <div className="w-14 h-14 bg-[#080808] border border-[#f2ca50] text-[#f2ca50] flex items-center justify-center font-heading text-2xl font-bold">
                1
              </div>
              <h3 className="font-heading text-lg font-bold text-[#e3e2e2]">Discover</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Thorough requirements scoping, architectural blueprints, and technology stack selection.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 relative">
              <div className="w-14 h-14 bg-[#080808] border border-[#f2ca50] text-[#f2ca50] flex items-center justify-center font-heading text-2xl font-bold">
                2
              </div>
              <h3 className="font-heading text-lg font-bold text-[#e3e2e2]">Design</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Objective UX/UI systems, design tokens, interactive prototyping, and brand precision.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 relative">
              <div className="w-14 h-14 bg-[#080808] border border-[#f2ca50] text-[#f2ca50] flex items-center justify-center font-heading text-2xl font-bold">
                3
              </div>
              <h3 className="font-heading text-lg font-bold text-[#e3e2e2]">Build</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Clean, type-safe development, automated testing, API integrations, and database tuning.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 relative">
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
            Join our curated marketplace and monetize your high-quality digital assets, UI kits, and templates with thousands of developers.
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
        {/* Split Left: Shop Products */}
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

        {/* Split Right: Custom Service */}
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
