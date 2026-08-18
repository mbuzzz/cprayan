"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { consumeRateLimit } from "@/lib/rate-limit";

export async function registerUser(data: unknown) {
  try {
    const requestHeaders = await headers();
    const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!consumeRateLimit(`register:ip:${ip}`, 5, 15 * 60 * 1000)) {
      return { success: false, error: "Terlalu banyak percobaan. Coba lagi nanti." };
    }
    if (!data || typeof data !== "object") return { success: false, error: "Data tidak valid" };
    const input = data as Record<string, unknown>;
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const password = typeof input.password === "string" ? input.password : "";
    if (name.length < 2 || name.length > 100 || !/^[^\u0000-\u001F<>]+$/.test(name)) return { success: false, error: "Nama tidak valid" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { success: false, error: "Email tidak valid" };
    if (password.length < 8 || password.length > 128) return { success: false, error: "Password harus 8-128 karakter" };
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER"
      }
    });

    return { success: true, user: { id: user.id, email: user.email } };
  } catch {
    return { success: false, error: "Registrasi gagal" };
  }
}