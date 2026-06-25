"use client";

import Link from "next/link";
import { Package, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  // Generate initials
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-background min-h-screen flex flex-col md:flex-row relative overflow-hidden transition-colors duration-300">
      {/* Modern Background Glow */}
      <div className="glow-blob bg-primary/5 w-[600px] h-[600px] top-1/4 left-1/4 fixed"></div>
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card/80 backdrop-blur-xl border-r border-border md:min-h-[calc(100vh-80px)] flex flex-col custom-shadow relative z-10 transition-colors duration-300">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background border border-primary/30 flex items-center justify-center text-primary font-bold shadow-sm">
              {getInitials(session?.user?.name)}
            </div>
            <div>
              <p className="font-bold text-foreground text-sm line-clamp-1">{session?.user?.name || "User"}</p>
              <p className="text-xs text-muted tracking-wider">{session?.user?.email?.split('@')[0] || "MEMBER"}</p>
            </div>
          </div>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname === '/dashboard' ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted hover:text-foreground hover:bg-background'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/orders" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname === '/dashboard/orders' ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted hover:text-foreground hover:bg-background'}`}>
            <Package className="w-5 h-5" /> Pesanan Saya
          </Link>
          <Link href="/dashboard/settings" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname === '/dashboard/settings' ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted hover:text-foreground hover:bg-background'}`}>
            <Settings className="w-5 h-5" /> Pengaturan Akun
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <div className="hidden md:flex justify-end mb-2">
            <ThemeToggle />
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold rounded-lg text-red-500 border border-transparent hover:border-red-500/30 hover:text-red-600 dark:hover:text-red-300 bg-red-50 dark:bg-red-500/5 hover:bg-red-100 dark:hover:bg-red-500/10 transition-all">
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
