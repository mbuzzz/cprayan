import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { CheckCircle, Award, Users, Code } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await prisma.siteSetting.findMany();
  const getSetting = (key: string, fallback: string) => {
    const s = settings.find(s => s.key === key);
    return s ? s.value : fallback;
  };

  const story = getSetting('about_story', 'PT. Rayan Smart Kreatif didirikan dengan semangat untuk menghadirkan solusi digital yang tidak hanya cerdas, tetapi juga memiliki nilai estetika premium dan profesionalitas tinggi.');
  const vision = getSetting('about_vision', 'Menjadi perusahaan teknologi digital terdepan di Indonesia yang dikenal karena inovasi cerdas, kualitas desain premium, dan solusi yang memberdayakan bisnis untuk bersaing secara global.');
  
  let missionList = ['Menghadirkan produk digital inovatif dengan standar kualitas tertinggi.'];
  try {
    missionList = JSON.parse(getSetting('about_mission', '["Menghadirkan produk digital inovatif dengan standar kualitas tertinggi."]'));
  } catch(e) {}

  return (
    <div>
      <PageHeader 
        title="TENTANG KAMI" 
        subtitle="Mengenal lebih dekat visi, misi, dan nilai dari PT. Rayan Smart Kreatif" 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="w-full md:w-1/2 relative h-[400px] rounded-xl overflow-hidden border border-border bg-card custom-shadow group">
            <div className="absolute inset-0 flex items-center justify-center">
               <Image
                  src="/asset/logorayan.png"
                  alt="PT. Rayan Smart Kreatif Logo"
                  width={250}
                  height={250}
                  className="opacity-20 group-hover:scale-110 transition-transform duration-700"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Cerita <span className="golden-text">Kami</span></h2>
            <p className="text-muted mb-4 leading-relaxed text-lg">
              {story}
            </p>
            <p className="text-muted mb-8 leading-relaxed">
              Kami percaya bahwa di era digital, identitas sebuah bisnis ditentukan oleh kualitas kehadiran digital mereka. Oleh karena itu, kami berkomitmen untuk memberikan layanan teknologi yang inovatif, elegan, dan berdampak nyata bagi pertumbuhan bisnis klien kami.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-3xl font-bold golden-text mb-1 flex items-center gap-2"><Award className="w-5 h-5" /> 5+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider">Tahun Pengalaman</div>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <div className="text-3xl font-bold golden-text mb-1 flex items-center gap-2"><Code className="w-5 h-5" /> 100+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider">Project Selesai</div>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <div className="text-3xl font-bold golden-text mb-1 flex items-center gap-2"><Users className="w-5 h-5" /> 50+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider">Klien Puas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="card-hover p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <h3 className="text-3xl font-bold mb-6 golden-text flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              Visi
            </h3>
            <p className="text-muted leading-relaxed text-lg relative z-10">
              {vision}
            </p>
          </div>
          <div className="card-hover p-10 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-full pointer-events-none"></div>
            <h3 className="text-3xl font-bold mb-6 golden-text flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              Misi
            </h3>
            <ul className="text-muted leading-relaxed space-y-4 relative z-10">
              {missionList.map((m, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 shadow-[0_0_5px_rgba(198,161,91,0.5)]"></div>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
