"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { sanitizeRichText } from "@/lib/sanitize-html";

function projectInput(data: Record<string, unknown>) {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const slug = typeof data.slug === "string" ? data.slug.trim() : "";
  if (!title || title.length > 160) throw new Error("Judul project tidak valid");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 160) throw new Error("Slug project tidak valid");
  return {
    title, slug,
    description: typeof data.description === "string" ? data.description.slice(0, 5000) : "",
    content: sanitizeRichText(data.content), published: data.published === true, featured: data.featured === true,
    screenshots: typeof data.screenshots === "string" ? data.screenshots.slice(0, 10000) : "[]",
    techStack: typeof data.techStack === "string" ? data.techStack.slice(0, 5000) : "[]",
  };
}

export async function createProject(data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = projectInput(data);
    const project = await prisma.project.create({ data: input });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, data: Record<string, unknown>) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    const input = projectInput(data);
    const project = await prisma.project.update({
      where: { id },
      data: input
    });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${input.slug}`);
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}