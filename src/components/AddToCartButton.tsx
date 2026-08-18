"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/components/CartContext";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image?: string;
    screenshots?: string;
    category?: { name: string } | null;
    categoryName?: string;
  };
  variant?: "card" | "detail" | "icon";
  className?: string;
}

export default function AddToCartButton({ 
  product, 
  variant = "card",
  className = "" 
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  let image = product.image || "/asset/logorayan.png";
  if (!product.image && product.screenshots) {
    try {
      const parsed = JSON.parse(product.screenshots);
      if (parsed.length > 0) image = parsed[0];
    } catch (e) {}
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image,
      category: product.categoryName || product.category?.name || "Digital Asset",
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleAdd}
        type="button"
        className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center ${
          added
            ? "bg-green-500/20 text-green-500 border-green-500/40"
            : "bg-surface border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/10"
        } ${className}`}
        title={added ? "Tersimpan di Keranjang" : "Tambah ke Keranjang"}
      >
        {added ? <Check className="w-4 h-4 animate-in zoom-in" /> : <ShoppingCart className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === "detail") {
    return (
      <button
        onClick={handleAdd}
        type="button"
        className={`w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer shadow-md ${
          added
            ? "bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.35)]"
            : "border-2 border-primary text-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] hover:-translate-y-0.5"
        } ${className}`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4 text-white animate-in zoom-in" />
            <span>Berhasil Ditambahkan!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>Tambah ke Keranjang</span>
          </>
        )}
      </button>
    );
  }

  // Default "card" variant
  return (
    <button
      onClick={handleAdd}
      type="button"
      className={`w-full py-2 px-3 rounded-lg text-xs font-mono uppercase font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
        added
          ? "bg-green-500/20 text-green-500 border border-green-500/40"
          : "bg-primary text-black hover:opacity-90 shadow-sm"
      } ${className}`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5 animate-in zoom-in" />
          <span>Ditambahkan</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>+ Keranjang</span>
        </>
      )}
    </button>
  );
}