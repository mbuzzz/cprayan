import PageHeader from "@/components/PageHeader";
import { 
  MonitorSmartphone, 
  LayoutTemplate, 
  Megaphone, 
  PaintBucket, 
  FileCode, 
  HeadphonesIcon, 
  Layers, 
  Sparkles, 
  Check, 
  Clock, 
  RefreshCw, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const iconMap: Record<string, React.ReactNode> = {
  MonitorSmartphone: <MonitorSmartphone className="w-6 h-6" />,
  LayoutTemplate: <LayoutTemplate className="w-6 h-6" />,
  Megaphone: <Megaphone className="w-6 h-6" />,
  PaintBucket: <PaintBucket className="w-6 h-6" />,
  FileCode: <FileCode className="w-6 h-6" />,
  HeadphonesIcon: <HeadphonesIcon className="w-6 h-6" />,
};

export default async function ServicesPage() {
  const [dbServices, dbPackages] = await Promise.all([
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    prisma.developmentPackage.findMany({
      where: { published: true },
      orderBy: [
        { isPopular: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    }),
  ]);

  const services = dbServices.map((s) => {
    let features: string[] = [];
    try {
      if (s.features) features = JSON.parse(s.features);
    } catch (e) {}

    return {
      id: s.id,
      title: s.title,
      desc: s.description,
      features,
      iconComponent: s.icon && iconMap[s.icon] ? iconMap[s.icon] : <FileCode className="w-6 h-6" />,
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      <PageHeader 
        title="LAYANAN & PAKET DEVELOPMENT" 
        subtitle="Solusi rekayasa perangkat lunak, paket pengembangan website, aplikasi mobile, dan custom SaaS" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-24">
        
        {/* 1. SECTION: Paket Layanan Development (Pricing & Deliverables Packages) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-card border border-border text-primary text-[11px] font-mono uppercase tracking-widest rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Paket Pilihan Pengembangan</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
              Paket Pembuatan <span className="golden-text">Web & Aplikasi</span>
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Pilih paket layanan yang sesuai dengan skala dan target bisnis Anda. Seluruh pengerjaan dikerjakan oleh engineer profesional dengan standar enterprise.
            </p>
          </div>

          {dbPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dbPackages.map((pkg) => {
                let packageFeatures: string[] = [];
                try {
                  const parsed = JSON.parse(pkg.features);
                  if (Array.isArray(parsed)) packageFeatures = parsed;
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
                    className={`bg-card border rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative group custom-shadow ${
                      pkg.isPopular
                        ? "border-primary shadow-[0_0_30px_rgba(242,202,80,0.18)] -translate-y-2"
                        : "border-border hover:border-primary/60 hover:-translate-y-1"
                    }`}
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-mono font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Paling Diminati
                      </div>
                    )}

                    <div className="space-y-5">
                      {/* Category & Name */}
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                          {pkg.category}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-muted leading-relaxed mt-2">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="pt-3 border-t border-border/60">
                        {discount > 0 && pkg.originalPrice && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="line-through text-muted font-mono text-xs">
                              Rp {pkg.originalPrice.toLocaleString("id-ID")}
                            </span>
                            <span className="text-[10px] font-mono text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">
                              Hemat {discount}%
                            </span>
                          </div>
                        )}
                        <div className="font-mono text-3xl font-extrabold golden-text">
                          Rp {pkg.price.toLocaleString("id-ID")}
                        </div>
                        <span className="text-[11px] text-muted font-mono block mt-1">
                          Estimasi: <strong className="text-foreground">{pkg.deliveryTime}</strong> • <strong className="text-foreground">{pkg.revisionCount}</strong>
                        </span>
                      </div>

                      {/* Deliverables checklist */}
                      {packageFeatures.length > 0 && (
                        <div className="pt-4 border-t border-border/60 space-y-2.5">
                          <span className="text-[11px] font-mono uppercase font-bold text-muted block">
                            Yang Didapatkan:
                          </span>
                          <ul className="space-y-2">
                            {packageFeatures.map((feat, idx) => (
                              <li key={idx} className="text-xs text-foreground flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Order Action Button */}
                    <div className="pt-6 mt-6 border-t border-border/60">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3 px-4 rounded-xl text-xs font-mono uppercase font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                          pkg.isPopular
                            ? "btn-primary shadow-lg"
                            : "bg-surface border border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/10"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Pesan Paket Sekarang</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-border rounded-2xl p-8 bg-card max-w-lg mx-auto">
              <Layers className="w-10 h-10 text-primary mx-auto mb-3 opacity-60" />
              <p className="text-muted text-sm">Paket development sedang dikonfigurasi oleh tim kami.</p>
            </div>
          )}
        </section>

        {/* 2. SECTION: Layanan Spesialisasi */}
        <section className="space-y-12 pt-8 border-t border-border">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Layanan Spesialisasi Kami
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Cakupan kapabilitas teknis dan layanan konsultasi teknologi informasi yang kami tawarkan.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="p-7 flex flex-col justify-between h-full rounded-2xl border border-border bg-card hover:border-primary/60 transition-all duration-300 custom-shadow group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl border border-primary/30 flex items-center justify-center text-primary bg-surface group-hover:bg-primary/10 transition-colors">
                      {service.iconComponent}
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  
                  {service.features.length > 0 && (
                    <ul className="space-y-2 mt-6 pt-4 border-t border-border">
                      {service.features.map((feature: string, j: number) => (
                        <li key={j} className="text-xs text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {/* 3. CTA Box */}
        <div className="p-10 bg-card border border-border rounded-2xl text-center relative overflow-hidden custom-shadow">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-heading">
              Punya Spesifikasi Khusus di Luar Paket?
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Kami siap berdiskusi untuk memahami arsitektur, integrasi API, dan kebutuhan spesifik proyek Anda. Konsultasikan ide Anda bersama tech lead kami.
            </p>
            <div className="pt-2">
              <Link href="/about" className="btn-primary inline-block px-8 py-3.5 text-xs uppercase font-bold tracking-wider rounded-xl shadow-lg">
                Mulai Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
