"use client";

import { useState } from "react";
import { Check, FileCode, Star } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";

export default function ProductTabs({ product, reviews }: { product: any, reviews: any[] }) {
  const [activeTab, setActiveTab] = useState("details");

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-4 h-4 ${rating >= star ? 'text-primary fill-primary' : 'text-muted'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex border-b border-border mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab("details")}
          className={`px-6 py-4 font-bold whitespace-nowrap transition-colors ${activeTab === 'details' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-foreground'}`}
        >
          Item Details
        </button>
        <button 
          onClick={() => setActiveTab("reviews")}
          className={`px-6 py-4 font-bold whitespace-nowrap transition-colors ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-foreground'}`}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      <div className="prose prose-invert max-w-none mb-12">
        {activeTab === "details" && (
          <div className="bg-card border border-border rounded-lg p-8 custom-shadow transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-foreground">Deskripsi Produk</h3>
            <p className="text-muted leading-relaxed whitespace-pre-line mb-6">
              {product.description}
            </p>
            {product.content && (
              <div dangerouslySetInnerHTML={{ __html: product.content }} className="text-muted leading-relaxed mt-4" />
            )}

            <h4 className="text-lg font-bold mt-8 mb-4 text-foreground">Fitur Utama</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {["Clean Code & Well Documented", "Responsive Design", "Easy to Customize", "Free Lifetime Updates"].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted">{feature}</span>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-bold mt-8 mb-4 text-foreground">Apa yang Anda Dapatkan?</h4>
            <div className="space-y-3 bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 text-muted"><FileCode className="w-5 h-5 text-primary" /> Full Source Code (.zip)</div>
              <div className="flex items-center gap-3 text-muted"><FileCode className="w-5 h-5 text-primary" /> Database SQL</div>
              <div className="flex items-center gap-3 text-muted"><FileCode className="w-5 h-5 text-primary" /> Dokumentasi Lengkap (PDF/HTML)</div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-card border border-border rounded-lg p-8 custom-shadow transition-colors duration-300">
            <h3 className="text-xl font-bold mb-6 text-foreground">Ulasan Pelanggan</h3>
            
            <div className="mb-8">
              <ReviewForm productId={product.id} />
            </div>

            <div className="space-y-6 mt-8">
              {reviews.length === 0 ? (
                <p className="text-center text-muted py-8 bg-background rounded-lg border border-border border-dashed">Belum ada ulasan untuk produk ini.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-foreground block">{review.user?.name || "Anonymous User"}</span>
                        <span className="text-xs text-muted">{new Date(review.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    {review.comment && (
                      <p className="text-muted text-sm mt-2 leading-relaxed bg-background p-3 rounded-md border border-border">{review.comment}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}