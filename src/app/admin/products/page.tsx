import { prisma } from "@/lib/prisma";
import ProductListClient from "./ProductListClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, categoryCount] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.count(),
  ]);

  return <ProductListClient initialProducts={products} categoryCount={categoryCount} />;
}