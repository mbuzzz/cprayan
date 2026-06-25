"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { registerUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser(formData);

      if (!res.success) {
        setError(res.error || "Gagal mendaftar");
      } else {
        // Auto login after successful registration
        await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('/asset/logorayan.png')] bg-no-repeat bg-center bg-fixed opacity-[0.02] pointer-events-none"></div>
      <div className="glow-blob bg-primary/20 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all"></div>
            <div className="w-16 h-16 relative z-10 mx-auto">
              <Image src="/asset/logorayan.png" alt="Logo" fill className="object-contain" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold mt-6 mb-2 text-foreground">Buat Akun</h1>
          <p className="text-muted">Bergabunglah dengan ribuan kreator lainnya.</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-8 custom-shadow transition-colors duration-300">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted" />
                </div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-3 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="John Doe" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-3 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="anda@email.com" 
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-3 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Minimal 8 karakter" 
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Konfirmasi Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" />
                </div>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-3 text-foreground focus:ring-1 focus:ring-primary transition-colors" 
                  placeholder="Ketik ulang password" 
                  required
                  minLength={8}
                />
              </div>
            </div>
            
            <div className="flex items-start mt-4">
              <input type="checkbox" id="terms" required className="w-4 h-4 mt-1 rounded border-border bg-background accent-primary" />
              <label htmlFor="terms" className="ml-2 text-sm text-muted leading-snug">
                Saya menyetujui <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a> dan <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> yang berlaku.
              </label>
            </div>
            
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex justify-center items-center gap-2 mt-2">
              {loading ? <span className="animate-pulse">Memproses...</span> : <><UserPlus className="w-5 h-5" /> Daftar Sekarang</>}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted">
            Sudah punya akun? <Link href="/login" className="text-primary hover:underline font-bold">Masuk di sini</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
