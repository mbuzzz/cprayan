"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  ShoppingBag, 
  Layers, 
  Sparkles, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Server, 
  Database, 
  ExternalLink,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface HomeClientProps {
  products: any[];
  categories: any[];
  featuredProject: any;
  projects?: any[];
  services: any[];
  packages?: any[];
  settings: { key: string; value: string }[];
}

export default function HomeClient({
  products,
  categories,
  featuredProject,
  projects = [],
  services,
  packages = [],
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

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => {
                let images: string[] = [];
                try {
                  if (product.images) images = JSON.parse(product.images);
                } catch (e) {}
                const mainImage = images[0] || "/asset/logorayan.png";

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group bg-card border border-border overflow-hidden hover:border-primary transition-all duration-300 flex flex-col rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                  >
                    <div className="aspect-[4/3] bg-background relative overflow-hidden flex items-center justify-center p-4">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.featured && (
                        <span className="absolute top-3 right-3 bg-primary/20 backdrop-blur-md border border-primary/40 text-primary text-[10px] font-mono px-2.5 py-0.5 uppercase tracking-wider rounded font-bold">
                          {t.marketplace.featuredBadge}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4 border-t border-border group-hover:border-primary/30 transition-colors">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted group-hover:text-primary transition-colors">
                          {product.category?.name || "Digital Asset"}
                        </span>
                        <h3 className="font-heading font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mt-1">
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border/40">
                        <div>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="line-through text-muted text-[10px] font-mono">
                                Rp {product.originalPrice.toLocaleString('id-ID')}
                              </span>
                              <span className="text-[9px] font-mono text-red-500 font-bold bg-red-500/10 px-1 rounded">
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                              </span>
                            </div>
                          )}
                          <span className="font-mono text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            {product.price > 0
                              ? new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  maximumFractionDigits: 0,
                                }).format(product.price)
                              : "FREE"}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                          <span>{t.marketplace.ready}</span>
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 border border-border rounded-xl p-8 bg-card">
              <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-3 opacity-60" />
              <p className="text-muted text-sm">{t.marketplace.noProducts}</p>
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

      {/* 3. SECTION PORTOFOLIO TERPILIH (Featured Projects Showcase) */}
      <section className="border-t border-border py-20 px-4 sm:px-8 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                PORTOFOLIO TERPILIH
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
                Karya Nyata & Solusi Digital
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Studi kasus proyek-proyek inovatif yang telah sukses kami kembangkan dengan standar arsitektur modern dan performa optimal.
              </p>
            </div>
            <div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-xs uppercase font-mono tracking-wider hover:border-primary hover:text-primary hover:bg-surface rounded-lg transition-all"
              >
                <span>Lihat Semua Portofolio</span>
                <ArrowIcon className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((item) => {
                let screenshots: string[] = [];
                let techStack: string[] = [];
                try {
                  if (item.screenshots) screenshots = JSON.parse(item.screenshots);
                  if (item.techStack) techStack = JSON.parse(item.techStack);
                } catch (e) {}
                const thumbnail = screenshots[0] || "/asset/logorayan.png";

                return (
                  <Link
                    key={item.id}
                    href={`/projects/${item.slug}`}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                  >
                    <div className="aspect-[16/10] bg-surface relative overflow-hidden">
                      <img
                        src={thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      {item.featured && (
                        <span className="absolute top-3 right-3 bg-primary text-black text-[10px] font-mono px-2.5 py-0.5 uppercase tracking-wider rounded font-bold shadow">
                          Featured Case
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                          {techStack.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono uppercase px-2 py-0.5 bg-surface text-foreground/80 rounded border border-border"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 text-primary font-mono text-xs uppercase tracking-wider flex items-center justify-between font-bold">
                        <span>Lihat Detail Studi Kasus</span>
                        <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 border border-border rounded-xl p-8 bg-card">
              <Layers className="w-12 h-12 text-primary mx-auto mb-3 opacity-60" />
              <p className="text-muted text-sm">Belum ada portofolio yang dipublikasikan.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. SECTION JASA CUSTOM WEB & APP (Bespoke Engineering) */}
      <section className="border-t border-border py-20 px-4 sm:px-8 bg-surface transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              LAYANAN REKAYASA SISTEM
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Jasa Custom Website & Mobile Apps
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Kami merancang dan membangun platform digital kustom berperforma tinggi yang disesuaikan dengan alur bisnis unik perusahaan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: Custom Web App */}
            <div className="p-7 bg-card border border-border hover:border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  Web Architecture & Portal
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Pengembangan web app modern, company profile berkelas, marketplace, dan dashboard analitik berbasis Next.js & React.
                </p>
              </div>
              <ul className="space-y-2 mt-6 pt-4 border-t border-border/60 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>SEO & Ultra-fast Loading</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Responsive & Mobile Ready</span>
                </li>
              </ul>
            </div>

            {/* Service 2: Mobile Apps */}
            <div className="p-7 bg-card border border-border hover:border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  Mobile App (iOS & Android)
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Aplikasi mobile native dan hybrid cross-platform dengan interaksi sentuh mulus, notifikasi realtime, dan offline support.
                </p>
              </div>
              <ul className="space-y-2 mt-6 pt-4 border-t border-border/60 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>React Native & Flutter</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>App Store & Play Store Publish</span>
                </li>
              </ul>
            </div>

            {/* Service 3: Enterprise SaaS */}
            <div className="p-7 bg-card border border-border hover:border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  Enterprise SaaS & ERP
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Sistem informasi manajemen, CRM, integrasi payment gateway, invoice otomatis, dan manajemen hak akses multi-peran.
                </p>
              </div>
              <ul className="space-y-2 mt-6 pt-4 border-t border-border/60 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Role-Based Access Control</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Automated Workflow & Reports</span>
                </li>
              </ul>
            </div>

            {/* Service 4: API & Cloud Architecture */}
            <div className="p-7 bg-card border border-border hover:border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  API & Cloud Scalability
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Arsitektur backend mikroservis tangguh, integrasi pihak ketiga, proteksi keamanan tingkat tinggi, dan optimasi database.
                </p>
              </div>
              <ul className="space-y-2 mt-6 pt-4 border-t border-border/60 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>High Availability Infrastructure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Automated Backup & Security</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Dynamic Development Packages Showcase if available */}
          {packages && packages.length > 0 && (
            <div className="space-y-8 pt-8 border-t border-border/60">
              <div className="text-center space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                  PILIHAN PAKET POPULER
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                  Paket Pengembangan Siap Pesan
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => {
                  let featList: string[] = [];
                  try {
                    const parsed = JSON.parse(pkg.features);
                    if (Array.isArray(parsed)) featList = parsed;
                  } catch (e) {}

                  const discount = pkg.originalPrice && pkg.originalPrice > pkg.price
                    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
                    : 0;

                  const whatsappUrl = `https://wa.me/6285226117387?text=${encodeURIComponent(
                    `Halo PT. Rayan Smart Kreatif, saya tertarik memesan paket development "${pkg.name}" (${pkg.category}). Mohon info proses dan konsultasinya.`
                  )}`;

                  return (
                    <div
                      key={pkg.id}
                      className={`bg-card border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group custom-shadow ${
                        pkg.isPopular
                          ? "border-primary shadow-[0_0_25px_rgba(242,202,80,0.15)] -translate-y-1.5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {pkg.isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-mono font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                          ★ Best Seller
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                            {pkg.category}
                          </span>
                          <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-0.5">
                            {pkg.name}
                          </h4>
                          <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1">
                            {pkg.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-border/50">
                          {discount > 0 && pkg.originalPrice && (
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="line-through text-muted font-mono text-[11px]">
                                Rp {pkg.originalPrice.toLocaleString("id-ID")}
                              </span>
                              <span className="text-[9px] font-mono text-red-500 font-bold bg-red-500/10 px-1 py-0.2 rounded">
                                -{discount}%
                              </span>
                            </div>
                          )}
                          <div className="font-mono text-2xl font-extrabold golden-text">
                            Rp {pkg.price.toLocaleString("id-ID")}
                          </div>
                          <span className="text-[10px] text-muted font-mono block mt-0.5">
                            {pkg.deliveryTime} • {pkg.revisionCount}
                          </span>
                        </div>

                        {featList.length > 0 && (
                          <ul className="space-y-1.5 pt-2 border-t border-border/50 text-xs">
                            {featList.slice(0, 4).map((f, i) => (
                              <li key={i} className="text-foreground flex items-center gap-2 text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                <span className="line-clamp-1">{f}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-border/50">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-3 rounded-lg text-xs font-mono uppercase font-bold flex items-center justify-center gap-1.5 btn-primary shadow-sm cursor-pointer"
                        >
                          <span>Pesan Paket</span>
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/services"
                  className="text-xs font-mono text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Lihat Semua Paket & Layanan Lengkap</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Consultation CTA Banner */}
          <div className="p-8 sm:p-12 bg-gradient-to-r from-card via-surface to-card border border-border rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8 custom-shadow">
            <div className="space-y-3 text-center lg:text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                KONSULTASI GRATIS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Siap Mewujudkan Ide Digital Perusahaan Anda?
              </h3>
              <p className="text-sm text-muted max-w-xl">
                Diskusikan kebutuhan arsitektur sistem, timeline, dan estimasi anggaran bersama tim teknis PT. Rayan Smart Kreatif.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-wrap gap-4 justify-center">
              <Link
                href="/about"
                className="px-8 py-3.5 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all rounded shadow-md"
              >
                Mulai Konsultasi & Brief Proyek
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FIND WHAT YOU'RE BUILDING (Category Bento Cards with Hover Glow) */}
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

      {/* 6. BUILT FOR BUILDERS (3 Pillars with Hover Effects) */}
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

      {/* 7. FROM IDEA TO PRODUCT (4-Step Methodology with Interactive Cards) */}
      <section className="border-t border-border py-20 px-4 sm:px-8 bg-background transition-colors duration-300">
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

      {/* 8. FINAL DUAL SPLIT CTA */}
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
          href="/about"
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
