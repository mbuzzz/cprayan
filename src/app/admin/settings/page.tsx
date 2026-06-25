import { Save, Settings2, Image as ImageIcon, MessageSquare, Phone, MapPin, AlignLeft, Shield, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  
  // Convert array to key-value object
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Pengaturan Website & CMS</h1>
        <p className="text-sm text-muted">Kelola informasi umum, kontak, dan konten halaman publik Anda.</p>
      </div>

      <SettingsForm initialData={settingsMap} />
    </div>
  );
}