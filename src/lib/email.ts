import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Mendapatkan konfigurasi SMTP dinamis dari database SiteSetting (jika diatur oleh admin)
 * atau fallback ke environment variables (.env).
 */
export async function getSmtpTransporter() {
  let host = process.env.SMTP_HOST || "";
  let port = Number(process.env.SMTP_PORT || 587);
  let user = process.env.SMTP_USER || "";
  let pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "";
  let secure = process.env.SMTP_SECURE === "true" || port === 465;
  let from = process.env.SMTP_FROM || "PT. Rayan Smart Kreatif <noreply@rayan.web.id>";

  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_secure", "smtp_from"]
        }
      }
    });

    for (const s of settings) {
      if (s.key === "smtp_host" && s.value) host = s.value;
      if (s.key === "smtp_port" && s.value) port = Number(s.value) || 587;
      if (s.key === "smtp_user" && s.value) user = s.value;
      if (s.key === "smtp_pass" && s.value) pass = s.value;
      if (s.key === "smtp_secure" && s.value) secure = s.value === "true";
      if (s.key === "smtp_from" && s.value) from = s.value;
    }
  } catch (e) {
    console.warn("Could not load SMTP settings from database, using env fallback:", e);
  }

  if (!host || !user) {
    // Return null if SMTP is not yet configured
    return { transporter: null, from };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return { transporter, from };
}

/**
 * Mengirim email transaksional dengan fallback logging jika SMTP belum dikonfigurasi.
 */
export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const { transporter, from } = await getSmtpTransporter();

    if (!transporter) {
      console.log(`📧 [SMTP SIMULATION / NOT CONFIGURED]`);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Preview:`, text || html.slice(0, 250));
      return { success: true, messageId: `simulated-${Date.now()}` };
    }

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ""),
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("❌ [SMTP Send Error]:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Template Email Mewah & Standar Industri: Reset Kata Sandi
 */
export async function sendPasswordResetEmail(email: string, resetToken: string, appUrl: string) {
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  const year = new Date().getFullYear();

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pemulihan Kata Sandi Akun</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090a; color: #f3f4f6; margin: 0; padding: 24px 12px; }
        .wrapper { max-width: 580px; margin: 0 auto; background-color: #121417; border: 1px solid #23272f; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(180deg, #1a1d22 0%, #121417 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid #23272f; }
        .badge { display: inline-block; padding: 4px 12px; background-color: rgba(242, 202, 80, 0.12); color: #f2ca50; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-radius: 99px; border: 1px solid rgba(242, 202, 80, 0.25); margin-bottom: 12px; }
        .content { padding: 36px 32px; font-size: 14px; line-height: 1.7; color: #9ca3af; }
        .highlight { color: #ffffff; font-weight: 600; }
        .btn-container { text-align: center; margin: 32px 0; }
        .btn { background: linear-gradient(135deg, #f2ca50 0%, #c6a15b 100%); color: #0a0b0c !important; font-weight: 800; font-size: 14px; text-decoration: none; padding: 15px 36px; border-radius: 12px; display: inline-block; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 20px rgba(242, 202, 80, 0.3); }
        .alert-box { background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 14px 18px; font-size: 12px; color: #fca5a5; margin: 24px 0; line-height: 1.5; }
        .fallback-box { background-color: #0c0d0f; border: 1px solid #1f2329; border-radius: 10px; padding: 12px 16px; font-size: 11px; word-break: break-all; color: #d1d5db; font-family: monospace; }
        .footer { background-color: #0a0b0d; padding: 24px; text-align: center; font-size: 11px; color: #6b7280; border-top: 1px solid #1f2329; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="badge">Keamanan Akun</div>
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 800;">Pemulihan Kata Sandi</h1>
        </div>
        
        <div class="content">
          <p style="margin-top: 0;">Halo,</p>
          <p>
            Kami menerima permintaan pengaturan ulang kata sandi untuk akun <span class="highlight">${email}</span> di platform resmi <strong>PT. Rayan Smart Kreatif</strong>.
          </p>
          <p>
            Untuk membuat kata sandi baru yang aman, silakan klik tombol di bawah ini:
          </p>
          
          <div class="btn-container">
            <a href="${resetUrl}" target="_blank" class="btn">Atur Ulang Kata Sandi</a>
          </div>

          <div class="alert-box">
            ⏱️ <strong>Penting:</strong> Tautan ini hanya berlaku selama <strong>1 jam (60 menit)</strong> demi menjaga keamanan akun Anda.
          </div>

          <p style="font-size: 12px; margin-bottom: 8px;">
            Jika tombol di atas tidak dapat diklik, salin dan buka tautan berikut langsung pada peramban (browser) Anda:
          </p>
          <div class="fallback-box">
            ${resetUrl}
          </div>

          <p style="font-size: 12px; margin-top: 24px; color: #6b7280;">
            *Jika Anda tidak pernah meminta pemulihan kata sandi ini, Anda dapat mengabaikan email ini dengan aman. Kata sandi akun Anda tidak akan berubah.
          </p>
        </div>

        <div class="footer">
          <p style="margin: 0 0 6px 0;">&copy; ${year} <strong>PT. RAYAN SMART KREATIF</strong>. Seluruh hak cipta dilindungi.</p>
          <p style="margin: 0; color: #4b5563;">Gedung Perkantoran Sudirman, Jakarta Pusat • support@rayan.web.id</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
PEMULIHAN KATA SANDI - PT. RAYAN SMART KREATIF

Halo,

Kami menerima permintaan pengaturan ulang kata sandi untuk akun ${email}.
Buka tautan berikut di browser Anda untuk membuat kata sandi baru (Berlaku 1 Jam):

${resetUrl}

Jika Anda tidak pernah meminta pengaturan ulang ini, abaikan pesan ini.

© ${year} PT. Rayan Smart Kreatif
  `.trim();

  return sendEmail({
    to: email,
    subject: "🔐 Pemulihan Kata Sandi Akun - PT. Rayan Smart Kreatif",
    html,
    text,
  });
}

/**
 * Template Email: Notifikasi Pesan Kontak Baru ke Admin
 */
export async function sendContactNotificationToAdmin(adminEmail: string, data: { name: string; email: string; phone?: string; subject?: string; message: string }) {
  const html = `
    <div style="font-family: sans-serif; background-color: #0c0d0e; color: #e5e7eb; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #141618; border: 1px solid #272a30; border-radius: 16px; padding: 24px;">
        <h2 style="color: #f2ca50; margin-top: 0;">📩 Pesan Baru dari Formulir Kontak</h2>
        <table style="width: 100%; font-size: 14px; color: #d1d5db; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 6px 0; color: #9ca3af; width: 120px;">Nama:</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #9ca3af;">Email:</td><td><a href="mailto:${data.email}" style="color: #f2ca50;">${data.email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #9ca3af;">WhatsApp:</td><td>${data.phone || "-"}</td></tr>
          <tr><td style="padding: 6px 0; color: #9ca3af;">Subjek:</td><td>${data.subject || "Pesan Kontak"}</td></tr>
        </table>
        <div style="background-color: #1c1f24; padding: 16px; border-radius: 8px; border: 1px solid #2e333d; font-size: 14px; line-height: 1.6; color: #e5e7eb;">
          ${data.message.replace(/\n/g, "<br>")}
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `[Kontak Baru] ${data.subject || data.name} - PT. Rayan Smart Kreatif`,
    html,
  });
}
