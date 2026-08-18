import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";
import ContactClient from "./ContactClient";

export const revalidate = 0;

export const metadata = {
  title: "Hubungi Kami | PT. Rayan Smart Kreatif",
  description: "Kontak resmi, alamat kantor, dan formulir konsultasi proyek PT. Rayan Smart Kreatif.",
};

export default async function ContactPage() {
  const dbSettings = await prisma.siteSetting.findMany();
  
  const settingsMap = dbSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      <PageHeader 
        title="HUBUNGI KAMI" 
        subtitle="Kami siap membantu mewujudkan visi digital dan solusi teknologi perusahaan Anda" 
      />
      
      <ContactClient settings={settingsMap} />
    </div>
  );
}
