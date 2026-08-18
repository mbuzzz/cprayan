import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Search, CheckCircle2, Clock3, XCircle, Mail, PackageCheck } from "lucide-react";

export const revalidate = 0;

function statusLabel(orderStatus: string) {
  if (orderStatus === "COMPLETED") return { label: "Selesai", className: "text-emerald-500", icon: CheckCircle2 };
  if (orderStatus === "CANCELLED") return { label: "Dibatalkan", className: "text-red-500", icon: XCircle };
  return { label: "Menunggu Pembayaran", className: "text-yellow-500", icon: Clock3 };
}

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; email?: string }>;
}) {
  const params = await searchParams;
  const orderNumber = params.order?.trim() || "";
  const email = params.email?.trim().toLowerCase() || "";
  let order = null;

  if (orderNumber && email) {
    order = await prisma.order.findFirst({
      where: { orderNumber, customerEmail: email },
      include: { items: { include: { product: true } } },
    });
  }

  const status = order ? statusLabel(order.orderStatus) : null;
  const StatusIcon = status?.icon;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <PageHeader title="TRACK ORDER" subtitle="Cek status pesanan dan pengiriman produk digital Anda" />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-6">
        <form method="GET" className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 custom-shadow">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Search className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold">Cari Pesanan</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-xs font-mono text-muted">Nomor Order
              <input name="order" defaultValue={orderNumber} required placeholder="ORD-123456" className="mt-2 w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground" />
            </label>
            <label className="text-xs font-mono text-muted">Email Pembeli
              <input type="email" name="email" defaultValue={email} required placeholder="nama@email.com" className="mt-2 w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground" />
            </label>
          </div>
          <button className="btn-primary px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider">Lacak Pesanan</button>
        </form>

        {order && status && StatusIcon && (
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 custom-shadow">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div><p className="text-xs text-muted font-mono">Nomor Order</p><h2 className="font-heading font-bold text-lg">{order.orderNumber}</h2></div>
              <div className={`flex items-center gap-2 text-sm font-bold ${status.className}`}><StatusIcon className="w-5 h-5" />{status.label}</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-muted">Pembeli</p><p className="font-semibold">{order.customerName}</p></div>
              <div><p className="text-xs text-muted">Email</p><p className="font-semibold">{order.customerEmail}</p></div>
              <div><p className="text-xs text-muted">Total</p><p className="font-semibold text-primary">Rp {order.total.toLocaleString("id-ID")}</p></div>
              <div><p className="text-xs text-muted">Status Pengiriman</p><p className="font-semibold">{order.deliveryEmailSentAt ? "Email produk terkirim" : "Menunggu verifikasi pembayaran"}</p></div>
            </div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-surface border border-border rounded-xl p-4">
                  <PackageCheck className="w-5 h-5 text-primary" />
                  <div><p className="font-semibold text-sm">{item.productName}</p><p className="text-xs text-muted">{order.deliveryEmailSentAt ? "Instruksi/akses dikirim ke email buyer" : "Diproses setelah pembayaran berhasil"}</p></div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted"><Mail className="w-4 h-4 text-primary" />Gunakan email yang sama dengan saat checkout untuk keamanan.</div>
          </div>
        )}

        {orderNumber && email && !order && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-5 text-sm">Pesanan tidak ditemukan. Pastikan nomor order dan email sudah benar.</div>
        )}
        <div className="text-center"><Link href="/products" className="text-primary text-sm hover:underline">Kembali ke katalog produk</Link></div>
      </div>
    </div>
  );
}
