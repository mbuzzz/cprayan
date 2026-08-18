"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Star, ShoppingBag, Layers, Sparkles, Code2, Rocket, ShieldCheck } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface HomeClientProps {
  products: any[];
  categories: any[];
  featuredProject: any;
  services: any[];
  settings: { key: string; value: string }[];
}

export default function HomeClient({
  products,
  categories,
  featuredProject,
  services,
  settings,
}: HomeClientProps) {
  const { t, isRtl } = useLanguage();

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  let projectScreenshots: string[] = [];
  if (featuredProject?.screenshots) {
    try {
      projectScreenshots = JSON.parse(featuredProject.screenshots);
    } catch (e) {}
  }
  const featuredProjectImage = projectScreenshots[0] || "/asset/logorayan.png";

  return (
    <div className="flex flex-col bg-background text-foreground selection:bg-primary selection:text-on-primary transition-colors duration-300">
      {/* 1. HERO SECTION (Swiss Asymmetry Grid with Rich Hovers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
        <div className="lg:col-span-6 z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-border text-primary text-[11px] font-mono uppercase tracking-widest rounded-full hover:border-primary/70 hover:shadow-[0_0_15px_rgba(242,202,80,0.2)] transition-all duration-300 cursor-default">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            {t.hero.badge}
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[0.95] text-foreground">
            {t.hero.titleFirst}
            <br />
            {t.hero.titleSecond}{" "}
            <span className="text-primary transition-colors hover:opacity-90">{t.hero.titleThird}</span>
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-lg leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
            <Link
              href="/products"
              className="px-7 py-3.5 border-2 border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(242,202,80,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 font-bold rounded"
            >
              {t.hero.exploreMarketplace}
            </Link>
            <Link
              href="/services"
              className="px-6 py-3.5 text-foreground font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-all duration-300 group hover:-translate-y-0.5"
            >
              <span>{t.hero.customSolutions}</span>
              <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 text-primary" />
            </Link>
          </div>
        </div>

        {/* Hero Showcase Card */}
        <div className="lg:col-span-6 relative mt-8 lg:mt-0">
          {featuredProject ? (
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="aspect-[16/11] w-full block relative group overflow-hidden border border-border bg-surface rounded-xl shadow-lg hover:border-primary hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500"
            >
              <img
                src={featuredProjectImage}
                alt={featuredProject.title}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/75 to-transparent border-t border-border group-hover:border-primary/40 transition-colors">
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1 block font-semibold">
                  01 / {t.hero.featuredShowcase}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{featuredProject.title}</span>
                  <ArrowIcon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-300" />
                </h3>
                <p className="text-xs text-muted mt-1 line-clamp-1 group-hover:text-foreground/80 transition-colors">
                  {featuredProject.description}
                </p>
              </div>
            </Link>
          ) : (
            <div className="aspect-[16/11] w-full flex flex-col items-center justify-center border border-border bg-surface p-8 text-center rounded-xl shadow-sm hover:border-primary/50 transition-colors">
              <Layers className="w-12 h-12 text-primary mb-4 opacity-80" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                Bespoke Digital Portfolio
              </h3>
              <p className="text-xs text-muted max-w-sm">
                Lihat portofolio proyek dan solusi enterprise kustom yang telah kami kembangkan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. MARKETPLACE ENTRY & FEATURED PRODUCTS */}
      <section className="bg-surface border-t border-border py-20 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              {t.marketplace.title}
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {t.marketplace.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex justify-start md:justify-center gap-3 md:gap-4 border-b border-border pb-4 overflow-x-auto whitespace-nowrap text-xs uppercase tracking-widest font-mono">
            <Link
              href="/products"
              className="px-4 py-2 bg-primary/10 text-primary border border-primary font-bold rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm"
            >
              {t.marketplace.all}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="px-4 py-2 bg-card border border-border text-muted hover:text-primary hover:border-primary/60 hover:bg-surface rounded-full transition-all duration-300"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Product Grid with Hover Lift & Image Zoom */}
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
                    className="group flex flex-col bg-card border border-border hover:border-primary transition-all duration-300 p-4 rounded-xl shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_30px_rgba(242,202,80,0.15)] hover:-translate-y-1.5 cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-surface overflow-hidden relative mb-4 border border-border/50 rounded-lg">
                      <img
                        src={productImage}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                      {product.featured && (
                        <div className="absolute top-2.5 start-2.5 bg-primary text-black px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider rounded shadow">
                          {t.marketplace.featuredBadge}
                        </div>
                      )}
                      <div className="absolute top-2.5 end-2.5 bg-background/90 text-foreground border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded backdrop-blur-sm">
                        {product.category?.name || "ASSET"}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                        {product.title}
                      </h3>
                      <span className="font-mono font-bold text-sm text-primary ms-2 flex-shrink-0">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted mt-auto pt-3 border-t border-border/50">
                      <span className="font-mono text-[10px] text-muted">
                        {product.version ? `v${product.version}` : product.category?.name || t.marketplace.ready}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-mono text-[11px] text-foreground font-semibold">5.0</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted border border-border p-8 rounded-xl">
              <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-3 opacity-60" />
              <p className="text-sm">{t.marketplace.noProducts}</p>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <Link
              href="/products"
              className="px-8 py-3.5 border-2 border-border text-foreground font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group rounded-md font-bold"
            >
              <span>{t.marketplace.viewAll}</span>
              <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FIND WHAT YOU'RE BUILDING (Category Bento Cards with Hover Glow) */}
      <section className="border-t border-border py-20 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              {t.categories.badge}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t.categories.title}
            </h2>
            <p className="text-sm text-muted">
              {t.categories.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="bg-card border border-border p-7 hover:border-primary transition-all duration-300 group flex flex-col justify-between space-y-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed group-hover:text-foreground/80 transition-colors">
                    {category.description || "Koleksi aset dan template berkualitas tinggi siap pakai."}
                  </p>
                </div>
                <div className="border-t border-border/50 pt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
                  <span>{t.categories.explore}</span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUILT FOR BUILDERS (3 Pillars with Hover Effects) */}
      <section className="bg-surface border-t border-border py-20 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-card md:bg-transparent p-6 md:p-0 md:border-b-0 md:border-e border-border md:pe-8 space-y-4 rounded-xl md:rounded-none transition-all hover:-translate-y-0.5">
            <span className="font-mono text-2xl font-bold text-primary block group-hover:scale-110 transition-transform origin-left rtl:origin-right">01</span>
            <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">{t.pillars.p1Title}</h3>
            <p className="text-sm text-muted leading-relaxed">
              {t.pillars.p1Desc}
            </p>
          </div>

          <div className="group bg-card md:bg-transparent p-6 md:p-0 md:border-b-0 md:border-e border-border md:px-8 space-y-4 rounded-xl md:rounded-none transition-all hover:-translate-y-0.5">
            <span className="font-mono text-2xl font-bold text-primary block group-hover:scale-110 transition-transform origin-left rtl:origin-right">02</span>
            <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">{t.pillars.p2Title}</h3>
            <p className="text-sm text-muted leading-relaxed">
              {t.pillars.p2Desc}
            </p>
          </div>

          <div className="group bg-card md:bg-transparent p-6 md:p-0 md:ps-8 space-y-4 rounded-xl md:rounded-none transition-all hover:-translate-y-0.5">
            <span className="font-mono text-2xl font-bold text-primary block group-hover:scale-110 transition-transform origin-left rtl:origin-right">03</span>
            <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">{t.pillars.p3Title}</h3>
            <p className="text-sm text-muted leading-relaxed">
              {t.pillars.p3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEED SOMETHING CUSTOM (Agency Services with Hover Cards) */}
      <section className="border-t border-border py-20 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold block">
              {t.agency.badge}
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground leading-tight">
              {t.agency.title}
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {t.agency.subtitle}
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-block px-8 py-3.5 border-2 border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold rounded"
              >
                {t.agency.cta}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((svc) => {
                let features: string[] = [];
                try {
                  if (svc.features) features = JSON.parse(svc.features);
                } catch (e) {}
                return (
                  <div
                    key={svc.id}
                    className="p-6 bg-card border border-border hover:border-primary transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 group"
                  >
                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-muted mb-4 leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="font-mono text-[9px] uppercase px-2.5 py-1 bg-surface text-primary border border-border group-hover:border-primary/40 rounded transition-colors"
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

      {/* 6. FROM IDEA TO PRODUCT (4-Step Methodology with Interactive Cards) */}
      <section className="bg-surface border-t border-border py-20 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t.timeline.title}
            </h2>
            <p className="text-sm text-muted">
              {t.timeline.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="space-y-4 bg-card p-6 border border-border hover:border-primary rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-surface border border-primary text-primary group-hover:bg-primary group-hover:text-black flex items-center justify-center font-heading text-xl font-bold rounded-lg transition-colors">
                1
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{t.timeline.step1Title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {t.timeline.step1Desc}
              </p>
            </div>

            <div className="space-y-4 bg-card p-6 border border-border hover:border-primary rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-surface border border-primary text-primary group-hover:bg-primary group-hover:text-black flex items-center justify-center font-heading text-xl font-bold rounded-lg transition-colors">
                2
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{t.timeline.step2Title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {t.timeline.step2Desc}
              </p>
            </div>

            <div className="space-y-4 bg-card p-6 border border-border hover:border-primary rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-surface border border-primary text-primary group-hover:bg-primary group-hover:text-black flex items-center justify-center font-heading text-xl font-bold rounded-lg transition-colors">
                3
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{t.timeline.step3Title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {t.timeline.step3Desc}
              </p>
            </div>

            <div className="space-y-4 bg-card p-6 border border-border hover:border-primary rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-surface border border-primary text-primary group-hover:bg-primary group-hover:text-black flex items-center justify-center font-heading text-xl font-bold rounded-lg transition-colors">
                4
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{t.timeline.step4Title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {t.timeline.step4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BECOME A CREATOR */}
      <section className="border-t border-border py-20 px-4 sm:px-8 text-center bg-background transition-colors duration-300">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold block">
            {t.creator.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground">
            {t.creator.title}
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
            {t.creator.subtitle}
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 border-2 border-border text-foreground font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-bold rounded"
            >
              {t.creator.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL DUAL SPLIT CTA (Interactive Hover Experience) */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-border min-h-[40vh]">
        <Link
          href="/products"
          className="bg-card hover:bg-surface/80 transition-all duration-500 flex flex-col justify-center items-center text-center p-12 sm:p-20 border-b md:border-b-0 md:border-e border-border group cursor-pointer"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
            {t.splitCta.productTitle}
          </h2>
          <p className="text-xs sm:text-sm text-muted mb-6 max-w-md group-hover:text-foreground/80 transition-colors">
            {t.splitCta.productDesc}
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2 font-bold group-hover:underline">
            <span>{t.splitCta.productBtn}</span>
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300" />
          </span>
        </Link>

        <Link
          href="/contact"
          className="bg-surface hover:bg-card/80 transition-all duration-500 flex flex-col justify-center items-center text-center p-12 sm:p-20 group cursor-pointer"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
            {t.splitCta.customTitle}
          </h2>
          <p className="text-xs sm:text-sm text-muted mb-6 max-w-md group-hover:text-foreground/80 transition-colors">
            {t.splitCta.customDesc}
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2 font-bold group-hover:underline">
            <span>{t.splitCta.customBtn}</span>
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300" />
          </span>
        </Link>
      </section>
    </div>
  );
}
