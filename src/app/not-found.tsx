import Link from "next/link";
import Image from "next/image";
import { Home, Search, AlertCircle, ShoppingBag, Briefcase, Layers, ArrowRight, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden bg-background text-foreground text-center px-4 py-20 transition-colors duration-300">
      {/* Background Glow */}
      <div className="glow-blob bg-primary/15 w-[650px] h-[650px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none fixed"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Logo & Icon Badge */}
        <div className="relative">
          <div className="w-20 h-20 bg-card rounded-2xl border border-border flex items-center justify-center custom-shadow group">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-lg group-hover:bg-primary/25 transition-all"></div>
            <Image src="/asset/logorayan.png" alt="Logo" width={40} height={40} className="relative z-10 object-contain" />
          </div>
        </div>

        {/* 404 Display */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/30">
            <AlertCircle className="w-3.5 h-3.5" /> Error Code 404
          </div>
          <h1 className="text-7xl sm:text-9xl font-black font-heading golden-text tracking-tight drop-shadow-[0_0_25px_rgba(242,202,80,0.25)]">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
            Maaf, tautan yang Anda tuju mungkin telah dipindahkan, dihapus, atau sedang dalam pembaruan sistem oleh tim kami.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl text-left pt-2">
          <Link
            href="/products"
            className="p-4 bg-card border border-border hover:border-primary rounded-xl transition-all duration-200 group custom-shadow flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-black transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">Katalog Produk</h3>
              <p className="text-[11px] text-muted line-clamp-1">Source code & template</p>
            </div>
          </Link>

          <Link
            href="/services"
            className="p-4 bg-card border border-border hover:border-primary rounded-xl transition-all duration-200 group custom-shadow flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-black transition-colors">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">Paket Layanan</h3>
              <p className="text-[11px] text-muted line-clamp-1">Jasa Web & Mobile App</p>
            </div>
          </Link>

          <Link
            href="/projects"
            className="p-4 bg-card border border-border hover:border-primary rounded-xl transition-all duration-200 group custom-shadow flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-black transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">Portofolio</h3>
              <p className="text-[11px] text-muted line-clamp-1">Studi kasus klien</p>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md pt-2">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2 px-7 py-3 text-xs uppercase font-bold tracking-wider rounded-xl shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/contact"
            className="px-7 py-3 bg-surface border border-border hover:border-primary hover:text-primary text-foreground text-xs font-mono uppercase font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>Bantuan & Kontak</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
