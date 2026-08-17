import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dirgahayu Republik Indonesia — Indonesia Emas",
  description:
    "Dirgahayu Republik Indonesia. 81 tahun merdeka, tetapi masih banyak service publik berstatus TODO. Indonesia Emas bukan slogan kosong: kritik() adalah health_check(), dan perubahan bukan sekadar commit message.",
  keywords: [
    "HUT RI 81",
    "Dirgahayu Republik Indonesia",
    "Indonesia Emas",
    "17 Agustus 1945",
    "terminal Python Indonesia",
  ],
  authors: [{ name: "Indonesia Emas" }],
  creator: "Indonesia Emas",
  applicationName: "Indonesia Emas — HUT RI 81",
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
      "Dirgahayu Republik Indonesia. 81 tahun merdeka, tetapi masih banyak service publik berstatus TODO. kritik() adalah health_check().",
    images: [{
      url: "/hutri81-share.png",
      width: 1200,
      height: 630,
      alt: "Dirgahayu Republik Indonesia — Indonesia Emas — HUT RI ke-81",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dirgahayu Republik Indonesia — Indonesia Emas",
    description: "Dirgahayu Republik Indonesia. 81 tahun merdeka, tetapi masih banyak service publik berstatus TODO.",
    images: ["/hutri81-share.png"],
  },
  robots: { index: true, follow: true },
};

export default function Hutri81Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
