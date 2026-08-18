import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/components/CartContext";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "PT. Rayan Smart Kreatif - Build. Buy. Grow.",
  description: "Premium digital products and bespoke engineering for ambitious brands. A unified ecosystem for creation and scale.",
  icons: {
    icon: [
      { url: "/asset/logorayan.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/asset/logorayan.png"],
    apple: [
      { url: "/asset/logorayan.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-primary selection:text-on-primary transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}