import { prisma } from "@/lib/prisma";
import { BarChart2, DollarSign, ShoppingBag, TrendingUp, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AnalyticsPage() {
  // Query aggregate metrics
  const [
    revenueData,
    totalOrdersCount,
    popularProducts,
    orderStats,
    paymentMethods,
  ] = await Promise.all([
    // Total Revenue (COMPLETED and PAID orders)
    prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      _count: { id: true },
      where: {
        orderStatus: { in: ['COMPLETED', 'PAID'] }
      }
    }),
    // Total orders overall
    prisma.order.count(),
    // Best-selling products (based on OrderItem)
    prisma.orderItem.groupBy({
      by: ['productId', 'productName'],
      _sum: {
        quantity: true,
        subtotal: true
      },
      take: 5,
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      }
    }),
    // Order Status Breakdown
    prisma.order.groupBy({
      by: ['orderStatus'],
      _count: { id: true },
      _sum: { total: true }
    }),
    // Payment Method Breakdown
    prisma.order.groupBy({
      by: ['paymentMethod'],
      _count: { id: true },
      _sum: { total: true },
      where: {
        orderStatus: { in: ['COMPLETED', 'PAID'] }
      }
    })
  ]);

  const totalRevenue = revenueData._sum.total || 0;
  const avgOrderValue = revenueData._avg.total || 0;
  const successfulOrders = revenueData._count.id || 0;

  // Formatting currency
  const formatIDR = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin" className="text-muted hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart2 className="w-8 h-8 text-primary" /> Analisis Bisnis
          </h1>
          <p className="text-sm text-muted">Laporan statistik mendalam performa penjualan dan produk Anda.</p>
        </div>
      </div>

      {/* Analytics Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="card-hover p-6 relative overflow-hidden group transition-colors duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-background border border-border flex items-center justify-center text-primary shadow-sm">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
              Lunas / Sukses
            </span>
          </div>
          <p className="text-muted text-sm mb-1">Total Penjualan Bersih</p>
          <p className="text-2xl font-bold golden-text">{formatIDR(totalRevenue)}</p>
        </div>

        {/* Avg Order Value */}
        <div className="card-hover p-6 relative overflow-hidden group transition-colors duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-background border border-border flex items-center justify-center text-primary shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
              AOV
            </span>
          </div>
          <p className="text-muted text-sm mb-1">Rata-rata Nilai Pesanan</p>
          <p className="text-2xl font-bold text-white">{formatIDR(avgOrderValue)}</p>
        </div>

        {/* Successful Orders */}
        <div className="card-hover p-6 relative overflow-hidden group transition-colors duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-background border border-border flex items-center justify-center text-primary shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
              Konversi: {totalOrdersCount > 0 ? ((successfulOrders / totalOrdersCount) * 100).toFixed(1) + '%' : '0%'}
            </span>
          </div>
          <p className="text-muted text-sm mb-1">Pesanan Sukses / Lunas</p>
          <p className="text-2xl font-bold text-white">{successfulOrders} / {totalOrdersCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Best Selling Products */}
        <div className="card-hover p-6">
          <h2 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" /> Produk Terlaris (Best Seller)
          </h2>
          <div className="space-y-4">
            {popularProducts.length === 0 ? (
              <p className="text-muted text-center py-6 text-sm">Belum ada data penjualan produk.</p>
            ) : (
              popularProducts.map((item, idx) => (
                <div key={item.productId} className="flex items-center justify-between p-4 bg-background/50 border border-border rounded-[12px]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-white text-sm">{item.productName}</p>
                      <p className="text-xs text-muted">Kuantitas Terjual: {item._sum.quantity} unit</p>
                    </div>
                  </div>
                  <p className="font-bold golden-text text-sm">{formatIDR(item._sum.subtotal || 0)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="card-hover p-6">
          <h2 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" /> Status Pesanan
          </h2>
          <div className="space-y-4">
            {orderStats.length === 0 ? (
              <p className="text-muted text-center py-6 text-sm">Belum ada data transaksi.</p>
            ) : (
              orderStats.map((stat) => {
                let colorClass = "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
                if (stat.orderStatus === "COMPLETED" || stat.orderStatus === "PAID") {
                  colorClass = "bg-green-500/10 text-green-500 border-green-500/20";
                } else if (stat.orderStatus === "CANCELLED") {
                  colorClass = "bg-red-500/10 text-red-500 border-red-500/20";
                }

                return (
                  <div key={stat.orderStatus} className="flex items-center justify-between p-4 bg-background/50 border border-border rounded-[12px]">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
                        {stat.orderStatus}
                      </span>
                      <p className="text-xs text-muted">Jumlah: {stat._count.id} transaksi</p>
                    </div>
                    <p className="font-bold text-white text-sm">{formatIDR(stat._sum.total || 0)}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Payment Method Breakdown */}
      <div className="card-hover p-6">
        <h2 className="font-bold text-lg text-white mb-6">Metode Pembayaran Terpopuler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.length === 0 ? (
            <p className="text-muted text-center col-span-2 py-6 text-sm">Belum ada metode pembayaran tercatat.</p>
          ) : (
            paymentMethods.map((method) => (
              <div key={method.paymentMethod} className="p-4 bg-background/50 border border-border rounded-[12px] flex justify-between items-center">
                <div>
                  <p className="font-bold text-white text-sm capitalize">{method.paymentMethod.replace("_", " ")}</p>
                  <p className="text-xs text-muted">Digunakan dalam {method._count.id} pesanan sukses</p>
                </div>
                <p className="font-bold golden-text text-sm">{formatIDR(method._sum.total || 0)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
