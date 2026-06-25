"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitReview } from "@/app/actions/review";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await submitReview(productId, rating, comment);
      if (result.success) {
        setSuccess(true);
        setComment("");
        setRating(5);
      } else {
        setError(result.error || "Gagal mengirim ulasan.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-500 p-4 rounded-lg text-sm text-center">
        Terima kasih! Ulasan Anda telah berhasil dikirim.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background border border-border p-6 rounded-lg space-y-4">
      <h3 className="font-bold text-foreground">Tulis Ulasan</h3>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star 
                className={`w-6 h-6 ${rating >= star ? 'text-primary fill-primary' : 'text-muted'}`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Komentar (Opsional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full bg-card border border-border rounded-md px-4 py-2 text-foreground focus:ring-1 focus:ring-primary"
          placeholder="Bagaimana pengalaman Anda menggunakan produk ini?"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="btn-primary w-full sm:w-auto"
      >
        {loading ? "Mengirim..." : "Kirim Ulasan"}
      </button>
    </form>
  );
}