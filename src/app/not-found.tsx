import Link from "next/link";
import Image from "next/image";
import { Home, Search, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0b0c] text-center px-4">
      {/* Glow Blobs */}
      <div className="glow-blob bg-primary/20 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 card-hover p-10 md:p-16 max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 bg-[#121415] rounded-full border border-[rgba(255,255,255,0.05)] flex items-center justify-center mb-8 shadow-inner relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all"></div>
          <AlertCircle className="w-10 h-10 text-primary relative z-10" />
        </div>
        
        <h1 className="text-8xl font-bold golden-text mb-4 drop-shadow-[0_0_15px_rgba(198,161,91,0.3)]">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
          Maaf, halaman yang Anda cari tidak ada, telah dihapus, namanya diubah, atau sementara tidak tersedia.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Link href="/" className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 shadow-[0_0_15px_rgba(198,161,91,0.3)]">
            <Home className="w-5 h-5" /> Kembali ke Home
          </Link>
          <Link href="/products" className="btn-secondary flex items-center justify-center gap-2 px-8 py-3.5 bg-[#121415]/50 border-[rgba(255,255,255,0.1)] hover:border-primary/50">
            <Search className="w-5 h-5" /> Cari Produk
          </Link>
        </div>
      </div>
    </div>
  );
}
