"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function OrderActionButtons({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    // Simulated verification
    const confirmed = window.confirm("Apakah Anda yakin ingin memverifikasi pembayaran pesanan ini secara manual? (Simulasi)");
    if (!confirmed) return;
    
    setLoading(true);
    setTimeout(() => {
      alert("Pesanan berhasil diverifikasi. Status diubah menjadi PAID.");
      router.refresh();
      setLoading(false);
    }, 1000);
  };

  const handleComplete = async () => {
    // Simulated completion
    const confirmed = window.confirm("Apakah pesanan ini sudah selesai dikirimkan ke pelanggan? (Simulasi)");
    if (!confirmed) return;
    
    setLoading(true);
    setTimeout(() => {
      alert("Pesanan selesai. Akses unduh diberikan kepada pelanggan.");
      router.refresh();
      setLoading(false);
    }, 1000);
  };

  const handleCancel = async () => {
    // Simulated cancellation
    const confirmed = window.confirm("Batalkan pesanan ini?");
    if (!confirmed) return;
    
    setLoading(true);
    setTimeout(() => {
      alert("Pesanan dibatalkan.");
      router.refresh();
      setLoading(false);
    }, 1000);
  };

  if (currentStatus === 'PENDING') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          onClick={handleVerify}
          disabled={loading}
          className="btn-primary flex items-center justify-center gap-2 px-6"
        >
          <CheckCircle className="w-4 h-4" /> {loading ? "Memproses..." : "Verifikasi Pembayaran"}
        </button>
        <button 
          onClick={handleCancel}
          disabled={loading}
          className="btn-secondary text-red-500 border-red-500 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 flex items-center justify-center gap-2 px-6"
        >
          <XCircle className="w-4 h-4" /> Batalkan
        </button>
      </div>
    );
  }

  if (currentStatus === 'PAID') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          onClick={handleComplete}
          disabled={loading}
          className="btn-primary bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 px-6 text-white"
        >
          <CheckCircle className="w-4 h-4" /> {loading ? "Memproses..." : "Selesaikan Pesanan"}
        </button>
      </div>
    );
  }

  return null;
}