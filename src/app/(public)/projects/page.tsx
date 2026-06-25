import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { MonitorPlay } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ProjectsPage() {
  const projectsRaw = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  });

  const projects = projectsRaw.map(p => {
    let images = ["/asset/logorayan.png"];
    let tech = ["Next.js"];
    try {
      if (p.screenshots) images = JSON.parse(p.screenshots as string);
      if (p.techStack) tech = JSON.parse(p.techStack as string);
    } catch(e) {}

    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: "Portfolio",
      image: images[0] || "/asset/logorayan.png",
      desc: p.description,
      tech: tech
    };
  });

  return (
    <div className="bg-[#0a0b0c] min-h-screen relative overflow-hidden">
      <div className="glow-blob bg-primary/10 w-[600px] h-[600px] top-20 right-0 translate-x-1/3"></div>
      
      <PageHeader 
        title="PORTFOLIO KAMI" 
        subtitle="Karya terbaik kami yang membantu bisnis bertransformasi di era digital" 
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Filter (Visual only for now) */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["Semua", "Web Development", "Mobile Apps", "UI/UX Design"].map((cat, i) => (
            <button 
              key={i} 
              className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${
                i === 0 
                  ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(198,161,91,0.4)] transform hover:-translate-y-0.5" 
                  : "bg-card/50 backdrop-blur-md text-muted border-[rgba(255,255,255,0.08)] hover:border-primary/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="card-hover overflow-hidden group">
              <div className="relative h-72 bg-[#121415] p-8 flex items-center justify-center overflow-hidden border-b border-[rgba(255,255,255,0.05)]">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/20 transition-colors duration-500"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={200}
                  height={200}
                  className="opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 object-contain drop-shadow-[0_0_15px_rgba(198,161,91,0.3)] relative z-10"
                />
                
                {/* Overlay Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm z-20">
                  <Link href={`/projects/${project.slug}`} className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center hover:bg-white hover:scale-110 transition-transform shadow-[0_0_20px_rgba(198,161,91,0.6)]">
                    <MonitorPlay className="w-6 h-6" />
                  </Link>
                </div>
              </div>
              
              <div className="p-8 relative z-10">
                <div className="text-[10px] font-bold tracking-widest golden-text mb-3 uppercase">{project.category}</div>
                <h3 className="text-2xl font-bold mb-4 leading-tight">
                  <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors text-white">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-muted text-sm mb-6 leading-relaxed line-clamp-2">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-medium bg-[#121415] text-gray-300 px-3 py-1.5 rounded-[8px] border border-[rgba(255,255,255,0.05)] shadow-inner">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
