"use server";

import { prisma } from "@/lib/prisma";
import { sendContactNotificationToAdmin } from "@/lib/email";

function sanitizeText(str: unknown, maxLen = 5000): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLen).replace(/<[^>]*>?/gm, "");
}

export async function submitContactMessage(formData: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  try {
    const name = sanitizeText(formData.name, 100);
    const email = typeof formData.email === "string" ? formData.email.trim().toLowerCase() : "";
    const phone = sanitizeText(formData.phone, 30);
    const subject = sanitizeText(formData.subject, 150);
    const message = sanitizeText(formData.message, 5000);

    if (!name || name.length < 2) throw new Error("Nama minimal 2 karakter.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      throw new Error("Format email tidak valid.");
    }
    if (!message || message.length < 5) throw new Error("Isi pesan minimal 5 karakter.");

    // Save message to database
    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        status: "UNREAD",
      },
    });

    // Fetch admin destination email from settings
    const adminEmailSetting = await prisma.siteSetting.findUnique({
      where: { key: "contact_notification_email" },
    });
    const destinationEmail = adminEmailSetting?.value || process.env.ADMIN_EMAIL || "admin@rayansmartkreatif.id";

    // Dispatch email notification via SMTP
    await sendContactNotificationToAdmin(destinationEmail, {
      name,
      email,
      phone,
      subject,
      message,
    });

    return {
      success: true,
      message: "Pesan Anda telah berhasil dikirim! Tim kami akan segera merespons.",
      id: savedMessage.id,
    };
  } catch (error: any) {
    console.error("Contact message submission error:", error);
    return { success: false, error: error.message || "Gagal mengirimkan pesan" };
  }
}
