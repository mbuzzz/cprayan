"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, Send, CheckCircle2, MessageSquare, ShieldCheck, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      // Simulate API call for password reset request
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memproses permintaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 relative overflow-hidden transition-colors duration-300">
      <div className="glow-blob bg-primary/15 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none fixed"></div>
      
      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all"></div>
            <div className="w-16 h-16 relative z-10 mx-auto">
              <Image src="/asset/logorayan.png" alt="Logo" fill sizes="64px" className="object-contain" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
            Lupa Kata Sandi?
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Masukkan alamat email yang terdaftar pada akun Anda untuk menerima tautan pemulihan kata sandi.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow space-y-6">
          
          {submitted ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-lg text-foreground">Permintaan Terkirim!</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Jika email <strong className="text-foreground">{email}</strong> terdaftar di sistem kami, instruksi pemulihan kata sandi telah dikirimkan ke kotak masuk Anda.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border text-left space-y-2 text-xs text-muted">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <KeyRound className="w-4 h-4 text-primary" /> Bantuan Lebih Lanjut
                </div>
                <p className="leading-relaxed">
                  Tidak menerima email? Periksa folder Spam/Junk Anda atau hubungi admin support kami melalui WhatsApp.
                </p>
                <a
                  href={`https://wa.me/6285226117387?text=${encodeURIComponent(
                    `Halo Admin Rayan, saya membutuhkan bantuan pemulihan kata sandi untuk email akun: ${email}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline font-bold font-mono pt-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Chat Dukungan WhatsApp
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { setSubmitted(false); setEmail(""); }}
                  className="text-xs text-muted hover:text-foreground font-mono transition-colors"
                >
                  Kirim ke email lain &rarr;
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-mono">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                  Alamat Email Akun
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-muted" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-medium" 
                    placeholder="nama@email.com" 
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-3.5 text-xs uppercase font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">Mengirim Permintaan...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Instruksi Reset</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
            <Link 
              href="/login" 
              className="text-muted hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Login
            </Link>
            <Link 
              href="/register" 
              className="text-primary hover:underline font-bold"
            >
              Daftar Akun Baru
            </Link>
          </div>

        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-muted font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Sistem Keamanan Akun PT. Rayan Smart Kreatif</span>
        </div>

      </div>
    </div>
  );
}
