import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Award, Users, Code, Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await prisma.siteSetting.findMany();
  const getSetting = (key: string, fallback: string) => {
    const s = settings.find(s => s.key === key);
    return s ? s.value : fallback;
  };

  const story = getSetting('about_story', 'PT. Rayan Smart Kreatif didirikan dengan semangat untuk menghadirkan solusi digital yang tidak hanya cerdas, tetapi juga memiliki nilai estetika premium dan profesionalitas tinggi.');
  const vision = getSetting('about_vision', 'Menjadi perusahaan teknologi digital terdepan di Indonesia yang dikenal karena inovasi cerdas, kualitas desain premium, dan solusi yang memberdayaan bisnis untuk bersaing secara global.');
  const email = getSetting('contact_email', 'contact@rayansmartkreatif.id');
  const whatsapp = getSetting('whatsapp_number', '6281234567890');
  const address = getSetting('contact_address', 'Jakarta, Indonesia');
  
  let missionList = ['Menghadirkan produk digital inovatif dengan standar kualitas tertinggi.'];
  try {
    missionList = JSON.parse(getSetting('about_mission', '["Menghadirkan produk digital inovatif dengan standar kualitas tertinggi."]'));
  } catch(e) {}

  return (
    <div>
      <PageHeader 
        title="TENTANG KAMI" 
        subtitle="Mengenal lebih dekat visi, misi, nilai, dan tim PT. Rayan Smart Kreatif" 
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Story Section */}
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
            <div className="text-muted mb-4 leading-relaxed text-base sm:text-lg prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: story }} />
            <p className="text-muted mb-8 leading-relaxed">
              Kami percaya bahwa di era digital, identitas sebuah bisnis ditentukan oleh kualitas kehadiran digital mereka. Oleh karena itu, kami berkomitmen untuk memberikan layanan teknologi yang inovatif, elegan, dan berdampak nyata bagi pertumbuhan bisnis klien kami.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-2xl sm:text-3xl font-bold golden-text mb-1 flex items-center gap-2"><Award className="w-5 h-5" /> 5+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider">Tahun Pengalaman</div>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <div className="text-2xl sm:text-3xl font-bold golden-text mb-1 flex items-center gap-2"><Code className="w-5 h-5" /> 100+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider">Project Selesai</div>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <div className="text-2xl sm:text-3xl font-bold golden-text mb-1 flex items-center gap-2"><Users className="w-5 h-5" /> 50+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider">Klien Puas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="card-hover p-8 sm:p-10 relative overflow-hidden rounded-xl bg-card border border-border">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 golden-text flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              Visi
            </h3>
            <div className="text-muted leading-relaxed text-base sm:text-lg relative z-10 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: vision }} />
          </div>

          <div className="card-hover p-8 sm:p-10 relative overflow-hidden rounded-xl bg-card border border-border">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-full pointer-events-none"></div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 golden-text flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              Misi
            </h3>
            <ul className="text-muted leading-relaxed space-y-4 relative z-10">
              {missionList.map((m, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0 shadow-[0_0_5px_rgba(198,161,91,0.5)]"></div>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Location Section */}
        <div className="border-t border-border pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Hubungi Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Mari Berkolaborasi Bersama Kami
            </h2>
            <p className="text-muted text-sm sm:text-base">
              Siap memulai proyek baru atau ingin berkonsultasi mengenai kebutuhan digital Anda? Tim kami siap membantu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-card border border-border rounded-xl flex items-start gap-4 hover:border-primary transition-colors">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Email Resmi</h4>
                <p className="text-xs text-muted mb-2">Respon cepat dalam 24 jam kerja</p>
                <a href={`mailto:${email}`} className="text-sm text-primary font-mono hover:underline">
                  {email}
                </a>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl flex items-start gap-4 hover:border-primary transition-colors">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">WhatsApp & Konsultasi</h4>
                <p className="text-xs text-muted mb-2">Senin - Jumat (09:00 - 18:00 WIB)</p>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-mono hover:underline">
                  +{whatsapp}
                </a>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl flex items-start gap-4 hover:border-primary transition-colors">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Lokasi Studio</h4>
                <p className="text-xs text-muted mb-2">Kantor Operasional</p>
                <span className="text-sm text-foreground">
                  {address}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 sm:p-12 bg-gradient-to-r from-card via-surface to-card border border-border rounded-2xl text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Punya Ide Proyek Digital?
            </h3>
            <p className="text-muted text-sm sm:text-base max-w-lg mx-auto">
              Kirimkan brief proyek Anda kepada kami untuk mendapatkan estimasi rancangan arsitektur dan penawaran terbaik.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all rounded shadow-md"
              >
                <span>Buka Formulir Kontak & Brief</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
