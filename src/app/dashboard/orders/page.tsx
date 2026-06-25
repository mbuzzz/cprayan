import { Package, Download, ExternalLink, Clock, CreditCard, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function DashboardOrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch real orders from database for this specific user
  const orders = await prisma.order.findMany({
    where: {
      customerEmail: session.user.email
    },
    include: {
      items: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-500 text-xs font-bold border border-green-200 dark:border-green-500/20"><CheckCircle className="w-3 h-3" /> Selesai</span>;
      case 'PAID':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-500 text-xs font-bold border border-blue-200 dark:border-blue-500/20"><CreditCard className="w-3 h-3" /> Diproses</span>;
      case 'PENDING':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 text-xs font-bold border border-yellow-200 dark:border-yellow-500/20"><Clock className="w-3 h-3" /> Menunggu</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-500 text-xs font-bold border border-red-200 dark:border-red-500/20"><XCircle className="w-3 h-3" /> Batal</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400 text-xs font-bold border border-gray-200 dark:border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Pesanan Saya</h1>
        <p className="text-sm text-muted">Kelola riwayat pembelian dan unduh produk digital Anda.</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden custom-shadow transition-colors duration-300">
        <div className="p-5 border-b border-border flex items-center justify-between bg-background/50">
          <h2 className="font-bold flex items-center gap-2 text-foreground"><Package className="w-4 h-4 text-primary" /> Riwayat Transaksi</h2>
          <span className="text-xs font-medium text-muted bg-background px-2.5 py-1 rounded-md border border-border">Total: {orders.length}</span>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-foreground mb-2">Belum Ada Pesanan</h3>
            <p className="text-muted mb-6">Anda belum pernah melakukan pembelian produk digital.</p>
            <Link href="/products" className="btn-primary inline-flex">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background border-b border-border text-xs font-bold text-muted uppercase tracking-wider">
                  <th className="p-4 pl-6">Order ID</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Produk</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-background/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <span className="font-bold text-foreground font-mono text-sm">{order.orderNumber}</span>
                    </td>
                    <td className="p-4 text-sm text-muted">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-foreground line-clamp-1">{order.items[0]?.productName || "Digital Product"}</div>
                      {order.items.length > 1 && (
                        <div className="text-xs text-muted mt-0.5">+{order.items.length - 1} item lainnya</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-foreground text-sm">Rp {order.total.toLocaleString('id-ID')}</span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {order.orderStatus === 'COMPLETED' ? (
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-[#b08d4b] text-xs font-bold transition-all shadow-sm">
                          <Download className="w-3.5 h-3.5" /> Unduh
                        </button>
                      ) : order.orderStatus === 'PENDING' ? (
                        <Link href={`/checkout/manual-payment?orderId=${order.id}&ref=${order.referenceNumber}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background border border-border hover:border-primary hover:text-primary text-foreground text-xs font-bold transition-all">
                          <ExternalLink className="w-3.5 h-3.5" /> Bayar
                        </Link>
                      ) : (
                        <button disabled className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background border border-border text-muted text-xs font-bold cursor-not-allowed">
                          Memproses
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
