import { ArrowUpRight, DollarSign, Package, ShoppingCart, Users, PlusCircle, CheckCircle, Activity, Clock } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Pendapatan", value: "Rp 15.450.000", icon: <DollarSign className="w-5 h-5" />, change: "+12%" },
    { title: "Total Pesanan", value: "48", icon: <ShoppingCart className="w-5 h-5" />, change: "+8%" },
    { title: "Pesanan Pending", value: "5", icon: <Package className="w-5 h-5" />, change: "-2%" },
    { title: "Total Pelanggan", value: "124", icon: <Users className="w-5 h-5" />, change: "+15%" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Dashboard Admin</h1>
          <p className="text-muted text-sm">Overview performa bisnis Anda hari ini.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card-hover p-6 relative overflow-hidden group">
            {/* Soft glow effect inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-[12px] bg-[#121415] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-primary shadow-[0_0_10px_rgba(198,161,91,0.1)] group-hover:shadow-[0_0_15px_rgba(198,161,91,0.3)] transition-all">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold flex items-center px-2 py-1 rounded bg-[#121415] ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
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
        <div className="lg:col-span-2 card-hover overflow-hidden">
          <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-center">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Pesanan Terbaru
            </h2>
            <Link href="/admin/orders" className="text-sm font-medium text-primary hover:text-white transition-colors">Lihat Semua</Link>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#121415]/50 border-b border-[rgba(255,255,255,0.05)]">
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Pelanggan</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {[1,2,3,4,5].map((i) => (
                    <tr key={i} className="hover:bg-[#121415]/80 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-white">ORD-{2024000+i}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">Customer {i}</td>
                      <td className="px-6 py-4 text-sm font-bold golden-text">Rp 499.000</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${i % 2 === 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                          {i % 2 === 0 ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {i % 2 === 0 ? 'PAID' : 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <div className="card-hover p-6">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary" /> Aksi Cepat
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-5 py-4 bg-[#121415]/80 hover:bg-primary/10 border border-[rgba(255,255,255,0.05)] hover:border-primary/50 rounded-[12px] transition-all duration-300 text-sm font-medium text-white flex justify-between items-center group shadow-inner">
                Tambah Produk Baru 
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-black" />
                </div>
              </button>
              <button className="w-full text-left px-5 py-4 bg-[#121415]/80 hover:bg-primary/10 border border-[rgba(255,255,255,0.05)] hover:border-primary/50 rounded-[12px] transition-all duration-300 text-sm font-medium text-white flex justify-between items-center group shadow-inner">
                Tambah Portfolio
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-black" />
                </div>
              </button>
              <button className="w-full text-left px-5 py-4 bg-[#121415]/80 hover:bg-primary/10 border border-[rgba(255,255,255,0.05)] hover:border-primary/50 rounded-[12px] transition-all duration-300 text-sm font-medium text-white flex justify-between items-center group shadow-inner">
                <span className="flex items-center gap-2">Verifikasi Pembayaran <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">5</span></span>
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-black" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
