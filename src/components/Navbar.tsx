"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, UserCircle, LogIn, Sparkles } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useLanguage } from "./LanguageContext";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const pathname = usePathname();
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Top-level navigation items (Centrally positioned)
  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.products, href: "/products" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.work, href: "/projects" },
    { name: t.nav.about, href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* 1. LEFT: Brand & Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/asset/logorayan.png"
                alt="PT. Rayan Smart Kreatif Logo"
                fill
                sizes="32px"
                className="object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-heading font-bold text-xs sm:text-sm md:text-base text-foreground tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
              PT. Rayan Smart Kreatif
            </span>
          </Link>
        </div>

        {/* 2. CENTER: Main Nav Links (Centered) */}
        <div className="hidden md:flex items-center justify-center flex-1 px-4 lg:px-8">
          <div className="flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-all duration-200 whitespace-nowrap relative py-1 ${
                    isActive
                      ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
                      : "text-muted hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. RIGHT: Actions & Tools */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Quick Search */}
          <Link
            href="/products"
            className="hidden lg:flex items-center text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-surface"
            title={t.nav.search}
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Language Selector Dropdown */}
          <LanguageSelector />

          {/* Dark / Light Mode Toggle */}
          <ThemeToggle />

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-surface"
            title={t.nav.cart}
          >
            <ShoppingCart className="w-4 h-4" />
            {mounted && itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth Button */}
          {session ? (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border">
              <Link
                href={(session.user as any)?.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="text-xs uppercase tracking-wider text-primary hover:text-foreground flex items-center gap-1.5 transition-colors font-bold"
              >
                <UserCircle className="w-4 h-4" />
                <span className="max-w-[90px] truncate">{session.user?.name || "Account"}</span>
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-[11px] text-muted hover:text-red-500 cursor-pointer transition-colors px-1 font-mono"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted hover:text-primary transition-colors font-semibold px-2.5 py-1.5 rounded hover:bg-surface"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.nav.login}</span>
            </Link>
          )}

          {/* Start a Project CTA Button (Auto-hidden when logged in) */}
          {!session && (
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all rounded shadow-sm whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.startProject}</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary focus:outline-none p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Polished & Fully Responsive) */}
      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border px-6 py-6 space-y-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-wider py-2 px-3 rounded-md transition-colors ${
                    isActive ? "bg-primary/10 text-primary font-bold border border-primary/20" : "text-foreground hover:bg-surface"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border flex flex-col gap-3">
            {session ? (
              <div className="flex items-center justify-between p-2 bg-surface rounded-lg">
                <Link
                  href={(session.user as any)?.role === "ADMIN" ? "/admin" : "/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-primary flex items-center gap-2"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>{session.user?.name || "Account"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-xs text-red-400 hover:text-red-300 font-mono cursor-pointer"
                >
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 border border-border text-foreground text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all font-bold rounded"
                >
                  {t.nav.login}
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 bg-primary text-on-primary text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all rounded shadow flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.nav.startProject}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
