import { prisma } from "@/lib/prisma";
import ProductForm from "../../create/ProductForm";
import { notFound } from "next/navigation";

export default async function AdminEditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } })
  ]);

  if (!product) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Edit Produk</h1>
        <p className="text-sm text-muted">Perbarui informasi produk digital {product.title}.</p>
      </div>

      <div className="bg-card/80 backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-[20px] p-6 custom-shadow">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  );
}