import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle2, Download, ShieldCheck, ArrowRight, FileCode, Clock, RefreshCw, AlertCircle } from "lucide-react";
import Image from "next/image";

export const revalidate = 0;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { order_id?: string; ref?: string };
}) {
  const { order_id, ref } = await searchParams;
  const orderIdentifier = order_id || ref;

  let order: any = null;

  if (orderIdentifier) {
    order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: orderIdentifier },
          { referenceNumber: orderIdentifier },
          { id: orderIdentifier }
        ]
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  }

  const isCompleted = order && (order.orderStatus === "COMPLETED" || order.paymentStatus === "PAID");

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Status Header */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4 custom-shadow relative overflow-hidden">
          <div className="glow-blob bg-primary/10 w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none absolute"></div>

          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto relative z-10 shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="relative z-10 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isCompleted ? "Pembayaran Berhasil Terverifikasi" : "Menunggu Konfirmasi Gateway"}
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Terima Kasih Atas Pesanan Anda!
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto">
              {isCompleted
                ? "Transaksi Anda telah sukses diproses melalui Payment Gateway Sumopod. Berkas aset digital Anda siap diunduh di bawah ini."
                : "Pesanan Anda telah tercatat. Jika Anda baru saja menyelesaikan pembayaran, sistem sedang memverifikasi beberapa detik lagi."}
            </p>
          </div>
        </div>

        {order ? (
          <>
            {/* Download Items Card */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 custom-shadow">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-primary" /> Berkas Produk Digital
                </h2>
                <span className="text-xs font-mono text-muted">
                  Order ID: <strong className="text-foreground">{order.orderNumber}</strong>
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item: any) => {
                  let image = "/asset/logorayan.png";
                  try {
                    const parsed = JSON.parse(item.product?.screenshots || "[]");
                    if (parsed.length > 0) image = parsed[0];
                  } catch (e) {}

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center p-1 flex-shrink-0">
                          <Image src={image} alt={item.productName} width={36} height={36} className="object-contain" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-foreground">{item.productName}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted font-mono mt-0.5">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span className="golden-text font-semibold">Rp {item.productPrice.toLocaleString("id-ID")}</span>
                            {item.product?.license && (
                              <>
                                <span>•</span>
                                <span className="text-primary">{item.product.license}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <a
                            href={`/api/download/${item.downloadToken}`}
                            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:opacity-90 transition-opacity"
                          >
                            <Download className="w-4 h-4" />
                            <span>Unduh File (.ZIP)</span>
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-mono">
                            <Clock className="w-4 h-4" />
                            <span>Menunggu Status Lunas</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 custom-shadow text-xs font-mono">
              <h3 className="font-heading font-bold text-sm text-foreground border-b border-border pb-3">
                Rincian Transaksi
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted">
                <div>
                  <span className="block text-[10px] uppercase text-muted">Nama Pembeli:</span>
                  <span className="text-foreground font-semibold">{order.customerName}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-muted">Email Pengiriman:</span>
                  <span className="text-foreground font-semibold">{order.customerEmail}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-muted">Nomor WhatsApp:</span>
                  <span className="text-foreground font-semibold">{order.customerPhone}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-muted">Metode Pembayaran:</span>
                  <span className="text-foreground font-semibold">{order.paymentMethod}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-muted">Tanggal Transaksi:</span>
                  <span className="text-foreground font-semibold">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-muted">Total Pembayaran:</span>
                  <span className="golden-text font-bold text-sm">Rp {order.total.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-primary mx-auto opacity-60" />
            <h2 className="font-heading font-bold text-lg text-foreground">Data Pesanan Tidak Ditemukan</h2>
            <p className="text-xs text-muted">Silakan periksa kembali tautan konfirmasi Anda atau hubungi admin.</p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/products"
            className="w-full sm:w-auto px-6 py-3 bg-surface border border-border hover:border-primary hover:text-primary text-foreground text-xs font-mono uppercase font-bold rounded-xl transition-colors text-center"
          >
            Kembali ke Katalog
          </Link>
          <Link
            href="/dashboard/orders"
            className="w-full sm:w-auto btn-primary px-6 py-3 text-xs font-mono uppercase font-bold rounded-xl text-center"
          >
            Lihat Riwayat Pesanan
          </Link>
        </div>

      </div>
    </div>
  );
}
