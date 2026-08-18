"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { sanitizeRichText } from "@/lib/sanitize-html";

function productInput(data: Record<string, unknown>) {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const slug = typeof data.slug === "string" ? data.slug.trim() : "";
  const price = typeof data.price === "string" || typeof data.price === "number" ? Number(data.price) : NaN;
  const originalPrice = (typeof data.originalPrice === "string" && data.originalPrice.trim()) || typeof data.originalPrice === "number"
    ? Number(data.originalPrice)
    : null;
  if (!title || title.length > 160) throw new Error("Judul produk tidak valid");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 160) throw new Error("Slug produk tidak valid");
  if (!Number.isFinite(price) || price < 0 || price > 1_000_000_000) throw new Error("Harga produk tidak valid");
  return {
    title, slug, price, originalPrice: originalPrice && Number.isFinite(originalPrice) && originalPrice > 0 ? originalPrice : null,
    ...(typeof data.categoryId === "string" ? { categoryId: data.categoryId } : {}),
    description: typeof data.description === "string" ? data.description.slice(0, 5000) : "",
    content: sanitizeRichText(data.content), version: typeof data.version === "string" ? data.version.slice(0, 40) : "",
    license: typeof data.license === "string" && data.license.trim() ? data.license.trim().slice(0, 100) : null,
    filePath: typeof data.filePath === "string" ? data.filePath.slice(0, 500) : null,
    published: data.published === true, featured: data.featured === true,
    screenshots: typeof data.screenshots === "string" ? data.screenshots.slice(0, 10000) : "[]",
    demoLinks: typeof data.demoLinks === "string" ? data.demoLinks.slice(0, 10000) : "[]",
  };
}

export async function createProduct(data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = productInput(data);
    const product = await prisma.product.create({
      data: {
        ...input,
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = productInput(data);
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...input,
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${input.slug}`);
    revalidatePath("/");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}