"use client";

import { useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, KeyRound } from "lucide-react";
import { resetPasswordWithToken } from "@/app/actions/auth-reset";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await resetPasswordWithToken({ token, email, password });
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?reset=success");
        }, 2000);
      } else {
        setError(res.error || "Gagal mengatur ulang kata sandi.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center space-y-4 custom-shadow">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Tautan Tidak Valid</h2>
          <p className="text-xs text-muted">
            Tautan reset kata sandi tidak lengkap atau salah. Silakan ajukan permohonan reset kata sandi baru.
          </p>
          <Link href="/forgot-password" className="btn-primary inline-block px-6 py-2.5 text-xs font-mono uppercase font-bold rounded-xl">
            Minta Tautan Baru
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 relative overflow-hidden transition-colors duration-300">
      <div className="glow-blob bg-primary/15 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none fixed"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block relative group">
            <div className="w-14 h-14 relative z-10 mx-auto">
              <Image src="/asset/logorayan.png" alt="Logo" fill sizes="56px" className="object-contain" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground font-heading">
            Atur Kata Sandi Baru
          </h1>
          <p className="text-xs text-muted">
            Untuk akun: <strong className="text-foreground">{email}</strong>
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 custom-shadow space-y-6">
          {success ? (
            <div className="text-center space-y-4 py-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">Kata Sandi Berhasil Diperbarui!</h3>
              <p className="text-xs text-muted">
                Mengarahkan Anda ke halaman login dalam beberapa detik...
              </p>
              <Link href="/login" className="btn-primary inline-block px-6 py-2.5 text-xs font-mono uppercase font-bold rounded-xl">
                Login Sekarang
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-mono">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                  Kata Sandi Baru *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-muted" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Minimal 8 karakter"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-foreground mb-1.5 font-mono">
                  Konfirmasi Kata Sandi Baru *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-muted" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ulangi kata sandi baru"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-xs uppercase font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer mt-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{loading ? "Menyimpan..." : "Simpan Kata Sandi Baru"}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
