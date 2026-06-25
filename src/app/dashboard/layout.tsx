import Link from "next/link";
import { Package, User, LogOut, Settings, LayoutDashboard } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#0a0b0c] min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      {/* Modern Background Glow */}
      <div className="glow-blob bg-primary/5 w-[600px] h-[600px] top-1/4 left-1/4 fixed"></div>
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card/80 backdrop-blur-xl border-r border-card-border md:min-h-[calc(100vh-80px)] flex flex-col custom-shadow relative z-10">
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#121415] border border-primary/30 flex items-center justify-center text-primary font-bold shadow-[0_0_10px_rgba(198,161,91,0.2)]">
              JD
            </div>
            <div>
              <p className="font-bold text-white text-sm">John Doe</p>
              <p className="text-xs text-muted tracking-wider">MEMBER</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-[12px] text-muted hover:text-white hover:bg-[#121415]/50 transition-all">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-[12px] bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(198,161,91,0.1)] transition-all">
            <Package className="w-5 h-5" /> Pesanan Saya
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-[12px] text-muted hover:text-white hover:bg-[#121415]/50 transition-all">
            <Settings className="w-5 h-5" /> Pengaturan Akun
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
          <button className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold rounded-[12px] text-red-400 border border-transparent hover:border-red-500/30 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 relative z-10">
        {children}
      </main>
    </div>
  );
}
