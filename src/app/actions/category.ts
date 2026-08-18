"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";

function categoryInput(data: Record<string, unknown>) {
  const name = typeof data.name === "string" ? data.name.trim() : "";
  let slug = typeof data.slug === "string" ? data.slug.trim().toLowerCase() : "";
  const description = typeof data.description === "string" ? data.description.trim().slice(0, 1000) : null;

  if (!name || name.length > 100) {
    throw new Error("Nama kategori harus diisi (maks 100 karakter)");
  }

  if (!slug) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100) {
    throw new Error("Format slug URL tidak valid");
  }

  return { name, slug, description };
}

export async function createCategory(data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = categoryInput(data);

    // Check duplicate slug
    const existing = await prisma.category.findUnique({
      where: { slug: input.slug },
    });
    if (existing) {
      return { success: false, error: "Slug kategori sudah digunakan, gunakan nama atau slug lain." };
    }

    const category = await prisma.category.create({
      data: input,
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/products/categories");
    revalidatePath("/products");
    revalidatePath("/");

    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = categoryInput(data);

    // Check duplicate slug for other records
    const existing = await prisma.category.findFirst({
      where: {
        slug: input.slug,
        NOT: { id },
      },
    });
    if (existing) {
      return { success: false, error: "Slug kategori sudah digunakan oleh kategori lain." };
    }

    const category = await prisma.category.update({
      where: { id },
      data: input,
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/products/categories");
    revalidatePath("/products");
    revalidatePath("/");

    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    // 1. Disassociate all products from this category to prevent foreign key errors
    await prisma.product.updateMany({
      where: { categoryId: id },
      data: { categoryId: null },
    });

    // 2. Delete the category record
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/products/categories");
    revalidatePath("/products");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
