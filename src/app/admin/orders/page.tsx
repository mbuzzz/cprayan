import Link from "next/link";
import { Search, Eye, Filter, CheckCircle, Clock, XCircle, CreditCard, MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: true
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-500/20"><CheckCircle className="w-3 h-3" /> Selesai</span>;
      case 'PAID':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-500/20"><CreditCard className="w-3 h-3" /> Dibayar</span>;
      case 'PENDING':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 text-xs font-bold border border-yellow-200 dark:border-yellow-500/20"><Clock className="w-3 h-3" /> Menunggu</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-500/20"><XCircle className="w-3 h-3" /> Batal</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400 text-xs font-bold border border-gray-200 dark:border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Manajemen Pesanan</h1>
          <p className="text-sm text-muted">Pantau dan verifikasi pembayaran pesanan pelanggan.</p>
        </div>
      </div>

      {/* Stats/Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between custom-shadow transition-colors duration-300">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Cari Order ID..." 
              className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            />
          </div>
          <button className="btn-secondary px-3 py-2 text-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Pending: <strong className="text-foreground">{orders.filter(o => o.orderStatus === 'PENDING').length}</strong></span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Selesai: <strong className="text-foreground">{orders.filter(o => o.orderStatus === 'COMPLETED').length}</strong></span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden custom-shadow transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-xs font-bold text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Pelanggan</th>
                <th className="p-4">Metode</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status Pesanan</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4 pr-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted">Belum ada pesanan masuk.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-background/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <Link href={`/admin/orders/${order.id}`} className="font-bold text-foreground group-hover:text-primary transition-colors font-mono text-sm">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-foreground text-sm">{order.customerName}</p>
                      <p className="text-xs text-muted">{order.customerEmail}</p>
                    </td>
                    <td className="p-4">
                      {order.paymentMethod === 'manual_whatsapp' ? (
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <MessageSquare className="w-3 h-3 text-green-500" /> WhatsApp
                        </span>
                      ) : (
                        <span className="text-xs text-muted">{order.paymentMethod}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-foreground text-sm">Rp {order.total.toLocaleString('id-ID')}</span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="p-4 text-sm text-muted">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/orders/${order.id}`} className="btn-secondary px-3 py-1.5 text-xs">
                          <Eye className="w-3 h-3" /> Detail
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}