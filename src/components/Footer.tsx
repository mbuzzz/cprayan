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
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/asset/logorayan.png"
                alt="PT. Rayan Smart Kreatif"
                fill
                sizes="32px"
                className="object-contain filter brightness-110"
              />
            </div>
            <span className="font-heading font-bold text-lg text-foreground tracking-tight">
              PT. Rayan Smart Kreatif
            </span>
          </div>
          <p className="text-sm text-muted max-w-sm leading-relaxed">
            {t.footer.description}
          </p>
          <div className="text-xs text-muted pt-2 font-mono">
            &copy; {new Date().getFullYear()} PT. Rayan Smart Kreatif. {t.footer.allRightsReserved}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3 md:col-start-7 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            {t.footer.quickLinks}
          </h4>
          <ul className="flex flex-col space-y-2.5 text-sm">
            <li>
              <Link href="/products" className="text-muted hover:text-primary transition-colors">
                {t.nav.products}
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-muted hover:text-primary transition-colors">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-muted hover:text-primary transition-colors">
                {t.nav.work}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted hover:text-primary transition-colors">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted hover:text-primary transition-colors">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            {t.footer.contactTitle}
          </h4>
          <ul className="flex flex-col space-y-2.5 text-sm">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
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
