"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { Language } from "@/lib/i18n/translations";
import { Globe, ChevronDown, Check } from "lucide-react";

export default function LanguageSelector() {
  const { language, setLanguage, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; name: string; flag: string }[] = [
    { code: "id", label: "ID", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
    { code: "ar", label: "AR", name: "العربية (RTL)", flag: "🇸🇦" },
    { code: "zh", label: "ZH", name: "简体中文", flag: "🇨🇳" },
  ];

  const current = languages.find((l) => l.code === language) || languages[0];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border/50 bg-card hover:border-primary text-foreground hover:text-primary transition-all duration-200 cursor-pointer font-mono text-xs shadow-sm"
        title="Ganti Bahasa / Switch Language"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="font-semibold tracking-wider">{current.label}</span>
        <ChevronDown className={`w-3 h-3 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            isRtl ? "left-0" : "right-0"
          } mt-2 w-48 rounded-md bg-card border border-border shadow-xl py-1 z-50 focus:outline-none animate-in fade-in zoom-in-95 duration-100`}
        >
          <div className="px-3 py-1.5 border-b border-border/50 font-mono text-[10px] uppercase text-muted tracking-wider">
            Pilih Bahasa / Language
          </div>
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-sans transition-colors cursor-pointer ${
                language === item.code
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-foreground hover:bg-surface hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{item.flag}</span>
                <div className="flex flex-col text-left rtl:text-right">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-[10px] text-muted font-mono">{item.label}</span>
                </div>
              </div>
              {language === item.code && <Check className="w-3.5 h-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
