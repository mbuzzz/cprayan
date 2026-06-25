import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-[#0a0b0c] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden watermark-bg">
      {/* Modern Glow Blobs */}
      <div className="glow-blob bg-primary/20 w-[500px] h-[500px] top-0 left-0 -translate-x-1/2 -translate-y-1/4"></div>
      <div className="glow-blob bg-primary/10 w-[400px] h-[400px] bottom-0 right-0 translate-x-1/4 translate-y-1/4"></div>

      {/* Golden sparks background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-[2px] opacity-50 shadow-[0_0_8px_rgba(198,161,91,1)]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary rounded-full blur-[3px] opacity-30 shadow-[0_0_10px_rgba(198,161,91,1)]"></div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-card/60 backdrop-blur-xl p-8 md:p-10 rounded-[15px] border border-card-border relative z-10 custom-shadow">
        
        <div className="text-center">
          <Link href="/" className="inline-block mb-6 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500"></div>
            <Image src="/asset/logorayan.png" alt="Logo" width={70} height={70} className="mx-auto relative z-10 drop-shadow-[0_0_10px_rgba(198,161,91,0.5)]" />
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Selamat Datang</h2>
          <p className="text-muted text-sm">Masuk ke akun Anda untuk mengelola pesanan dan download produk.</p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-5">
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
              <div className="flex items-center justify-between mb-1.5 ml-1 pr-1">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs font-medium text-primary hover:text-white transition-colors">Lupa password?</a>
              </div>
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

          <div className="flex items-center ml-1">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded bg-[#121415] border-gray-600 text-primary focus:ring-primary focus:ring-offset-[#121415]" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-muted cursor-pointer hover:text-gray-300 transition-colors">
              Ingat saya
            </label>
          </div>

          <div>
            <button type="button" className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-[15px] text-sm font-bold text-black bg-primary hover:bg-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-[#121415] transition-all shadow-[0_0_15px_rgba(198,161,91,0.3)] hover:shadow-[0_0_25px_rgba(198,161,91,0.5)] transform hover:-translate-y-0.5">
              <LogIn className="w-4 h-4" /> Masuk
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(255,255,255,0.08)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted text-xs uppercase tracking-wider font-medium">Atau masuk dengan</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[rgba(255,255,255,0.1)] rounded-[15px] bg-[#121415]/50 hover:bg-[#121415] text-sm font-medium text-white transition-all hover:border-primary/30">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold text-primary hover:text-white transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
