import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendOrderDeliveryEmail } from "@/lib/email";

/**
 * Verifikasi signature Svix resmi dari Sumopod Payment Gateway
 */
function verifySvixSignature(
  secret: string,
  svixId: string,
  svixTimestamp: string,
  svixSignature: string,
  rawBody: string
): boolean {
  try {
    const cleanSecret = secret.startsWith("whsec_") ? secret.replace("whsec_", "") : secret;
    const secretBytes = Buffer.from(cleanSecret, "base64");
    const signedContent = `${svixId}.${svixTimestamp}.${rawBody}`;

    const expectedSignature = crypto
      .createHmac("sha256", secretBytes)
      .update(signedContent)
      .digest("base64");

    // svix-signature may contain multiple space-separated "v1,<sig>" values
    const signatures = svixSignature.split(" ").map((s) => {
      const parts = s.split(",");
      return parts.length > 1 ? parts[1] : s;
    });

    return signatures.includes(expectedSignature);
  } catch (err) {
    console.error("Svix Signature Verification Error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    console.log("🔔 [Sumopod Webhook Received Event]:", body?.event_type || body?.status || "Unknown Event");

    // 1. Verifikasi Keamanan Webhook (Svix Signature atau Webhook Token)
    const webhookSecret = process.env.SUMOPOD_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET;
    const webhookToken = process.env.SUMOPOD_WEBHOOK_TOKEN || process.env.WEBHOOK_TOKEN;

    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");
    const receivedToken = request.headers.get("x-webhook-token");

    // Jika secret dikonfigurasi di server, lakukan verifikasi
    if (webhookSecret && svixId && svixTimestamp && svixSignature) {
      const isValid = verifySvixSignature(webhookSecret, svixId, svixTimestamp, svixSignature, rawBody);
      if (!isValid) {
        console.warn("❌ [Sumopod Webhook] Invalid Svix signature rejected!");
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
      }
      console.log("🔒 [Sumopod Webhook] Svix Signature Verified Successfully.");
    } else if (webhookToken && receivedToken) {
      if (receivedToken !== webhookToken) {
        console.warn("❌ [Sumopod Webhook] Invalid X-Webhook-Token rejected!");
        return NextResponse.json({ error: "Invalid webhook token" }, { status: 401 });
      }
      console.log("🔒 [Sumopod Webhook] Webhook Token Verified Successfully.");
    }

    // 2. Tangani Test Event dari Settings Dashboard Sumopod
    const eventType = body.event_type || "";
    if (eventType === "payment.test") {
      console.log("✅ [Sumopod Webhook] Received and verified payment.test event from Sumopod dashboard.");
      return NextResponse.json({ success: true, message: "Test webhook verified" }, { status: 200 });
    }

    // 3. Ekstraksi Data Transaksi
    const eventData = body.data || body;
    const orderId = eventData.order_id || body.order_id || eventData.orderId;
    const paymentStatus = (eventData.status || body.status || "").toLowerCase();
    const amount = Number(eventData.amount || body.amount || 0);
    const paymentMethod = eventData.payment_method || body.payment_method || "QRIS";

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    // Cari pesanan di database
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: orderId },
          { referenceNumber: orderId },
          { id: orderId }
        ]
      },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      console.warn(`⚠️ [Sumopod Webhook] Order not found for id: ${orderId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 4. Proses Status Pembayaran
    const isCompleted = eventType === "payment.completed" || ["completed", "paid", "success", "settled"].includes(paymentStatus);
    const isFailedOrExpired = eventType === "payment.failed" || eventType === "payment.expired" || ["failed", "expired", "cancelled"].includes(paymentStatus);

    if (isCompleted) {
      // Update order menjadi PAID dan COMPLETED (akses download terbuka)
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          orderStatus: "COMPLETED",
          paymentGateway: "sumopod",
          gatewayResponse: JSON.stringify(body),
        }
      });

      if (!order.deliveryEmailSentAt) {
        const delivery = await sendOrderDeliveryEmail(order);
        if (delivery.success) {
          await prisma.order.update({
            where: { id: order.id },
            data: { deliveryEmailSentAt: new Date(), deliveryEmailMessageId: delivery.messageId || null },
          });
        }
      }

      // Catat riwayat verifikasi jika belum tercatat
      const existingVerification = await prisma.paymentVerification.findFirst({
        where: { orderId: order.id }
      });

      if (!existingVerification) {
        await prisma.paymentVerification.create({
          data: {
            orderId: order.id,
            amountReceived: amount > 0 ? amount : order.total,
            paymentMethod: `Sumopod ${paymentMethod.toUpperCase()}`,
            notes: `Auto-verified via Sumopod Webhook (${eventType || paymentStatus})`,
          }
        });
      }

      console.log(`✅ [Sumopod Webhook] Order ${order.orderNumber} successfully marked as PAID & COMPLETED!`);
    } else if (isFailedOrExpired) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: paymentStatus.toUpperCase() || "FAILED",
          orderStatus: "CANCELLED",
          gatewayResponse: JSON.stringify(body),
        }
      });
      console.log(`⚠️ [Sumopod Webhook] Order ${order.orderNumber} marked as CANCELLED (${eventType || paymentStatus})`);
    }

    // Response 200 OK ke server Sumopod
    return NextResponse.json({ received: true, success: true }, { status: 200 });

  } catch (error: any) {
    console.error("❌ [Sumopod Webhook Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
