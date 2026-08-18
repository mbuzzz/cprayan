"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function saveSettings(data: Record<string, string>) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string } | undefined)?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

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