import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="bg-[#0a0b0c] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden watermark-bg">
      {/* Modern Glow Blobs */}
      <div className="glow-blob bg-primary/20 w-[500px] h-[500px] top-0 right-0 translate-x-1/4 -translate-y-1/4"></div>
      <div className="glow-blob bg-primary/10 w-[400px] h-[400px] bottom-0 left-0 -translate-x-1/4 translate-y-1/4"></div>

      {/* Golden sparks background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full blur-[2px] opacity-50 shadow-[0_0_8px_rgba(198,161,91,1)]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary rounded-full blur-[3px] opacity-30 shadow-[0_0_10px_rgba(198,161,91,1)]"></div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-card/60 backdrop-blur-xl p-8 md:p-10 rounded-[15px] border border-card-border relative z-10 custom-shadow">
        
        <div className="text-center">
          <Link href="/" className="inline-block mb-6 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500"></div>
            <Image src="/asset/logorayan.png" alt="Logo" width={70} height={70} className="mx-auto relative z-10 drop-shadow-[0_0_10px_rgba(198,161,91,0.5)]" />
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Buat Akun</h2>
          <p className="text-muted text-sm">Daftar sekarang untuk kemudahan transaksi dan akses produk digital Anda.</p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Nama Lengkap</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-11 pr-4 py-3.5 border border-[rgba(255,255,255,0.08)] rounded-[15px] bg-[#121415]/80 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" 
                  placeholder="Nama Lengkap" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="email" 
                  className="block w-full pl-11 pr-4 py-3.5 border border-[rgba(255,255,255,0.08)] rounded-[15px] bg-[#121415]/80 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" 
                  placeholder="nama@email.com" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="password" 
                  className="block w-full pl-11 pr-4 py-3.5 border border-[rgba(255,255,255,0.08)] rounded-[15px] bg-[#121415]/80 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>

          <div className="flex items-start ml-1">
            <div className="flex items-center h-5">
              <input id="terms" name="terms" type="checkbox" className="h-4 w-4 rounded bg-[#121415] border-gray-600 text-primary focus:ring-primary focus:ring-offset-[#121415]" required />
            </div>
            <div className="ml-3 text-xs text-muted leading-tight">
              <label htmlFor="terms" className="font-medium cursor-pointer">
                Saya setuju dengan <a href="#" className="text-primary hover:text-white transition-colors">Syarat & Ketentuan</a> serta <a href="#" className="text-primary hover:text-white transition-colors">Kebijakan Privasi</a>.
              </label>
            </div>
          </div>

          <div>
            <button type="button" className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-[15px] text-sm font-bold text-black bg-primary hover:bg-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-[#121415] transition-all shadow-[0_0_15px_rgba(198,161,91,0.3)] hover:shadow-[0_0_25px_rgba(198,161,91,0.5)] transform hover:-translate-y-0.5">
              <UserPlus className="w-4 h-4" /> Daftar Sekarang
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-muted">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-bold text-primary hover:text-white transition-colors">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
