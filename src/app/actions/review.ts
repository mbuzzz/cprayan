"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function submitReview(productId: string, rating: number, comment: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "Anda harus login untuk memberikan ulasan." };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return { success: false, error: "Akun tidak ditemukan." };
    }

    // Check if user has purchased this product and the order is completed
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: user.id,
          orderStatus: 'COMPLETED'
        }
      }
    });

    // Alternatively, check by email if guest checkout was used but they later registered
    const hasPurchasedByEmail = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          customerEmail: user.email,
          orderStatus: 'COMPLETED'
        }
      }
    });

    if (!hasPurchased && !hasPurchasedByEmail) {
      return { success: false, error: "Anda harus membeli produk ini terlebih dahulu untuk memberikan ulasan." };
    }

    // Check if already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId: user.id
      }
    });

    if (existingReview) {
      return { success: false, error: "Anda sudah memberikan ulasan untuk produk ini." };
    }

    await prisma.review.create({
      data: {
        rating,
        comment,
        productId,
        userId: user.id
      }
    });

    // Update Product average rating or let frontend aggregate it (we'll rely on aggregation for now)
    revalidatePath(`/products`);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}