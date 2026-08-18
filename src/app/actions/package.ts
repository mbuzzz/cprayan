"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";

function packageInput(data: Record<string, unknown>) {
  const name = typeof data.name === "string" ? data.name.trim() : "";
  let slug = typeof data.slug === "string" ? data.slug.trim().toLowerCase() : "";
  const category = typeof data.category === "string" && data.category.trim() ? data.category.trim() : "Web Development";
  const price = typeof data.price === "string" || typeof data.price === "number" ? Number(data.price) : NaN;
  const originalPrice = (typeof data.originalPrice === "string" && data.originalPrice.trim()) || typeof data.originalPrice === "number"
    ? Number(data.originalPrice)
    : null;
  const deliveryTime = typeof data.deliveryTime === "string" && data.deliveryTime.trim() ? data.deliveryTime.trim() : "3-7 Hari Kerja";
  const revisionCount = typeof data.revisionCount === "string" && data.revisionCount.trim() ? data.revisionCount.trim() : "3x Revisi";
  const description = typeof data.description === "string" ? data.description.trim().slice(0, 5000) : "";
  const features = typeof data.features === "string" ? data.features.slice(0, 10000) : "[]";
  const isPopular = data.isPopular === true;
  const published = data.published !== false;
  const order = typeof data.order === "number" ? data.order : 0;

  if (!name || name.length > 150) throw new Error("Nama paket layanan tidak valid");
  if (!slug) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 150) throw new Error("Format slug tidak valid");
  if (!Number.isFinite(price) || price < 0) throw new Error("Harga paket tidak valid");

  return {
    name,
    slug,
    category,
    price,
    originalPrice: originalPrice && Number.isFinite(originalPrice) && originalPrice > 0 ? originalPrice : null,
    deliveryTime,
    revisionCount,
    description,
    features,
    isPopular,
    published,
    order,
  };
}

export async function createPackage(data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = packageInput(data);

    const existing = await prisma.developmentPackage.findUnique({
      where: { slug: input.slug },
    });
    if (existing) {
      return { success: false, error: "Slug paket sudah digunakan, gunakan nama atau slug lain." };
    }

    const pkg = await prisma.developmentPackage.create({
      data: input,
    });

    revalidatePath("/admin/packages");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, package: pkg };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePackage(id: string, data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = packageInput(data);

    const existing = await prisma.developmentPackage.findFirst({
      where: {
        slug: input.slug,
        NOT: { id },
      },
    });
    if (existing) {
      return { success: false, error: "Slug paket sudah digunakan oleh paket lain." };
    }

    const pkg = await prisma.developmentPackage.update({
      where: { id },
      data: input,
    });

    revalidatePath("/admin/packages");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, package: pkg };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePackage(id: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    await prisma.developmentPackage.delete({
      where: { id },
    });

    revalidatePath("/admin/packages");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function togglePopularPackage(id: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const current = await prisma.developmentPackage.findUnique({
      where: { id },
      select: { isPopular: true },
    });
    if (!current) throw new Error("Paket tidak ditemukan");

    const updated = await prisma.developmentPackage.update({
      where: { id },
      data: { isPopular: !current.isPopular },
    });

    revalidatePath("/admin/packages");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, isPopular: updated.isPopular };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function togglePublishedPackage(id: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const current = await prisma.developmentPackage.findUnique({
      where: { id },
      select: { published: true },
    });
    if (!current) throw new Error("Paket tidak ditemukan");

    const updated = await prisma.developmentPackage.update({
      where: { id },
      data: { published: !current.published },
    });

    revalidatePath("/admin/packages");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, published: updated.published };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
