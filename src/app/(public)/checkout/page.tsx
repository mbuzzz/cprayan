import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import CheckoutClient from "./CheckoutClient";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function CheckoutPage({ searchParams }: { searchParams: { product?: string } }) {
  const { product: productId } = await searchParams;
  let product = null;

  if (productId) {
    product = await prisma.product.findUnique({
      where: { id: productId }
    });
  }

  return (
    <div className="pb-20">
      <PageHeader 
        title="CHECKOUT" 
        subtitle="Selesaikan pembayaran Anda untuk mulai mengunduh aset digital" 
      />
      <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading...</div>}>
        <CheckoutClient initialProduct={product} />
      </Suspense>
    </div>
  );
}
