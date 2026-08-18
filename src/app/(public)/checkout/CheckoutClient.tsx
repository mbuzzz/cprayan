"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Check, 
  CreditCard, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  QrCode, 
  Zap, 
  Lock, 
  Building2, 
  Mail, 
  Phone, 
  User, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { createDirectOrder } from "@/app/actions/order";

export default function CheckoutClient({ initialProduct }: { initialProduct: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"sumopod" | "manual_whatsapp">("sumopod");
  const [paymentChannel, setPaymentChannel] = useState<"QRIS" | "VA">("QRIS");
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialProduct) return;

    if (!agreeTerms) {
      setError("Silakan centang persetujuan Syarat & Ketentuan Lisensi sebelum melanjutkan pembayaran.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const result = await createDirectOrder(initialProduct.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }, paymentMethod);
      
      if (result.success) {
        if (paymentMethod === "sumopod" && result.paymentUrl) {
          // Redirect to Sumopod Payment Gateway page
          window.location.href = result.paymentUrl;
        } else {
          // Manual WhatsApp or Fallback
          router.push(`/checkout/manual-payment?orderId=${result.orderId}&ref=${result.referenceNumber}`);
        }
      } else {
        setError(result.error || "Terjadi kendala saat memproses pesanan. Silakan periksa kembali data Anda.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi sistem.");
      setLoading(false);
    }
  };

  // Calculations
  const subtotal = initialProduct ? initialProduct.price : 0;
  const tax = subtotal * 0.11; // 11% PPN Standar Indonesia
  const total = subtotal + tax;

  if (!initialProduct) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-primary mx-auto opacity-60" />
        <h2 className="text-xl font-bold text-foreground">Produk Tidak Ditemukan</h2>
        <p className="text-xs text-muted">Produk yang Anda pilih tidak tersedia atau keranjang belanja kosong.</p>
        <Link href="/products" className="btn-primary inline-block px-6 py-2.5 text-xs uppercase font-bold tracking-wider rounded-lg">
          Jelajahi Katalog Produk
        </Link>
      </div>
    );
  }

  let image = "/asset/logorayan.png";
  try {
    const parsed = JSON.parse(initialProduct.screenshots);
    if (parsed.length > 0) image = parsed[0];
  } catch(e) {}

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 transition-colors duration-300">
      
      {/* Merchant Official Header */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 custom-shadow">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-surface border border-primary/20 flex items-center justify-center p-1.5 flex-shrink-0">
            <Image src="/asset/logorayan.png" alt="Rayan Logo" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-sm text-foreground">PT. RAYAN SMART KREATIF</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Check className="w-2.5 h-2.5" /> Verified Merchant
              </span>
            </div>
            <p className="text-[11px] text-muted font-mono">
              Official Digital Marketplace & Software Engineering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted font-mono">
          <div className="flex items-center gap-1.5 text-primary">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <span>•</span>
          <span>IDR Currency</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Form Steps */}
        <div className="lg:col-span-2 space-y-8">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Customer & Billing Info */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow space-y-5 transition-colors duration-300">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-base font-bold text-foreground font-heading flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> 1. Data Pembeli & Penerima Lisensi
              </h2>
              <span className="text-[11px] font-mono text-muted">* Wajib Diisi</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                  Nama Lengkap Pembeli *
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium" 
                  placeholder="Nama Lengkap Sesuai Identitas" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-primary" /> Alamat Email Aktif *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium" 
                    placeholder="nama@email.com" 
                    required
                  />
                  <p className="text-[10px] text-muted mt-1 font-mono">
                    Akses unduhan dan lisensi digital akan dikirimkan ke email ini.
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-primary" /> Nomor WhatsApp Aktif *
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground font-mono focus:outline-none focus:border-primary transition-colors" 
                    placeholder="081234567890" 
                    required
                  />
                  <p className="text-[10px] text-muted mt-1 font-mono">
                    Untuk notifikasi instan status pembayaran & bantuan teknis.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-muted" /> Nama Perusahaan / Instansi</span>
                  <span className="text-[10px] text-muted font-normal">(Opsional)</span>
                </label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium" 
                  placeholder="Misal: PT. Maju Bersama Digital" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Channels (Standard Industry) */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow space-y-5 transition-colors duration-300">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-base font-bold text-foreground font-heading flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" /> 2. Pilih Kanal Pembayaran
              </h2>
              <span className="text-[11px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Konfirmasi Otomatis
              </span>
            </div>
            
            <div className="space-y-4">
              {/* Option A: Sumopod Gateway QRIS (Active & Recommended) */}
              <div 
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  paymentMethod === "sumopod"
                    ? "bg-primary/5 border-primary shadow-[0_0_25px_rgba(242,202,80,0.15)]"
                    : "bg-surface border-border hover:border-primary/50"
                }`}
                onClick={() => setPaymentMethod("sumopod")}
              >
                <div className="absolute top-0 right-0 bg-primary text-black text-[9px] font-bold font-mono px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">
                  Direkomendasikan • Instan
                </div>

                <div className="flex items-start gap-3.5">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "sumopod"} 
                    onChange={() => setPaymentMethod("sumopod")}
                    className="w-4 h-4 accent-primary mt-1" 
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground text-sm font-heading">
                        Payment Gateway Otomatis (QRIS & E-Wallet)
                      </h3>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      Pindai satu QR Code dari aplikasi m-Banking atau E-Wallet mana pun. Pembayaran terverifikasi dalam hitungan detik.
                    </p>

                    {/* Channel Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {["QRIS", "BCA", "Mandiri", "BRI", "BNI", "GoPay", "OVO", "DANA", "ShopeePay"].map((badge) => (
                        <span key={badge} className="px-2 py-0.5 rounded bg-background border border-border text-[10px] font-mono font-bold text-foreground">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Option B: Manual WhatsApp Transfer */}
              <div 
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  paymentMethod === "manual_whatsapp"
                    ? "bg-primary/5 border-primary shadow-[0_0_25px_rgba(242,202,80,0.15)]"
                    : "bg-surface border-border hover:border-primary/50"
                }`}
                onClick={() => setPaymentMethod("manual_whatsapp")}
              >
                <div className="flex items-start gap-3.5">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === "manual_whatsapp"} 
                    onChange={() => setPaymentMethod("manual_whatsapp")}
                    className="w-4 h-4 accent-primary mt-1" 
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground text-sm font-heading">
                        Transfer Manual Bank via WhatsApp CS
                      </h3>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      Bagi Anda yang ingin transfer manual langsung via rekening perusahaan dengan pendampingan tim customer service kami.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Terms & No-Refund Policy Compliance */}
          <div className="bg-card border border-border rounded-2xl p-6 custom-shadow space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary mt-0.5"
                required
              />
              <span className="text-xs text-muted leading-relaxed">
                Saya menyatakan data yang diisi sudah benar dan menyetujui{" "}
                <Link href="/about" target="_blank" className="text-primary font-bold hover:underline">
                  Syarat & Ketentuan Lisensi Digital
                </Link>{" "}
                serta memahami bahwa produk digital yang telah dibeli & diunduh tidak dapat dibatalkan atau dikembalikan (*Digital Goods No Refund Policy*).
              </span>
            </label>
          </div>

        </div>

        {/* Right Column - Order Summary & Trust Badges */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 custom-shadow space-y-5 transition-colors duration-300">
            <h2 className="text-base font-bold text-foreground border-b border-border pb-3 font-heading">
              Ringkasan Transaksi
            </h2>
            
            {/* Product Item Box */}
            <div className="space-y-3 pb-3">
              <div className="flex gap-3 items-center">
                <div className="w-14 h-14 bg-surface rounded-xl border border-border flex items-center justify-center flex-shrink-0 p-1.5">
                  <Image src={image} alt="Thumb" width={40} height={40} className="object-contain max-h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-snug">
                    {initialProduct.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-muted">
                      {initialProduct.license || "Standard License"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-border text-xs font-mono">
              <div className="flex justify-between text-muted">
                <span>Harga Produk</span>
                <span className="text-foreground font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>PPN 11% (Pajak)</span>
                <span className="text-foreground font-semibold">Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-border">
                <span className="text-foreground font-bold text-sm">Total Bayar</span>
                <span className="golden-text font-bold text-lg">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading || !agreeTerms} 
              className="btn-primary w-full py-3.5 text-xs uppercase font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="animate-pulse">Menghubungkan Gateway...</span>
              ) : (
                <>
                  <span>Bayar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            
            {/* Compliance Guarantee Badges */}
            <div className="pt-2 space-y-2.5 text-[11px] text-muted font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Garansi Akses File Digital Instan</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Transaksi Terenkripsi SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted flex-shrink-0" />
                <span>Batas Waktu Bayar 24 Jam</span>
              </div>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}