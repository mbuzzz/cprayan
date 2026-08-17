import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Battle of Mobile Legends STEMDA",
  description: "Bagan pertandingan Mobile Legends SMKS Muhammadiyah 2 Genteng.",
  alternates: { canonical: "/mlbbstemda" },
};

export default function MlbbLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
