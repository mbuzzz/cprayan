"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border text-muted py-16 px-4 sm:px-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand & Studio Info */}
        <div className="md:col-span-5 space-y-6">
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
          <p className="text-sm text-muted max-w-sm leading-relaxed">
            {t.footer.description}
          </p>
          <div className="text-xs text-muted pt-2 font-mono">
            &copy; {new Date().getFullYear()} PT. Rayan Smart Kreatif. {t.footer.allRightsReserved}
          </div>
        </div>

        {/* Navigation Links with Hover Slide */}
        <div className="md:col-span-3 md:col-start-7 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            {t.footer.quickLinks}
          </h4>
          <ul className="flex flex-col space-y-2.5 text-sm">
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

        {/* Social Links with Hover Slide */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            {t.footer.contactTitle}
          </h4>
          <ul className="flex flex-col space-y-2.5 text-sm">
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
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted hover:text-primary hover:translate-x-1.5 rtl:hover:-translate-x-1.5 transition-all duration-200"
              >
                LinkedIn
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
