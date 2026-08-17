import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dirgahayu Republik Indonesia — Indonesia Emas",
  description:
    "Ucapan HUT RI ke-81 dalam terminal Python interaktif Indonesia Emas. Kritik, refleksi, dan harapan untuk Republik Indonesia.",
  keywords: [
    "HUT RI 81",
    "Dirgahayu Republik Indonesia",
    "Indonesia Emas",
    "17 Agustus 1945",
    "terminal Python Indonesia",
  ],
  authors: [{ name: "Indonesia Emas" }],
  creator: "Indonesia Emas",
  metadataBase: new URL("https://gumpla.web.id"),
  alternates: { canonical: "/hutri81" },
  icons: { icon: "/hutri81-icon.svg", shortcut: "/hutri81-icon.svg" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://gumpla.web.id/hutri81",
    siteName: "Indonesia Emas",
    title: "Dirgahayu Republik Indonesia — Indonesia Emas",
    description:
      "Terminal Python interaktif untuk merayakan HUT RI ke-81: kritik() == health_check().",
  },
  twitter: {
    card: "summary",
    title: "Dirgahayu Republik Indonesia — Indonesia Emas",
    description: "HUT RI ke-81 dalam format terminal Python interaktif.",
  },
  robots: { index: true, follow: true },
};

export default function Hutri81Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
