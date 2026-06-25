"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShieldCheck, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartContext";

export default function CartClient() {
  const { items, removeFromCart, clearCart, cartTotal } = useCart();
  
  const tax = cartTotal * 0.11; // 11% PPN
  const grandTotal = cartTotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Keranjang Anda Kosong</h2>
        <p className="text-muted mb-8 max-w-md mx-auto">Anda belum menambahkan produk digital apapun ke dalam keranjang. Silakan eksplorasi produk kami.</p>
        <Link href="/products" className="btn-primary inline-flex">
          Eksplorasi Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Product List */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl overflow-hidden custom-shadow transition-colors duration-300">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
              <h2 className="text-lg font-bold text-foreground">Produk ({items.length})</h2>
              <button 
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-400 font-medium transition-colors"
              >
                Kosongkan Keranjang
              </button>
            </div>
            
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:bg-background/30 transition-colors">
                  <div className="w-32 h-24 bg-background border border-border rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      width={100} 
                      height={80} 
                      className="object-contain w-full h-full"
                    />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">{item.category}</span>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 leading-snug">
                      <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted">Lisensi Regular • Dukungan 6 Bulan</p>
                  </div>
                  
                  <div className="flex flex-col items-center sm:items-end justify-between min-h-full gap-4">
                    <p className="text-xl font-bold golden-text whitespace-nowrap">Rp {item.price.toLocaleString('id-ID')}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-sm text-muted hover:text-red-500 transition-colors p-2 rounded-md hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 sticky top-24 custom-shadow transition-colors duration-300">
            <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Ringkasan Pesanan</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted">
                <span>Subtotal ({items.length} item)</span>
                <span className="font-medium text-foreground">Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Pajak (11%)</span>
                <span className="font-medium text-foreground">Rp {tax.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total Keseluruhan</span>
                <span className="text-2xl font-bold golden-text">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Note: In a real app we'd pass the cart items to checkout. For now we use the multi-item checkout logic or pass the first item ID */}
            <Link 
              href={`/checkout${items.length === 1 ? `?product=${items[0].id}` : ''}`} 
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(198,161,91,0.3)]"
            >
              Lanjut ke Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            
            <div className="mt-6 flex items-start gap-3 bg-green-50 dark:bg-green-500/5 p-4 rounded-lg border border-green-100 dark:border-green-500/20">
              <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-green-700 dark:text-green-500 mb-1">Transaksi Aman</h4>
                <p className="text-xs text-green-600/80 dark:text-green-400/80 leading-relaxed">
                  Setiap pembelian digital dilindungi oleh sistem keamanan kami. Akses seumur hidup.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}