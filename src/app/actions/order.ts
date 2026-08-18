"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { requireAdmin } from "@/lib/require-admin";
import { createSumopodPayment } from "@/lib/sumopod";

function customerInput(data: { name: string; email: string; phone: string }) {
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  if (name.length < 2 || name.length > 120 || /[<>]/.test(name)) throw new Error("Nama customer tidak valid");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new Error("Email customer tidak valid");
  if (!/^[0-9+()\-\s]{8,30}$/.test(phone)) throw new Error("Nomor telepon tidak valid");
  return { name, email, phone };
}

export async function createDirectOrder(
  productId: string, 
  customerData: { name: string; email: string; phone: string },
  paymentMethod: "sumopod" | "manual_whatsapp" = "sumopod"
) {
  try {
    if (!/^[a-zA-Z0-9_-]{1,100}$/.test(productId)) throw new Error("Product tidak valid");
    const customer = customerInput(customerData);
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error("Product not found");

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const referenceNumber = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const tax = product.price * 0.11; // 11% PPN
    const total = product.price + tax;
    
    // Generate secure download token
    const downloadToken = crypto.randomBytes(32).toString('hex');

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const order = await prisma.order.create({
      data: {
        orderNumber,
        referenceNumber,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        subtotal: product.price,
        tax,
        total,
        orderStatus: "PENDING",
        paymentMethod: paymentMethod === "sumopod" ? "sumopod_qris" : "manual_whatsapp",
        paymentGateway: paymentMethod === "sumopod" ? "sumopod" : "manual",
        paymentDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        items: {
          create: [{
            productId: product.id,
            productName: product.title,
            productPrice: product.price,
            quantity: 1,
            subtotal: product.price,
            downloadToken: downloadToken,
          }]
        }
      }
    });

    // If Payment Gateway Sumopod selected, request payment URL from Sumopod
    if (paymentMethod === "sumopod") {
      const sumopodRes = await createSumopodPayment({
        orderId: order.orderNumber,
        amount: total,
        currency: "IDR",
        expiresInHours: 24,
        successReturnUrl: `${appUrl}/checkout/success?order_id=${order.orderNumber}`,
        cancelReturnUrl: `${appUrl}/checkout/cancel?order_id=${order.orderNumber}`,
        paymentMethodTypeCode: "QRIS",
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      });

      if (sumopodRes.success) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentId: sumopodRes.paymentId,
            paymentUrl: sumopodRes.paymentUrl,
            qrCodeUrl: sumopodRes.qrCodeUrl,
            gatewayResponse: JSON.stringify(sumopodRes.rawResponse),
          }
        });

        return {
          success: true,
          orderId: order.id,
          orderNumber: order.orderNumber,
          referenceNumber: order.referenceNumber,
          paymentUrl: sumopodRes.paymentUrl,
          qrCodeUrl: sumopodRes.qrCodeUrl,
          gateway: "sumopod",
        };
      } else {
        console.warn("Sumopod Payment Request failed, fallback to direct checkout page:", sumopodRes.error);
        return {
          success: true,
          orderId: order.id,
          orderNumber: order.orderNumber,
          referenceNumber: order.referenceNumber,
          warning: sumopodRes.error,
          gateway: "manual",
        };
      }
    }

    return { 
      success: true, 
      orderId: order.id, 
      orderNumber: order.orderNumber,
      referenceNumber: order.referenceNumber,
      gateway: "manual",
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createCartOrder(
  items: Array<{ id: string; quantity: number }>,
  customerData: { name: string; email: string; phone: string },
  paymentMethod: "sumopod" | "manual_whatsapp" = "sumopod"
) {
  try {
    if (!items || items.length === 0) throw new Error("Keranjang belanja kosong");
    const customer = customerInput(customerData);

    // Fetch real product details from DB (Anti-tampering)
    const productIds = items.map(i => i.id);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, published: true }
    });

    if (dbProducts.length === 0) throw new Error("Produk dalam keranjang tidak ditemukan");

    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = dbProducts.find(p => p.id === item.id);
      if (!product) continue;

      const qty = Math.max(1, Math.min(item.quantity, 10));
      const itemSubtotal = product.price * qty;
      subtotal += itemSubtotal;

      const downloadToken = crypto.randomBytes(32).toString("hex");

      orderItemsData.push({
        productId: product.id,
        productName: product.title,
        productPrice: product.price,
        quantity: qty,
        subtotal: itemSubtotal,
        downloadToken,
      });
    }

    const tax = subtotal * 0.11;
    const total = subtotal + tax;
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const referenceNumber = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const order = await prisma.order.create({
      data: {
        orderNumber,
        referenceNumber,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        subtotal,
        tax,
        total,
        orderStatus: "PENDING",
        paymentMethod: paymentMethod === "sumopod" ? "sumopod_qris" : "manual_whatsapp",
        paymentGateway: paymentMethod === "sumopod" ? "sumopod" : "manual",
        paymentDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
        items: {
          create: orderItemsData
        }
      }
    });

    if (paymentMethod === "sumopod") {
      const sumopodRes = await createSumopodPayment({
        orderId: order.orderNumber,
        amount: total,
        currency: "IDR",
        expiresInHours: 24,
        successReturnUrl: `${appUrl}/checkout/success?order_id=${order.orderNumber}`,
        cancelReturnUrl: `${appUrl}/checkout/cancel?order_id=${order.orderNumber}`,
        paymentMethodTypeCode: "QRIS",
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      });

      if (sumopodRes.success) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentId: sumopodRes.paymentId,
            paymentUrl: sumopodRes.paymentUrl,
            qrCodeUrl: sumopodRes.qrCodeUrl,
            gatewayResponse: JSON.stringify(sumopodRes.rawResponse),
          }
        });

        return {
          success: true,
          orderId: order.id,
          orderNumber: order.orderNumber,
          referenceNumber: order.referenceNumber,
          paymentUrl: sumopodRes.paymentUrl,
          qrCodeUrl: sumopodRes.qrCodeUrl,
          gateway: "sumopod",
        };
      }
    }

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      referenceNumber: order.referenceNumber,
      gateway: "manual",
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function verifyOrder(orderId: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        orderStatus: 'COMPLETED',
        paymentStatus: 'PAID',
      }
    });
    
    // Add verification record
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (order) {
      await prisma.paymentVerification.create({
        data: {
          orderId,
          amountReceived: order.total,
          paymentMethod: order.paymentMethod,
          notes: "Verified manually by admin",
        }
      });
    }
    
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function completeOrder(orderId: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        orderStatus: 'COMPLETED',
        paymentStatus: 'PAID',
      }
    });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function cancelOrder(orderId: string) {
  if (!await requireAdmin()) return { success: false, error: "Unauthorized" };
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        orderStatus: 'CANCELLED',
        paymentStatus: 'CANCELLED',
      }
    });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}