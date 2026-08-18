"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Star, ShoppingBag, Layers } from "lucide-react";
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
      {/* 1. HERO SECTION (Swiss Asymmetry Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
        <div className="lg:col-span-6 z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border text-primary text-[11px] font-mono uppercase tracking-widest rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            {t.hero.badge}
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[0.95] text-foreground">
            {t.hero.titleFirst}
            <br />
            {t.hero.titleSecond}{" "}
            <span className="text-primary">{t.hero.titleThird}</span>
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-lg leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
            <Link
              href="/products"
              className="px-6 sm:px-8 py-3.5 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 font-bold rounded shadow-sm"
            >
              {t.hero.exploreMarketplace}
            </Link>
            <Link
              href="/services"
              className="px-6 sm:px-8 py-3.5 text-foreground font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors duration-300 group"
            >
              {t.hero.customSolutions}{" "}
              <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform text-primary" />
            </Link>
          </div>
        </div>

        {/* Hero Showcase */}
        <div className="lg:col-span-6 relative mt-8 lg:mt-0">
          {featuredProject ? (
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="aspect-[16/11] w-full block relative group overflow-hidden border border-border bg-surface rounded-lg shadow-md"
            >
              <img
                src={featuredProjectImage}
                alt={featuredProject.title}
                className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/70 to-transparent border-t border-border">
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1 block">
                  01 / {t.hero.featuredShowcase}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-xs text-muted mt-1 line-clamp-1">
                  {featuredProject.description}
                </p>
              </div>
            </Link>
          ) : (
            <div className="aspect-[16/11] w-full flex flex-col items-center justify-center border border-border bg-surface p-8 text-center rounded-lg shadow-sm">
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

          {/* Category Filter Bar */}
          <div className="flex justify-start md:justify-center gap-6 border-b border-border pb-4 overflow-x-auto whitespace-nowrap text-xs uppercase tracking-widest font-mono">
            <Link
              href="/products"
              className="text-primary border-b-2 border-primary pb-4 -mb-[18px] font-bold"
            >
              {t.marketplace.all}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="text-muted hover:text-primary transition-colors pb-4"
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
                    className="group flex flex-col bg-card border border-border hover:border-primary transition-all duration-300 p-3.5 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <div className="aspect-[4/3] bg-surface overflow-hidden relative mb-4 border border-border/50 rounded">
                      <img
                        src={productImage}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.featured && (
                        <div className="absolute top-2.5 start-2.5 bg-primary text-black px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider rounded">
                          {t.marketplace.featuredBadge}
                        </div>
                      )}
                      <div className="absolute top-2.5 end-2.5 bg-background/90 text-foreground border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded">
                        {product.category?.name || "ASSET"}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <span className="font-mono font-bold text-sm text-primary ms-2 flex-shrink-0">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted mt-auto pt-2 border-t border-border/50">
                      <span className="font-mono text-[10px] text-muted">
                        {product.version ? `v${product.version}` : product.category?.name || t.marketplace.ready}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-mono text-[11px] text-foreground font-semibold">5.0</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted border border-border p-8 rounded-lg">
              <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-3 opacity-60" />
              <p className="text-sm">{t.marketplace.noProducts}</p>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <Link
              href="/products"
              className="px-8 py-3.5 border border-border text-foreground font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:border-primary hover:text-primary transition-all group rounded font-semibold"
            >
              {t.marketplace.viewAll}{" "}
              <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FIND WHAT YOU'RE BUILDING (Category Bento Cards) */}
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
                className="bg-card border border-border p-6 sm:p-8 hover:border-primary transition-colors group flex flex-col justify-between space-y-6 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {category.description || "Koleksi aset dan template berkualitas tinggi siap pakai."}
                  </p>
                </div>
                <div className="border-t border-border/50 pt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
                  <span>{t.categories.explore}</span>
                  <ArrowIcon className="w-3.5 h-3.5 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUILT FOR BUILDERS (3 Pillars) */}
      <section className="bg-surface border-t border-border py-20 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-b md:border-b-0 md:border-e border-border pb-8 md:pb-0 md:pe-8 space-y-4">
            <span className="font-mono text-2xl font-bold text-primary">01</span>
            <h3 className="font-heading text-xl font-bold text-foreground">{t.pillars.p1Title}</h3>
            <p className="text-sm text-muted leading-relaxed">
              {t.pillars.p1Desc}
            </p>
          </div>

          <div className="border-b md:border-b-0 md:border-e border-border py-8 md:py-0 md:px-8 space-y-4">
            <span className="font-mono text-2xl font-bold text-primary">02</span>
            <h3 className="font-heading text-xl font-bold text-foreground">{t.pillars.p2Title}</h3>
            <p className="text-sm text-muted leading-relaxed">
              {t.pillars.p2Desc}
            </p>
          </div>

          <div className="pt-8 md:pt-0 md:ps-8 space-y-4">
            <span className="font-mono text-2xl font-bold text-primary">03</span>
            <h3 className="font-heading text-xl font-bold text-foreground">{t.pillars.p3Title}</h3>
            <p className="text-sm text-muted leading-relaxed">
              {t.pillars.p3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEED SOMETHING CUSTOM (Agency Services) */}
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
                className="inline-block px-8 py-3.5 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all font-bold rounded shadow-sm"
              >
                {t.agency.cta}
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
                    className="p-6 bg-card border border-border hover:border-primary transition-colors rounded-lg shadow-sm"
                  >
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">{svc.title}</h3>
                    <p className="text-xs text-muted mb-4 leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="font-mono text-[9px] uppercase px-2 py-0.5 bg-surface text-primary border border-border rounded"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="space-y-4 bg-card p-6 border border-border rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-background border border-primary text-primary flex items-center justify-center font-heading text-xl font-bold rounded">
                1
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{t.timeline.step1Title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {t.timeline.step1Desc}
              </p>
            </div>

            <div className="space-y-4 bg-card p-6 border border-border rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-background border border-primary text-primary flex items-center justify-center font-heading text-xl font-bold rounded">
                2
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{t.timeline.step2Title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {t.timeline.step2Desc}
              </p>
            </div>

            <div className="space-y-4 bg-card p-6 border border-border rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-background border border-primary text-primary flex items-center justify-center font-heading text-xl font-bold rounded">
                3
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{t.timeline.step3Title}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {t.timeline.step3Desc}
              </p>
            </div>

            <div className="space-y-4 bg-card p-6 border border-border rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-background border border-primary text-primary flex items-center justify-center font-heading text-xl font-bold rounded">
                4
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{t.timeline.step4Title}</h3>
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
              className="inline-block px-8 py-3.5 border border-border text-foreground font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all font-bold rounded"
            >
              {t.creator.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL DUAL SPLIT CTA */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-border min-h-[40vh]">
        <Link
          href="/products"
          className="bg-card hover:bg-surface transition-colors duration-300 flex flex-col justify-center items-center text-center p-12 sm:p-20 border-b md:border-b-0 md:border-e border-border group cursor-pointer"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
            {t.splitCta.productTitle}
          </h2>
          <p className="text-xs sm:text-sm text-muted mb-6 max-w-md">
            {t.splitCta.productDesc}
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2 font-bold">
            {t.splitCta.productBtn}{" "}
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform" />
          </span>
        </Link>

        <Link
          href="/contact"
          className="bg-surface hover:bg-card transition-colors duration-300 flex flex-col justify-center items-center text-center p-12 sm:p-20 group cursor-pointer"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
            {t.splitCta.customTitle}
          </h2>
          <p className="text-xs sm:text-sm text-muted mb-6 max-w-md">
            {t.splitCta.customDesc}
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2 font-bold">
            {t.splitCta.customBtn}{" "}
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform" />
          </span>
        </Link>
      </section>
    </div>
  );
}
