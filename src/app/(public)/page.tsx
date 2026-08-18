import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export const revalidate = 0;

export default async function Home() {
  // 1. Fetch site settings directly from database
  let settings: { key: string; value: string }[] = [];
  try {
    settings = await prisma.siteSetting.findMany();
  } catch (e) {
    console.error("Failed to fetch settings from database:", e);
  }

  // 2. Fetch real products from database
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { published: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  // 3. Fetch real categories from database
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      take: 8,
      orderBy: { name: "asc" },
    });
  } catch (e) {
    console.error("Failed to fetch categories:", e);
  }

  // 4. Fetch featured and recent projects from database
  let featuredProject: any = null;
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      take: 6,
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" }
      ],
    });
    featuredProject = projects.find((p) => p.featured) || projects[0] || null;
  } catch (e) {
    console.error("Failed to fetch projects:", e);
  }

  // 5. Fetch real services from database
  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      where: { published: true },
      take: 6,
      orderBy: { order: "asc" },
    });
  } catch (e) {
    console.error("Failed to fetch services:", e);
  }

  return (
    <HomeClient
      products={products}
      categories={categories}
      featuredProject={featuredProject}
      projects={projects}
      services={services}
      settings={settings}
    />
  );
}
