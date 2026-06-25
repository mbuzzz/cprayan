import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, PlayCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug, published: true },
    include: { demoLinks: true }
  });

  if (!project) notFound();

  // Parse JSON arrays safely
  let images = ["/asset/logorayan.png"];
  let tech = ["Next.js"];
  try {
    if (project.screenshots) images = JSON.parse(project.screenshots);
    if (project.techStack) tech = JSON.parse(project.techStack);
  } catch(e) {}

  const mainImage = images[0] || "/asset/logorayan.png";
  const gallery = images.length > 1 ? images.slice(1, 5) : []; // Show up to 4 additional images

  // Get specific links if they exist
  const livePreview = project.demoLinks.find(l => l.label.toLowerCase().includes('live') || l.type === 'URL');
  const videoPreview = project.demoLinks.find(l => l.label.toLowerCase().includes('video') || l.type === 'VIDEO');
  const sourceCode = project.demoLinks.find(l => l.label.toLowerCase().includes('source') || l.label.toLowerCase().includes('github'));

  return (
    <div className="bg-background min-h-screen pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-card border-b border-border pt-12 pb-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Portfolio
          </Link>
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Project Case Study
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">{project.title}</h1>
            <p className="text-xl text-muted leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Featured Image / Video Placeholder */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-12 custom-shadow group relative transition-colors duration-300">
              <div className="aspect-video relative bg-[#121415] flex items-center justify-center p-4">
                 <Image 
                  src={mainImage} 
                  alt={project.title} 
                  width={800} 
                  height={450} 
                  className="object-contain w-full h-full"
                />
                {videoPreview && (
                  <Link href={videoPreview.url} target="_blank" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                    <div className="w-20 h-20 rounded-full bg-primary/90 text-black flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_30px_rgba(198,161,91,0.6)]">
                      <PlayCircle className="w-10 h-10 ml-1" />
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className="prose prose-invert max-w-none mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Tentang Project Ini</h2>
              {project.content ? (
                <div dangerouslySetInnerHTML={{ __html: project.content }} className="text-muted leading-relaxed whitespace-pre-line text-lg" />
              ) : (
                <p className="text-muted leading-relaxed text-lg mb-6">
                  {project.description}
                  <br /><br />
                  Project ini dibangun dengan fokus pada performa, skalabilitas, dan pengalaman pengguna yang optimal. Kami menggunakan teknologi modern untuk memastikan aplikasi berjalan dengan mulus di berbagai perangkat.
                </p>
              )}
            </div>

            {/* Gallery (If more than 1 image) */}
            {gallery.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">Galeri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img, i) => (
                    <div key={i} className="aspect-video bg-card border border-border rounded-lg p-2 overflow-hidden flex items-center justify-center">
                      <Image src={img} alt={`${project.title} screenshot ${i+1}`} width={400} height={225} className="object-contain w-full h-full hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              
              {/* Project Links */}
              {project.demoLinks.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-8 custom-shadow transition-colors duration-300">
                  <h3 className="font-bold border-b border-border pb-4 mb-6 text-foreground">Project Links</h3>
                  <div className="space-y-4">
                    {livePreview && (
                      <Link href={livePreview.url} target="_blank" className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-background/80 border border-border transition-all group">
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                          <ExternalLink className="w-5 h-5 text-primary" /> Live Preview
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary" />
                      </Link>
                    )}
                    
                    {videoPreview && (
                      <Link href={videoPreview.url} target="_blank" className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-background/80 border border-border transition-all group">
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                          <PlayCircle className="w-5 h-5 text-primary" /> Watch Video
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary" />
                      </Link>
                    )}
                    
                    {sourceCode && (
                      <Link href={sourceCode.url} target="_blank" className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-background/80 border border-border transition-all group">
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" /> Source Code
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary" />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="bg-card border border-border rounded-xl p-8 custom-shadow transition-colors duration-300">
                <h3 className="font-bold border-b border-border pb-4 mb-6 text-foreground">Teknologi</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t, i) => (
                    <span key={i} className="text-sm font-medium bg-background text-foreground px-4 py-2 rounded-lg border border-border shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-xl p-8 text-center relative overflow-hidden custom-shadow transition-colors duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[30px] pointer-events-none"></div>
                <h3 className="text-xl font-bold mb-3 text-foreground relative z-10">Tertarik membuat project serupa?</h3>
                <p className="text-muted text-sm mb-6 relative z-10">Kami siap membantu mewujudkan ide bisnis Anda menjadi produk digital nyata.</p>
                <Link href="/contact" className="btn-primary w-full justify-center relative z-10">
                  Konsultasi Sekarang
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
