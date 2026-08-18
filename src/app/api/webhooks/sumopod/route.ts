import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    console.log("🔔 [Sumopod Webhook Received]:", body);

    // Sumopod webhook payload fields
    const orderId = body.order_id || body.orderId || body.data?.order_id;
    const paymentStatus = (body.status || body.payment_status || body.data?.status || "").toUpperCase();
    const amount = Number(body.amount || body.data?.amount || 0);
    const paymentMethod = body.payment_method || body.payment_method_type_code || body.data?.payment_method || "QRIS";

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    // Find the corresponding order by orderNumber or referenceNumber or id
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: orderId },
          { referenceNumber: orderId },
          { id: orderId }
        ]
      },
      include: { items: true }
    });

    if (!order) {
      console.warn(`[Sumopod Webhook] Order not found for id: ${orderId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if status represents successful payment
    const isPaid = ["PAID", "SUCCESS", "COMPLETED", "SETTLED", "SUCCESSFUL"].includes(paymentStatus);

    if (isPaid) {
      // Update order to PAID and COMPLETED
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          orderStatus: "COMPLETED",
          paymentGateway: "sumopod",
          gatewayResponse: JSON.stringify(body),
        }
      });

      // Create PaymentVerification record if not already recorded
      const existingVerification = await prisma.paymentVerification.findFirst({
        where: { orderId: order.id }
      });

      if (!existingVerification) {
        await prisma.paymentVerification.create({
          data: {
            orderId: order.id,
            amountReceived: amount > 0 ? amount : order.total,
            paymentMethod: `Sumopod ${paymentMethod}`,
            notes: `Auto-verified via Sumopod Webhook (Status: ${paymentStatus})`,
          }
        });
      }

      console.log(`✅ [Sumopod Webhook] Order ${order.orderNumber} successfully marked as PAID & COMPLETED!`);
    } else if (["EXPIRED", "FAILED", "CANCELLED"].includes(paymentStatus)) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: paymentStatus,
          orderStatus: "CANCELLED",
          gatewayResponse: JSON.stringify(body),
        }
      });
      console.log(`⚠️ [Sumopod Webhook] Order ${order.orderNumber} status updated to ${paymentStatus}`);
    }

    return NextResponse.json({ received: true, success: true });
  } catch (error: any) {
    console.error("❌ [Sumopod Webhook Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
