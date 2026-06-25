import { ArrowUpRight, DollarSign, Package, ShoppingCart, Users, PlusCircle, CheckCircle, Activity, Clock } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Aggregate data from Prisma
  const [
    totalRevenue,
    orderStats,
    totalCustomers,
    recentOrders
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { orderStatus: 'COMPLETED' }
    }),
    prisma.order.groupBy({
      by: ['orderStatus'],
      _count: { _all: true }
    }),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })
  ]);

  const totalRevenueAmount = totalRevenue._sum.total || 0;
  
  let totalOrdersCount = 0;
  let pendingOrdersCount = 0;
  
  orderStats.forEach(stat => {
    totalOrdersCount += stat._count._all;
    if (stat.orderStatus === 'PENDING') {
      pendingOrdersCount = stat._count._all;
    }
  });

  const stats = [
    { title: "Total Pendapatan", value: `Rp ${totalRevenueAmount.toLocaleString('id-ID')}`, icon: <DollarSign className="w-5 h-5" />, change: "+12%" },
    { title: "Total Pesanan", value: totalOrdersCount.toString(), icon: <ShoppingCart className="w-5 h-5" />, change: "+8%" },
    { title: "Pesanan Pending", value: pendingOrdersCount.toString(), icon: <Package className="w-5 h-5" />, change: "-2%" },
    { title: "Total Pelanggan", value: totalCustomers.toString(), icon: <Users className="w-5 h-5" />, change: "+15%" },
  ];

  return (
    <div className="transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Dashboard Admin</h1>
          <p className="text-muted text-sm">Overview performa bisnis Anda hari ini.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card-hover p-6 relative overflow-hidden group transition-colors duration-300">
            {/* Soft glow effect inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-[12px] bg-background border border-border flex items-center justify-center text-primary shadow-sm group-hover:shadow-[0_0_15px_rgba(198,161,91,0.3)] transition-all">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold flex items-center px-2 py-1 rounded bg-background ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-muted text-sm mb-1 relative z-10">{stat.title}</h3>
            <p className="text-2xl font-bold golden-text relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card-hover overflow-hidden transition-colors duration-300">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Pesanan Terbaru
            </h2>
            <Link href="/admin/orders" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Lihat Semua</Link>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background border-b border-border">
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Pelanggan</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-muted">Belum ada pesanan masuk.</td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-background/80 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-foreground">
                          <Link href={`/admin/orders/${order.id}`} className="hover:text-primary transition-colors">
                            {order.orderNumber}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">{order.customerName}</td>
                        <td className="px-6 py-4 text-sm font-bold golden-text">Rp {order.total.toLocaleString('id-ID')}</td>
                        <td className="px-6 py-4">
                          {order.orderStatus === 'COMPLETED' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500 border border-green-200 dark:border-green-500/20">
                              <CheckCircle className="w-3 h-3" /> Selesai
                            </span>
                          ) : order.orderStatus === 'PAID' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20">
                              <CheckCircle className="w-3 h-3" /> Dibayar
                            </span>
                          ) : order.orderStatus === 'PENDING' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-500/20">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500 border border-red-200 dark:border-red-500/20">
                              Batal
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <div className="card-hover p-6 transition-colors duration-300">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-foreground">
              <PlusCircle className="w-5 h-5 text-primary" /> Aksi Cepat
            </h2>
            <div className="space-y-3">
              <Link href="/admin/products/create" className="w-full text-left px-5 py-4 bg-background hover:bg-primary/10 border border-border hover:border-primary/50 rounded-[12px] transition-all duration-300 text-sm font-medium text-foreground flex justify-between items-center group shadow-sm">
                Tambah Produk Baru 
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-border">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary-foreground" />
                </div>
              </Link>
              <Link href="/admin/projects/create" className="w-full text-left px-5 py-4 bg-background hover:bg-primary/10 border border-border hover:border-primary/50 rounded-[12px] transition-all duration-300 text-sm font-medium text-foreground flex justify-between items-center group shadow-sm">
                Tambah Portfolio
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-border">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary-foreground" />
                </div>
              </Link>
              <Link href="/admin/orders" className="w-full text-left px-5 py-4 bg-background hover:bg-primary/10 border border-border hover:border-primary/50 rounded-[12px] transition-all duration-300 text-sm font-medium text-foreground flex justify-between items-center group shadow-sm">
                <span className="flex items-center gap-2">Verifikasi Pembayaran 
                  {pendingOrdersCount > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingOrdersCount}</span>}
                </span>
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-border">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary-foreground" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
