import PageHeader from "@/components/PageHeader";
import { MonitorSmartphone, LayoutTemplate, Megaphone, PaintBucket, FileCode, HeadphonesIcon, Layers } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

// Map icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  MonitorSmartphone: <MonitorSmartphone className="w-6 h-6" />,
  LayoutTemplate: <LayoutTemplate className="w-6 h-6" />,
  Megaphone: <Megaphone className="w-6 h-6" />,
  PaintBucket: <PaintBucket className="w-6 h-6" />,
  FileCode: <FileCode className="w-6 h-6" />,
  HeadphonesIcon: <HeadphonesIcon className="w-6 h-6" />,
};

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: 'asc' }
  });

  const services = dbServices.map(s => {
    let features: string[] = [];
    try {
      if (s.features) features = JSON.parse(s.features);
    } catch(e) {}
    
    return {
      id: s.id,
      title: s.title,
      desc: s.description,
      features,
      iconComponent: s.icon && iconMap[s.icon] ? iconMap[s.icon] : <FileCode className="w-6 h-6" />
    };
  });

  return (
    <div>
      <PageHeader 
        title="LAYANAN KAMI" 
        subtitle="Solusi komprehensif untuk memenuhi setiap kebutuhan digital bisnis Anda" 
      />
      
      <div className="container mx-auto px-4 py-16">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card-hover p-8 flex flex-col h-full relative group overflow-hidden rounded-xl border border-border bg-card">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-14 h-14 mb-6 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-background shadow-sm group-hover:shadow-[0_0_15px_rgba(198,161,91,0.3)] transition-all duration-300 relative z-10 group-hover:-translate-y-1">
                  {service.iconComponent}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted text-sm mb-6 flex-grow relative z-10 leading-relaxed">{service.desc}</p>
                
                {service.features.length > 0 && (
                  <ul className="space-y-2 mt-auto pt-6 border-t border-border relative z-10">
                    {service.features.map((feature: string, j: number) => (
                      <li key={j} className="text-sm text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shadow-[0_0_5px_rgba(198,161,91,0.5)]"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="mt-8 pt-4 border-t border-border flex justify-between items-center relative z-10">
                  <Link href="/about" className="text-sm font-bold golden-text flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Konsultasikan Sekarang &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border rounded-xl p-8 bg-card">
            <Layers className="w-12 h-12 text-primary mx-auto mb-3 opacity-60" />
            <p className="text-muted text-base">Belum ada layanan yang dipublikasikan.</p>
          </div>
        )}

        {/* CTA Box */}
        <div className="mt-20 p-10 bg-gradient-to-r from-card via-surface to-card border border-border rounded-2xl text-center relative overflow-hidden custom-shadow">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Butuh Solusi yang Disesuaikan?</h2>
            <p className="text-muted mb-8 leading-relaxed">
              Kami siap berdiskusi untuk memahami tantangan bisnis Anda dan merancang solusi digital yang tepat sasaran.
            </p>
            <Link href="/about" className="btn-primary">
              Mulai Konsultasi Gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
