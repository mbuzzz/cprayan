"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "@/lib/email";

export async function requestPasswordReset(email: string) {
  try {
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 254) {
      return { success: false, error: "Format email tidak valid" };
    }

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    // To prevent user enumeration, we still return success even if user not found
    if (!user) {
      return { success: true, message: "Jika email terdaftar, instruksi pemulihan telah dikirimkan." };
    }

    // Invalidate any previous unused tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: cleanEmail },
    });

    // Generate secure token (64 hex characters)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    await prisma.passwordResetToken.create({
      data: {
        email: cleanEmail,
        token,
        expiresAt,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await sendPasswordResetEmail(cleanEmail, token, appUrl);

    return {
      success: true,
      message: "Instruksi pemulihan kata sandi telah dikirimkan ke email Anda.",
    };
  } catch (error: any) {
    console.error("Password reset request error:", error);
    return { success: false, error: error.message || "Terjadi kesalahan sistem" };
  }
}

export async function resetPasswordWithToken(data: { token: string; email: string; password: string }) {
  try {
    const { token, email, password } = data;
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    
    if (!token || !cleanEmail || !password || password.length < 8) {
      return { success: false, error: "Kata sandi baru minimal 8 karakter." };
    }

    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetRecord || resetRecord.email !== cleanEmail) {
      return { success: false, error: "Tautan reset kata sandi tidak valid atau telah kedaluwarsa." };
    }

    if (resetRecord.usedAt) {
      return { success: false, error: "Tautan reset kata sandi ini sudah pernah digunakan." };
    }

    if (new Date() > resetRecord.expiresAt) {
      return { success: false, error: "Tautan reset kata sandi telah kedaluwarsa (berlaku 1 jam)." };
    }

    // Hash the new password with bcrypt (salt rounds 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and mark token as used
    await prisma.$transaction([
      prisma.user.update({
        where: { email: cleanEmail },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { token },
        data: { usedAt: new Date() },
      }),
    ]);

    return { success: true, message: "Kata sandi berhasil diperbarui. Silakan login kembali." };
  } catch (error: any) {
    console.error("Password reset submit error:", error);
    return { success: false, error: error.message || "Gagal memperbarui kata sandi" };
  }
}
