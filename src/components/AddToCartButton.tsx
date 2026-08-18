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

  // 1. Icon variant (Sleek square button with tooltip)
  if (variant === "icon") {
    return (
      <button
        onClick={handleAdd}
        type="button"
        className={`w-9 h-9 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center flex-shrink-0 ${
          added
            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/40"
            : "bg-surface border-border text-muted hover:border-primary hover:text-primary hover:bg-primary/10"
        } ${className}`}
        title={added ? "Tersimpan di Keranjang" : "Tambah ke Keranjang"}
      >
        {added ? <Check className="w-4 h-4 animate-in zoom-in" /> : <ShoppingCart className="w-4 h-4" />}
      </button>
    );
  }

  // 2. Detail variant (Sidebar purchase button)
  if (variant === "detail") {
    return (
      <button
        onClick={handleAdd}
        type="button"
        className={`w-full py-3 px-5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border ${
          added
            ? "bg-emerald-600/20 text-emerald-500 border-emerald-500/40"
            : "border-border bg-surface text-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
        } ${className}`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4 text-emerald-500 animate-in zoom-in" />
            <span className="font-semibold text-emerald-500">Tersimpan di Keranjang</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 text-primary" />
            <span className="font-semibold">+ Tambah ke Keranjang</span>
          </>
        )}
      </button>
    );
  }

  // 3. Card variant (Compact, balanced card button)
  return (
    <button
      onClick={handleAdd}
      type="button"
      className={`py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer border ${
        added
          ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/40"
          : "bg-surface border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/10"
      } ${className}`}
      title={added ? "Tersimpan di Keranjang" : "Tambah ke Keranjang"}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 animate-in zoom-in" />
          <span>Tersimpan</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5 text-primary" />
          <span>+ Keranjang</span>
        </>
      )}
    </button>
  );
}