import PageHeader from "@/components/PageHeader";
import { MonitorSmartphone, LayoutTemplate, Megaphone, PaintBucket, FileCode, HeadphonesIcon } from "lucide-react";
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
    let features = [];
    try {
      features = JSON.parse(s.features);
    } catch(e) {}
    
    return {
      title: s.title,
      desc: s.description,
      features,
      iconComponent: s.icon && iconMap[s.icon] ? iconMap[s.icon] : <FileCode className="w-6 h-6" />
    };
  });

  // Fallback to static if db is empty
  const displayServices = services.length > 0 ? services : [
    {
      title: "Web Development",
      desc: "Pembuatan website company profile, e-commerce, dan sistem informasi dengan desain modern, responsif, dan performa tinggi.",
      features: ["Custom UI/UX Design", "SEO Optimized", "CMS Integration", "Fast Loading"],
      iconComponent: <MonitorSmartphone className="w-6 h-6" />
    },
    {
      title: "Mobile Apps Development",
      desc: "Pengembangan aplikasi native maupun cross-platform untuk Android dan iOS yang user-friendly.",
      features: ["iOS & Android", "UI/UX Premium", "API Integration", "App Store Deployment"],
      iconComponent: <LayoutTemplate className="w-6 h-6" />
    },
    {
      title: "Digital Marketing",
      desc: "Strategi pemasaran digital end-to-end untuk meningkatkan brand awareness dan konversi bisnis Anda.",
      features: ["Social Media Management", "SEO & SEM", "Content Marketing", "Performance Analytics"],
      iconComponent: <Megaphone className="w-6 h-6" />
    },
    {
      title: "UI/UX Design",
      desc: "Desain antarmuka pengguna yang elegan dan pengalaman pengguna yang intuitif untuk produk digital Anda.",
      features: ["Wireframing", "Prototyping", "Design System", "User Testing"],
      iconComponent: <PaintBucket className="w-6 h-6" />
    },
    {
      title: "Custom Software",
      desc: "Pembuatan perangkat lunak khusus (Bespoke) yang disesuaikan dengan kebutuhan unik proses bisnis perusahaan Anda.",
      features: ["ERP & CRM", "Automation Tools", "Cloud Architecture", "Scalable Solution"],
      iconComponent: <FileCode className="w-6 h-6" />
    },
    {
      title: "IT Consultant",
      desc: "Konsultasi strategis untuk transformasi digital, keamanan arsitektur, dan optimasi infrastruktur IT.",
      features: ["Tech Audits", "Digital Strategy", "Security Assessment", "Cloud Migration"],
      iconComponent: <HeadphonesIcon className="w-6 h-6" />
    }
  ];

  return (
    <div>
      <PageHeader 
        title="LAYANAN KAMI" 
        subtitle="Solusi komprehensif untuk memenuhi setiap kebutuhan digital bisnis Anda" 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, i) => (
            <div key={i} className="card-hover p-8 flex flex-col h-full relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="w-14 h-14 mb-6 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-background shadow-sm group-hover:shadow-[0_0_15px_rgba(198,161,91,0.3)] transition-all duration-300 relative z-10 group-hover:-translate-y-1">
                {service.iconComponent}
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-foreground">{service.title}</h3>
              <p className="text-muted text-sm mb-6 flex-grow relative z-10">{service.desc}</p>
              
              <ul className="space-y-2 mt-auto pt-6 border-t border-border relative z-10">
                {service.features.map((feature: string, j: number) => (
                  <li key={j} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shadow-[0_0_5px_rgba(198,161,91,0.5)]"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 card-hover p-10 text-center relative overflow-hidden border-primary/20">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Punya Kebutuhan Spesifik?</h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">Kami siap mendengarkan ide Anda dan merancang solusi digital yang tepat sasaran.</p>
            <Link href="/contact" className="btn-primary inline-block">
              Konsultasi Gratis
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-[40px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
