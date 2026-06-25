"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDirectOrder(productId: string, customerData: { name: string, email: string, phone: string }) {
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error("Product not found");

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const referenceNumber = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const tax = product.price * 0.11; // 11% PPN
    const total = product.price + tax;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        referenceNumber,
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        subtotal: product.price,
        tax,
        total,
        orderStatus: "PENDING",
        paymentMethod: "manual_whatsapp",
        paymentDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        items: {
          create: [{
            productId: product.id,
            productName: product.title,
            productPrice: product.price,
            quantity: 1,
            subtotal: product.price
          }]
        }
      }
    });

    return { success: true, orderId: order.id, referenceNumber: order.referenceNumber };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function verifyOrder(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: 'PAID' }
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
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: 'COMPLETED' }
    });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function cancelOrder(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: 'CANCELLED' }
    });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}