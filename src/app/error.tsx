"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0b0c] text-center px-4">
      {/* Glow Blobs */}
      <div className="glow-blob bg-red-500/10 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 card-hover p-10 md:p-16 max-w-2xl mx-auto flex flex-col items-center border-red-500/20">
        <div className="w-24 h-24 bg-[#121415] rounded-full border border-red-500/20 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(239,68,68,0.1)] relative group">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md group-hover:bg-red-500/40 transition-all"></div>
          <AlertTriangle className="w-10 h-10 text-red-500 relative z-10" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terjadi Kesalahan</h1>
        <p className="text-gray-400 mb-2 max-w-md mx-auto leading-relaxed">
          Maaf, terjadi kesalahan internal pada sistem kami. Tim teknis kami telah diberitahu.
        </p>
        <p className="text-xs text-red-400 mb-10 font-mono bg-red-500/10 px-4 py-2 rounded-[8px] border border-red-500/20">
          {error.message || "Internal Server Error"}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <button 
            onClick={() => reset()} 
            className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 shadow-[0_0_15px_rgba(198,161,91,0.3)]"
          >
            <RefreshCcw className="w-5 h-5" /> Coba Lagi
          </button>
          <Link href="/" className="btn-secondary flex items-center justify-center gap-2 px-8 py-3.5 bg-[#121415]/50 border-[rgba(255,255,255,0.1)] hover:border-primary/50">
            <Home className="w-5 h-5" /> Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
