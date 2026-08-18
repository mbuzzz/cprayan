"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Heart, Search, UserCircle, LogIn, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#080808]/90 backdrop-blur-md border-b border-[#4d4635]/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand & Nav Links */}
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/asset/logorayan.png"
                alt="PT. Rayan Smart Kreatif Logo"
                fill
                className="object-contain filter brightness-110"
              />
            </div>
            <span className="font-heading font-bold text-sm sm:text-base text-foreground tracking-tight group-hover:text-primary transition-colors">
              PT. Rayan Smart Kreatif
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? "text-primary border-b border-primary pb-0.5 font-semibold"
                      : "text-[#d0c5af] hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Quick Search */}
          <Link
            href="/products"
            className="hidden lg:flex items-center text-[#d0c5af] hover:text-primary transition-colors"
            title="Search Products"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Language Selector */}
          <div
            onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
            className="text-xs uppercase tracking-widest text-[#d0c5af] hover:text-primary cursor-pointer hidden sm:flex items-center gap-1 transition-colors"
            title="Switch Language"
          >
            <span className="font-mono text-[11px] font-semibold">{lang}</span>
            <ChevronDown className="w-3 h-3" />
          </div>

          {/* Cart & Favorites */}
          <div className="flex items-center gap-4 text-[#d0c5af]">
            <Link
              href="/cart"
              className="relative hover:text-primary transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Auth Button */}
          {session ? (
            <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-[#4d4635]/30">
              <Link
                href={(session.user as any)?.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="text-xs uppercase tracking-wider text-primary hover:text-white flex items-center gap-1.5 transition-colors font-medium"
              >
                <UserCircle className="w-4 h-4" />
                <span className="max-w-[100px] truncate">{session.user?.name || "Account"}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-[11px] text-[#858585] hover:text-red-400 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1 text-xs uppercase tracking-widest text-[#d0c5af] hover:text-primary transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          )}

          {/* Start a Project CTA Button */}
          <Link
            href="/contact"
            className="hidden md:inline-block px-4 py-2 bg-primary text-black font-semibold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all"
          >
            Start a Project
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#d0c5af] hover:text-primary focus:outline-none p-1"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#121414] border-b border-[#4d4635]/30 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-wider py-1 ${
                    isActive ? "text-primary font-bold" : "text-[#d0c5af]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#4d4635]/30 flex flex-col gap-3">
            {session ? (
              <div className="flex items-center justify-between">
                <Link
                  href={(session.user as any)?.role === "ADMIN" ? "/admin" : "/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="text-xs uppercase text-primary font-semibold flex items-center gap-2"
                >
                  <UserCircle className="w-4 h-4" />
                  {session.user?.name || "Dashboard"}
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setIsOpen(false);
                  }}
                  className="text-xs text-red-400 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase text-primary font-semibold flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login / Register
              </Link>
            )}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 bg-primary text-black font-semibold text-xs uppercase tracking-widest mt-2"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
