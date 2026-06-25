"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Briefcase, 
  BarChart, 
  Settings, 
  LogOut,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Orders", href: "/admin/orders", icon: <ShoppingCart className="w-5 h-5" /> },
    { name: "Products", href: "/admin/products", icon: <Package className="w-5 h-5" /> },
    { name: "Portfolio", href: "/admin/projects", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Analytics", href: "/admin/analytics", icon: <BarChart className="w-5 h-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-background min-h-screen flex relative overflow-hidden transition-colors duration-300">
      {/* Modern Background Glow */}
      <div className="glow-blob bg-primary/5 w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed"></div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-all"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-card/80 backdrop-blur-xl border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col custom-shadow`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all"></div>
              <Image src="/asset/logorayan.png" alt="Logo" width={32} height={32} className="relative z-10" />
            </div>
            <span className="font-heading text-lg text-primary tracking-wider group-hover:text-black dark:group-hover:text-white transition-colors">ADMIN PANEL</span>
          </Link>
          <button className="lg:hidden text-muted hover:text-black dark:hover:text-white transition-colors" onClick={() => setIsMobileOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 px-4">Menu Utama</p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                      : 'text-muted hover:text-foreground hover:bg-gray-100 dark:hover:bg-[#121415]/50 hover:translate-x-1'
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-border">
          <button className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold rounded-lg text-red-500 border border-transparent hover:border-red-500/30 hover:text-red-600 dark:hover:text-red-300 bg-red-50 dark:bg-red-500/5 hover:bg-red-100 dark:hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header */}
        <header className="h-20 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 sticky top-0 z-30 custom-shadow transition-colors duration-300">
          <button 
            className="lg:hidden text-muted hover:text-foreground transition-colors"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/" target="_blank" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" /> Lihat Website
            </Link>
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-foreground">Admin</p>
                <p className="text-[10px] text-muted uppercase tracking-wider">Superuser</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-background border border-primary/30 flex items-center justify-center text-primary font-bold shadow-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
