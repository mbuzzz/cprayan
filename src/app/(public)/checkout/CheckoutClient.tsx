"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, CreditCard, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";
import { createDirectOrder } from "@/app/actions/order";

export default function CheckoutClient({ initialProduct }: { initialProduct: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialProduct) return;
    
    setLoading(true);
    setError("");

    try {
      const result = await createDirectOrder(initialProduct.id, formData);
      
      if (result.success) {
        // Redirect to success page with order context
        router.push(`/checkout/manual-payment?orderId=${result.orderId}&ref=${result.referenceNumber}`);
      } else {
        setError(result.error || "Terjadi kesalahan saat membuat pesanan");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculations
  const subtotal = initialProduct ? initialProduct.price : 0;
  const tax = subtotal * 0.11; // 11% PPN
  const total = subtotal + tax;

  if (!initialProduct) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-muted">
        Produk tidak ditemukan atau keranjang kosong.
        <br/><br/>
        <button onClick={() => router.push('/products')} className="btn-primary mt-4">Lihat Produk</button>
      </div>
    );
  }

  let image = "/asset/logorayan.png";
  try {
    const parsed = JSON.parse(initialProduct.screenshots);
    if (parsed.length > 0) image = parsed[0];
  } catch(e) {}

  return (
    <div className="container mx-auto px-4 py-10 transition-colors duration-300">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold mb-2 shadow-sm">
            <Check className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-primary">Produk</span>
        </div>
        
        <div className="flex-1 h-1 bg-primary/30 mx-2 rounded-full relative top-[-10px]">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full"></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center font-bold mb-2 shadow-[0_0_15px_rgba(198,161,91,0.2)]">
            2
          </div>
          <span className="text-xs font-bold text-foreground">Detail & Pembayaran</span>
        </div>
        
        <div className="flex-1 h-1 bg-border mx-2 rounded-full relative top-[-10px]"></div>
        
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-background border border-border text-muted flex items-center justify-center font-bold mb-2">
            3
          </div>
          <span className="text-xs text-muted">Selesai</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md">
              {error}
            </div>
          )}

          {/* Customer Info */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 custom-shadow transition-colors duration-300">
            <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Informasi Pelanggan</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nama Lengkap *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="John Doe" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors" 
                    placeholder="john@example.com" 
                    required
                  />
                  <p className="text-xs text-muted mt-1">Link download akan dikirimkan ke email ini.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nomor WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors" 
                    placeholder="081234567890" 
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 custom-shadow transition-colors duration-300">
            <h2 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Metode Pembayaran</h2>
            
            <div className="space-y-4">
              {/* Manual WhatsApp (Active) */}
              <label className="flex items-start gap-4 p-5 rounded-lg bg-primary/5 border-2 border-primary cursor-pointer transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-bl-md uppercase tracking-wider">
                  Direkomendasikan
                </div>
                <div className="mt-0.5">
                  <input type="radio" name="payment" className="w-5 h-5 accent-primary" defaultChecked />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground text-lg">Manual Transfer (WhatsApp)</h3>
                  </div>
                  <p className="text-sm text-muted">Proses cepat via chat. Bebas biaya admin.</p>
                  
                  <div className="mt-4 bg-background rounded-md p-4 border border-border">
                    <p className="text-sm text-foreground mb-2 font-bold">Cara Pembayaran:</p>
                    <ol className="text-sm text-muted space-y-2 list-decimal list-inside">
                      <li>Selesaikan pesanan Anda di halaman ini.</li>
                      <li>Anda akan diarahkan ke WhatsApp Admin kami.</li>
                      <li>Lakukan transfer sesuai nominal ke rekening yang diberikan Admin.</li>
                      <li>Link download akan diberikan langsung setelah verifikasi (1-5 menit).</li>
                    </ol>
                  </div>
                </div>
              </label>

              {/* Auto Payment (Disabled) */}
              <label className="flex items-start gap-4 p-5 rounded-lg bg-background border border-border cursor-not-allowed opacity-60">
                <div className="mt-0.5">
                  <input type="radio" name="payment" className="w-5 h-5" disabled />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-5 h-5 text-muted" />
                    <h3 className="font-bold text-foreground text-lg">Otomatis (Kartu Kredit / VA)</h3>
                    <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider ml-2">Segera Hadir</span>
                  </div>
                  <p className="text-sm text-muted">Pembayaran instan via Payment Gateway.</p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24 custom-shadow transition-colors duration-300">
            <h2 className="text-lg font-bold mb-4 text-foreground border-b border-border pb-4">Ringkasan Pesanan</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-background rounded-md border border-border flex items-center justify-center flex-shrink-0">
                  <Image src={image} alt="Thumb" width={24} height={24} className="opacity-80 object-contain" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground line-clamp-1">{initialProduct.title}</h4>
                  <p className="text-xs text-muted">Rp {initialProduct.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="text-foreground">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Pajak (11%)</span>
                <span className="text-foreground">Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="golden-text">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 mt-8 flex items-center justify-center gap-2">
              {loading ? <span className="animate-pulse">Memproses...</span> : <>Buat Pesanan <ArrowRight className="w-5 h-5" /></>}
            </button>
            
            <div className="mt-6 bg-green-500/5 border border-green-500/20 rounded-md p-3 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted leading-relaxed">
                Dengan membuat pesanan, Anda menyetujui <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> kami.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}