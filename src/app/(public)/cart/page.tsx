import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartPage() {
  // Mock cart items
  const cartItems = [
    {
      id: "1",
      title: "Rayan POS System Premium - Full Source Code",
      category: "Scripts & Code",
      price: 499000,
      image: "/asset/logorayan.png",
    },
    {
      id: "2",
      title: "CorporatePro - Next.js Business Template",
      category: "Themes",
      price: 249000,
      image: "/asset/logorayan.png",
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.11; // 11% PPN
  const total = subtotal + tax;

  return (
    <div className="bg-[#0a0b0c] min-h-screen pb-20 relative overflow-hidden">
      {/* Modern Glow Blobs */}
      <div className="glow-blob bg-primary/10 w-[600px] h-[600px] top-0 left-0 -translate-x-1/4"></div>

      <PageHeader title="KERANJANG BELANJA" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="card-hover overflow-hidden">
              <div className="p-6 border-b border-[rgba(255,255,255,0.05)] hidden sm:grid grid-cols-12 text-sm font-bold text-muted uppercase tracking-wider">
                <div className="col-span-8">Produk</div>
                <div className="col-span-3 text-right">Harga</div>
                <div className="col-span-1 text-right">Aksi</div>
              </div>
              
              <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center group hover:bg-[#121415]/80 transition-colors">
                    <div className="col-span-8 flex items-center gap-5 w-full">
                      <div className="w-24 h-24 bg-card/80 backdrop-blur-md rounded-[15px] border border-[rgba(255,255,255,0.05)] flex items-center justify-center p-3 flex-shrink-0 group-hover:border-primary/30 transition-all custom-shadow group-hover:shadow-[0_0_15px_rgba(198,161,91,0.2)]">
                        <Image src={item.image} alt={item.title} width={60} height={60} className="opacity-80 drop-shadow-[0_0_8px_rgba(198,161,91,0.3)] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <div className="inline-block px-2.5 py-1 rounded-[6px] bg-[#121415] border border-[rgba(255,255,255,0.05)] text-[10px] text-primary mb-2 font-bold tracking-wider uppercase">{item.category}</div>
                        <h3 className="font-bold text-lg leading-snug hover:text-primary transition-colors cursor-pointer text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="col-span-3 text-left sm:text-right w-full sm:w-auto font-bold text-lg golden-text">
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                    
                    <div className="col-span-1 text-right w-full sm:w-auto">
                      <button className="text-red-400 hover:text-white p-2.5 bg-red-500/10 hover:bg-red-500 rounded-[10px] transition-all shadow-sm">
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <Link href="/products" className="text-muted hover:text-primary text-sm flex items-center gap-2 transition-colors font-medium">
                Lanjut Belanja
              </Link>
              <button className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">
                Kosongkan Keranjang
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="card-hover p-8 sticky top-28">
              <h3 className="text-xl font-bold mb-6 border-b border-[rgba(255,255,255,0.05)] pb-4 text-white">Ringkasan Pesanan</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted">
                  <span>Subtotal ({cartItems.length} item)</span>
                  <span className="text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Pajak (PPN 11%)</span>
                  <span className="text-white">Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Biaya Pengiriman</span>
                  <span className="text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded text-xs">Gratis (Digital)</span>
                </div>
              </div>
              
              <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 mb-8 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-white">Total</span>
                  <span className="font-bold text-2xl golden-text drop-shadow-[0_0_10px_rgba(198,161,91,0.2)]">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <Link href="/checkout" className="btn-primary w-full py-4 text-center flex justify-center items-center gap-2 group shadow-[0_0_15px_rgba(198,161,91,0.2)] hover:shadow-[0_0_25px_rgba(198,161,91,0.4)]">
                Lanjut ke Pembayaran <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
                <ShieldCheck className="w-4 h-4 text-green-400" /> Transaksi Aman & Terenkripsi
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
