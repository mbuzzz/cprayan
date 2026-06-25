"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, LogIn, UserCircle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/projects" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/85 dark:bg-[#121415]/85 backdrop-blur-xl border-b border-gray-200 dark:border-[rgba(198,161,91,0.15)] custom-shadow transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all"></div>
                <Image
                  src="/asset/logorayan.png"
                  alt="PT. Rayan Smart Kreatif Logo"
                  fill
                  className="object-contain relative z-10"
                />
              </div>
              <span className="font-heading text-lg sm:text-xl tracking-wider text-foreground group-hover:text-primary transition-all duration-300">
                RAYAN <span className="text-primary font-bold group-hover:text-foreground transition-all duration-300">SMART KREATIF</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition-all px-4 py-2 rounded-full text-sm font-medium border ${
                      isActive
                        ? "text-primary bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(198,161,91,0.15)]"
                        : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-primary/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-[rgba(255,255,255,0.1)]">
                <ThemeToggle />
                
                {session ? (
                  <div className="flex items-center gap-3">
                    <Link 
                      href={(session.user as any)?.role === 'ADMIN' ? '/admin' : '/dashboard'} 
                      className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full transition-all border ${
                        pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')
                          ? "text-primary bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(198,161,91,0.15)]"
                          : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-primary/5"
                      }`}
                    >
                      <UserCircle className="w-5 h-5 text-primary" /> {session.user?.name || "Dashboard"}
                    </Link>
                    <button onClick={() => signOut({ callbackUrl: '/' })} className="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium cursor-pointer">Logout</button>
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full transition-all border ${
                      pathname === '/login'
                        ? "text-primary bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(198,161,91,0.15)]"
                        : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-primary/5"
                    }`}
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                )}
                
                <Link href="/cart" className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> ({mounted ? itemCount : 0})
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-primary/5 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#121415]/95 backdrop-blur-xl border-t border-gray-200 dark:border-[rgba(198,161,91,0.15)] absolute w-full left-0 shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-[12px] text-base font-medium transition-all ${
                    isActive
                      ? "text-primary bg-primary/10 border-l-4 border-primary pl-3"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-primary/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-[rgba(198,161,91,0.15)] space-y-3">
              {session ? (
                 <>
                   <Link
                      href={(session.user as any)?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                      className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-base font-medium transition-all ${
                        pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')
                          ? "text-primary bg-primary/10 border-l-4 border-primary pl-3"
                          : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-primary/5"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <UserCircle className="w-5 h-5 text-primary" /> Dashboard
                   </Link>
                   <button
                      onClick={() => { signOut({ callbackUrl: '/' }); setIsOpen(false); }}
                      className="flex w-full items-center gap-3 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 px-4 py-3 rounded-[12px] text-base font-medium transition-all cursor-pointer"
                    >
                      Logout
                   </button>
                 </>
              ) : (
                <Link
                  href="/login"
                  className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-base font-medium transition-all ${
                    pathname === '/login'
                      ? "text-primary bg-primary/10 border-l-4 border-primary pl-3"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-primary/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-5 h-5" /> Login
                </Link>
              )}
              
              <Link
                href="/cart"
                className="flex items-center gap-3 text-black bg-primary px-4 py-3 rounded-[12px] text-base font-bold transition-all shadow-[0_0_15px_rgba(198,161,91,0.3)]"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" /> Keranjang ({mounted ? itemCount : 0})
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
