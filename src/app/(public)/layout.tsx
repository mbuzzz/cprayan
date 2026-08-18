import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[60px]">
        {children}
      </main>
      
      {/* Stitch Aureum Precision Footer */}
      <footer className="bg-[#080808] border-t border-[#4d4635]/30 text-[#d0c5af] py-16 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & Studio Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
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
            <p className="text-sm text-[#858585] max-w-sm leading-relaxed">
              Jakarta, Indonesia<br />
              Crafting digital excellence through objective design and rigorous engineering. A unified ecosystem for creation and scale.
            </p>
            <div className="text-xs text-[#858585] pt-2">
              &copy; {new Date().getFullYear()} PT. Rayan Smart Kreatif. All rights reserved.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 md:col-start-7 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Company
            </h4>
            <ul className="flex flex-col space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="text-[#858585] hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#858585] hover:text-primary transition-colors">
                  Agency & Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#858585] hover:text-primary transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#858585] hover:text-primary transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#858585] hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Connect
            </h4>
            <ul className="flex flex-col space-y-2.5 text-sm">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#858585] hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#858585] hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#858585] hover:text-primary transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Legal
            </h4>
            <ul className="flex flex-col space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-[#858585] hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#858585] hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}