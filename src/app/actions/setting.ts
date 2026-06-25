"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettings(data: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(data)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }
    
    // Revalidate all pages since settings can affect anywhere
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}