import Link from "next/link";
import { XCircle, ArrowLeft, MessageSquare, RefreshCw } from "lucide-react";

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  const { order_id } = await searchParams;

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-8 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center space-y-6 custom-shadow">
        <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Pembayaran Dibatalkan
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            Transaksi pembayaran {order_id ? `untuk pesanan #${order_id}` : ""} telah dibatalkan. Anda belum dikenakan biaya apa pun.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/products"
            className="btn-primary w-full py-3 text-xs uppercase font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 block"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba Pembelian Lain</span>
          </Link>
          <a
            href="https://wa.me/6285226117387?text=Halo%20Admin%20Rayan%2C%20saya%20butuh%20bantuan%20pembayaran"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-surface border border-border text-foreground hover:border-primary hover:text-primary text-xs font-mono uppercase font-bold rounded-xl transition-colors flex items-center justify-center gap-2 block"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>Bantuan CS WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
