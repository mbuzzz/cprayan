import Link from "next/link";
import Image from "next/image";
import { MonitorSmartphone, LayoutTemplate, Megaphone, PaintBucket, ArrowRight, Code, ShieldCheck, Zap, HeadphonesIcon, Star, ShoppingCart, CheckCircle, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  // Fetch site settings
  const settings = await prisma.siteSetting.findMany();
  const getSetting = (key: string, fallback: string) => {
    const s = settings.find(s => s.key === key);
    return s ? s.value : fallback;
  };

  const heroTitle = getSetting('hero_title', 'Bangun Masa Depan Bisnis Digital Anda');
  const heroSubtitle = getSetting('hero_subtitle', 'PT. Rayan Smart Kreatif menghadirkan solusi teknologi enterprise, dari pengembangan sistem kustom hingga aset produk digital premium untuk mempercepat project Anda.');

  // Fetch featured products
  const featuredProductsRaw = await prisma.product.findMany({
    where: { published: true, featured: true },
    include: { category: true },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const featuredProducts = featuredProductsRaw.map(p => {
    let images = ["/asset/logorayan.png"];
    try {
      if (p.screenshots) images = JSON.parse(p.screenshots as string);
    } catch(e) {}
    return {
      ...p,
      image: images[0] || "/asset/logorayan.png",
      categoryName: p.category?.name || "Uncategorized"
    };
  });

  // Fetch featured projects
  const featuredProjectsRaw = await prisma.project.findMany({
    where: { published: true, featured: true },
    take: 2,
    orderBy: { createdAt: 'desc' }
  });

  const featuredProjects = featuredProjectsRaw.map(p => {
    let images = ["/asset/logorayan.png"];
    let tech = ["Next.js"];
    try {
      if (p.screenshots) images = JSON.parse(p.screenshots as string);
      if (p.techStack) tech = JSON.parse(p.techStack as string);
    } catch(e) {}
    return { ...p, image: images[0] || "/asset/logorayan.png", tech };
  });

  // Fetch services
  const services = await prisma.service.findMany({
    where: { published: true },
    take: 4,
    orderBy: { order: 'asc' }
  });

  const iconMap: Record<string, React.ReactNode> = {
    MonitorSmartphone: <MonitorSmartphone className="w-7 h-7" />,
    LayoutTemplate: <LayoutTemplate className="w-7 h-7" />,
    Megaphone: <Megaphone className="w-7 h-7" />,
    PaintBucket: <PaintBucket className="w-7 h-7" />
  };

  return (
    <div className="flex flex-col overflow-hidden transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center watermark-bg pt-32 pb-20 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(198,161,91,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(198,161,91,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Glow Blobs */}
        <div className="glow-blob bg-primary/20 w-[800px] h-[500px] top-0 left-1/2 -translate-x-1/2"></div>
        <div className="glow-blob bg-primary/10 w-[500px] h-[500px] bottom-0 right-0"></div>

        {/* Golden sparks effect container */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-primary rounded-full blur-[1px] opacity-70 animate-pulse shadow-[0_0_8px_rgba(198,161,91,1)]"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary rounded-full blur-[2px] opacity-50 animate-pulse delay-1000 shadow-[0_0_10px_rgba(198,161,91,1)]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary rounded-full opacity-80 animate-pulse delay-500 shadow-[0_0_5px_rgba(198,161,91,1)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md custom-shadow transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Premium Digital Agency & Marketplace
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 tracking-tight leading-[1.1] text-foreground">
            {heroTitle.split(' ').slice(0, 2).join(' ')} <span className="golden-text">{heroTitle.split(' ').slice(2).join(' ')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-10 font-light leading-relaxed">
            {heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-16 relative z-20">
            <Link href="/products" className="btn-primary text-center flex items-center justify-center gap-2 text-base px-8 py-4 shadow-[0_0_20px_rgba(198,161,91,0.2)] dark:shadow-[0_0_20px_rgba(198,161,91,0.4)] hover:shadow-[0_0_30px_rgba(198,161,91,0.4)] dark:hover:shadow-[0_0_30px_rgba(198,161,91,0.6)]">
              <Code className="w-5 h-5" /> Jelajahi Produk Digital
            </Link>
            <Link href="/contact" className="btn-secondary text-center flex items-center justify-center gap-2 text-base px-8 py-4 bg-background/50 backdrop-blur-sm">
              Konsultasi Gratis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Floating UI Mockup */}
          <div className="w-full max-w-5xl mx-auto relative perspective-1000 mt-8 group">
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-all duration-700"></div>
            
            <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-[20px] p-2 custom-shadow transform transition-transform duration-700 hover:rotate-x-2 hover:scale-[1.02]">
              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50 rounded-t-[16px]">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="mx-auto text-xs text-muted font-mono flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-primary" /> admin.rayanweb.id
                </div>
              </div>
              
              {/* Mockup Content */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 h-[300px] md:h-[400px] overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col gap-4 border-r border-border pr-4">
                  <div className="w-12 h-12 relative mx-auto mb-4">
                    <Image src="/asset/logorayan.png" alt="Logo" fill className="object-contain" />
                  </div>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 rounded-[8px] bg-background border border-border"></div>
                  ))}
                </div>
                
                {/* Main Content Area */}
                <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
                  {/* Top nav */}
                  <div className="h-10 rounded-[8px] bg-background border border-border flex items-center px-4 justify-between">
                    <div className="w-24 h-4 bg-muted/20 rounded"></div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <div className="w-4 h-4 text-primary"><Image src="/asset/logorayan.png" alt="Icon" width={16} height={16} /></div>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-24 rounded-[12px] bg-background border ${i === 1 ? 'border-primary/30 shadow-sm dark:shadow-[0_0_15px_rgba(198,161,91,0.1)]' : 'border-border'} p-4 flex flex-col justify-center`}>
                        <div className="w-16 h-3 bg-muted/20 rounded mb-3"></div>
                        <div className={`w-24 h-6 ${i === 1 ? 'bg-primary/20' : 'bg-muted/10'} rounded`}></div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="flex-1 rounded-[12px] bg-background border border-border p-4 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
                    {/* Simulated chart line */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <path d="M0,150 Q100,50 200,100 T400,80 T600,120 T800,40" fill="none" stroke="#C6A15B" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(198,161,91,0.5)] dark:drop-shadow-[0_0_8px_rgba(198,161,91,0.8)]" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK / LOGOS */}
      <section className="py-10 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold text-muted uppercase tracking-widest mb-6">Teknologi Modern Yang Kami Gunakan</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'TypeScript', 'Prisma'].map((tech) => (
              <span key={tech} className="text-xl font-bold font-heading text-foreground">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (MARKETPLACE) */}
      <section className="py-24 relative">
        <div className="glow-blob bg-primary/5 w-[600px] h-[600px] top-1/2 left-0 -translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase mb-2">
                <ShoppingCart className="w-4 h-4" /> Marketplace
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Produk Digital <span className="golden-text">Premium</span></h2>
            </div>
            <Link href="/products" className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
              Lihat Semua Produk <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card-hover group flex flex-col h-full relative p-2">
                <div className="relative h-56 bg-background rounded-t-md flex items-center justify-center p-6 border-b border-border overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={140}
                    height={140}
                    className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 object-contain drop-shadow-md dark:drop-shadow-[0_0_10px_rgba(198,161,91,0.2)]"
                  />
                  <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-md border border-border px-3 py-1 rounded-full text-[10px] font-bold golden-text tracking-wider uppercase">
                    {product.categoryName}
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col relative z-10 bg-card rounded-b-md">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-snug">
                    <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors text-foreground">
                      {product.title}
                    </Link>
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm bg-background px-2.5 py-1 rounded-md border border-border">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                      <span className="font-bold text-foreground">5.0</span>
                    </div>
                    <div className="text-lg font-bold golden-text">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES / WHY CHOOSE US */}
      <section className="py-24 relative bg-card">
        <div className="glow-blob bg-primary/5 w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">LAYANAN <span className="golden-text">KAMI</span></h2>
            <p className="text-muted text-lg leading-relaxed">Selain menyediakan produk digital siap pakai, kami juga melayani pengembangan sistem kustom (Bespoke) yang disesuaikan dengan kebutuhan unik proses bisnis Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-background p-8 card-hover text-center relative group custom-shadow">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                
                <div className="w-16 h-16 mx-auto mb-6 rounded-[12px] border border-primary/20 flex items-center justify-center text-primary bg-card shadow-sm group-hover:shadow-[0_0_20px_rgba(198,161,91,0.2)] dark:group-hover:shadow-[0_0_20px_rgba(198,161,91,0.4)] transition-all duration-300 group-hover:-translate-y-2 relative z-10">
                  {service.icon && iconMap[service.icon] ? iconMap[service.icon] : <Code className="w-7 h-7" />}
                </div>
                
                <h3 className="text-xl font-bold mb-3 relative z-10 text-foreground">{service.title}</h3>
                <p className="text-muted text-sm relative z-10 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US / ADVANTAGES */}
      <section className="py-24 border-y border-border relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-foreground">Membangun Ekosistem Digital <span className="golden-text">Berkualitas Tinggi</span></h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Kami tidak sekadar membuat aplikasi. Kami membangun ekosistem digital yang dirancang untuk skala enterprise dengan tingkat keamanan, kecepatan, dan reliabilitas terbaik.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: "Kualitas Source Code Premium", desc: "Ditulis dengan clean code, best practices, dan dokumentasi lengkap." },
                  { icon: <Zap className="w-5 h-5 text-primary" />, title: "Performa Super Cepat", desc: "Optimasi tingkat tinggi memastikan loading time di bawah 2 detik." },
                  { icon: <HeadphonesIcon className="w-5 h-5 text-primary" />, title: "Dukungan Teknis Penuh", desc: "Layanan after-sales responsif untuk instalasi dan troubleshooting." },
                ].map((adv, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-sm dark:shadow-[0_0_10px_rgba(198,161,91,0.1)]">
                      {adv.icon}
                    </div>
                    <div>
                      <h4 className="text-foreground font-bold text-lg mb-1">{adv.title}</h4>
                      <p className="text-sm text-muted">{adv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-card backdrop-blur-md border border-border rounded-2xl custom-shadow p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/5"></div>
                <Image
                  src="/asset/logorayan.png"
                  alt="Rayan Keunggulan"
                  width={300}
                  height={300}
                  className="object-contain relative z-10 drop-shadow-xl dark:drop-shadow-[0_0_30px_rgba(198,161,91,0.5)]"
                />
                
                {/* Floating stat cards */}
                <div className="absolute top-8 left-8 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg flex items-center gap-3 animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 flex items-center justify-center dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Client Satisfaction</p>
                    <p className="font-bold text-foreground text-sm">99.9%</p>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg flex items-center gap-3 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Clean Code</p>
                    <p className="font-bold text-foreground text-sm">Enterprise Grade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PORTFOLIO */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase mb-2">
                <PaintBucket className="w-4 h-4" /> Portfolio Klien
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Karya <span className="golden-text">Terbaik</span> Kami</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
              Eksplorasi Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
               <div key={project.id} className="card-hover group">
               <div className="relative h-72 bg-background rounded-t-lg p-8 flex items-center justify-center overflow-hidden border-b border-border">
                 <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-500"></div>
                 <Image
                   src={project.image}
                   alt={project.title}
                   width={180}
                   height={180}
                   className="opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 object-contain drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(198,161,91,0.3)] relative z-10"
                 />
                 
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/50 backdrop-blur-sm z-20">
                   <Link href={`/projects/${project.slug}`} className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:bg-[#b08d4b] transition-all shadow-md dark:shadow-[0_0_20px_rgba(198,161,91,0.6)] transform hover:-translate-y-1">
                     View Case Study <ChevronRight className="w-4 h-4" />
                   </Link>
                 </div>
               </div>
               
               <div className="p-8 relative z-10 bg-card rounded-b-lg">
                 <h3 className="text-2xl font-bold mb-3 leading-tight">
                   <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors text-foreground">
                     {project.title}
                   </Link>
                 </h3>
                 <p className="text-muted text-sm mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                 
                 <div className="flex flex-wrap gap-2 pt-5 border-t border-border">
                   {project.tech.map((t: string, i: number) => (
                     <span key={i} className="text-xs font-medium bg-background text-muted px-3 py-1.5 rounded-md border border-border shadow-sm">
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-card border border-primary/20 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden custom-shadow">
            {/* CTA Background Effects */}
            <div className="absolute inset-0 bg-[url('/asset/logorayan.png')] bg-no-repeat bg-center bg-[length:400px] opacity-[0.02] mix-blend-overlay"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/10 blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">Siap Memulai Transformasi <br/><span className="golden-text">Digital Anda?</span></h2>
              <p className="text-muted text-lg mb-10">
                Jangan biarkan bisnis Anda tertinggal. Mari diskusikan kebutuhan Anda atau eksplorasi source code siap pakai di marketplace kami.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-base px-8 py-4 flex justify-center items-center gap-2">
                  Hubungi Kami Sekarang <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/products" className="btn-secondary text-base px-8 py-4 flex justify-center items-center gap-2 bg-background hover:bg-muted/10">
                  <ShoppingCart className="w-5 h-5" /> Beli Aset Digital
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
