import PageHeader from "@/components/PageHeader";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      <PageHeader 
        title="HUBUNGI KAMI" 
        subtitle="Kami siap membantu mewujudkan visi digital Anda" 
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Mari <span className="golden-text">Berdiskusi</span></h2>
            <p className="text-muted mb-8 leading-relaxed">
              Apakah Anda memiliki proyek baru, pertanyaan tentang layanan kami, atau hanya ingin sekadar menyapa? Jangan ragu untuk menghubungi kami melalui form di samping atau melalui kontak di bawah ini.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30">
                  <MapPin className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Alamat Kantor</h4>
                  <p className="text-muted">Gedung Perkantoran Sudirman, Lt. 12<br />Jl. Jend. Sudirman Kav. 1<br />Jakarta Pusat, 10220</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30">
                  <Mail className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email</h4>
                  <p className="text-muted">hello@rayanweb.id<br />support@rayanweb.id</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30">
                  <Phone className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Telepon / WhatsApp</h4>
                  <p className="text-muted">+62 812 3456 7890<br />(Senin - Jumat, 09:00 - 17:00)</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg border border-card-border">
            <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input type="email" className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Subjek</label>
                <input type="text" className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Penawaran Kerjasama" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Pesan</label>
                <textarea rows={5} className="w-full bg-[#121415] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Ceritakan detail kebutuhan Anda..."></textarea>
              </div>
              
              <button type="button" className="btn-primary w-full py-3">Kirim Pesan Sekarang</button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
