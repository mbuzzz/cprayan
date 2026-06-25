"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image || "/asset/logorayan.png",
      category: product.categoryName || product.category?.name || "Digital",
      quantity: 1
    });
    alert("Produk ditambahkan ke keranjang!");
  };

  return (
    <button 
      onClick={handleAdd}
      className="btn-secondary w-full py-3 mb-3 flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" /> Add to Cart
    </button>
  );
}