import { Download, ChevronRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-20240115-0001",
      date: "15 Jan 2024",
      total: 830280,
      status: "PAID",
      items: ["Rayan POS System Premium", "CorporatePro Template"]
    },
    {
      id: "ORD-20231210-0042",
      date: "10 Des 2023",
      total: 350000,
      status: "PENDING",
      items: ["WA Gateway Pro - Node.js API"]
    },
    {
      id: "ORD-20231105-0128",
      date: "05 Nov 2023",
      total: 150000,
      status: "CANCELLED",
      items: ["FinDash - Fintech Dashboard UI Kit"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle className="w-3 h-3" /> Lunas</span>;
      case 'PENDING':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"><Clock className="w-3 h-3" /> Menunggu Pembayaran</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><AlertCircle className="w-3 h-3" /> Dibatalkan</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Pesanan Saya</h1>
      
      <div className="bg-card rounded-xl border border-card-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#121415] border-b border-[rgba(255,255,255,0.05)]">
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Produk</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#121415] transition-colors">
                  <td className="px-6 py-5 font-mono text-sm text-white">{order.id}</td>
                  <td className="px-6 py-5 text-sm text-muted">{order.date}</td>
                  <td className="px-6 py-5 text-sm text-gray-300">
                    <div className="line-clamp-2 max-w-[250px]">
                      {order.items.join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold golden-text">Rp {order.total.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-5">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {order.status === 'PAID' ? (
                      <button className="inline-flex items-center gap-2 text-sm text-primary border border-primary/30 hover:bg-primary/10 px-3 py-1.5 rounded transition-colors">
                        <Download className="w-4 h-4" /> Download
                      </button>
                    ) : order.status === 'PENDING' ? (
                       <Link href="/checkout/manual-payment" className="inline-flex items-center gap-2 text-sm text-white bg-primary/20 border border-primary/50 hover:bg-primary/40 px-3 py-1.5 rounded transition-colors">
                        Bayar <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="text-muted text-sm">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
