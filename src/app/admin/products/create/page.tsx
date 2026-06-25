import { prisma } from "@/lib/prisma";
import ProductForm from "./ProductForm";

export default async function AdminCreateProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Tambah Produk Baru</h1>
        <p className="text-sm text-muted">Buat produk digital baru untuk ditambahkan ke marketplace.</p>
      </div>

      <div className="bg-card/80 backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-[20px] p-6 custom-shadow">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}