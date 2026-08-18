"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border text-muted py-16 px-4 sm:px-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        
        {/* 1. Brand & Studio Info (5 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <Link href="/" className="flex items-center gap-3 group inline-block">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/asset/logorayan.png"
                alt="PT. Rayan Smart Kreatif"
                fill
                sizes="32px"
                className="object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-heading font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">
              PT. Rayan Smart Kreatif
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-muted max-w-sm leading-relaxed">
            {t.footer.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted font-mono pt-1">
            <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-primary">
              <Lock className="w-3.5 h-3.5" /> 256-Bit SSL
            </span>
          </div>
          <div className="text-[11px] text-muted font-mono pt-1">
            &copy; {new Date().getFullYear()} PT. Rayan Smart Kreatif. {t.footer.allRightsReserved}
          </div>
        </div>

        {/* 2. Navigation Links (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            {t.footer.quickLinks}
          </h4>
          <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm font-medium">
            <li>
              <Link href="/products" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                {t.nav.products}
              </Link>
            </li>
            <li>
              <Link href="/services" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                {t.nav.work}
              </Link>
            </li>
            <li>
              <Link href="/about" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Legal & Kepatuhan Payment Gateway (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            Legal & Pembayaran
          </h4>
          <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm font-medium">
            <li>
              <Link href="/terms" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                Syarat & Ketentuan Lisensi
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                Kebijakan Privasi (Data)
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                Kebijakan Refund & Garansi
              </Link>
            </li>
            <li>
              <Link href="/payment-guide" className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200">
                Panduan Pembayaran QRIS
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Kontak & Saluran Resmi (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            {t.footer.contactTitle}
          </h4>
          <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm font-medium">
            <li>
              <a
                href="mailto:contact@rayansmartkreatif.id"
                className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200"
              >
                contact@rayansmartkreatif.id
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6285226117387"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200"
              >
                +62 852-2611-7387 (WhatsApp)
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
