import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Copy, CreditCard, MessageSquare, Package, Receipt, User, ShieldCheck, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import OrderActionButtons from "./OrderActionButtons";

export const revalidate = 0;

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { 
          product: {
            include: { category: true }
          }
        }
      },
      user: true,
      verifications: true
    }
  });

  if (!order) notFound();

  return (
    <div className="pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/orders" className="p-2 rounded-md bg-card border border-border text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-3">
            Pesanan #{order.orderNumber}
            {order.orderStatus === 'COMPLETED' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20"><CheckCircle className="w-3 h-3" /> Selesai</span>}
            {order.orderStatus === 'PENDING' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20"><Clock className="w-3 h-3" /> Menunggu Pembayaran</span>}
            {order.orderStatus === 'PAID' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20"><CreditCard className="w-3 h-3" /> Sudah Dibayar</span>}
          </h1>
          <p className="text-sm text-muted">Tanggal: {new Date(order.createdAt).toLocaleString('id-ID')} • Ref: {order.referenceNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <div className="bg-card border border-border rounded-lg p-6 custom-shadow transition-colors duration-300">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Item Pesanan
            </h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-md bg-background border border-border">
                  <div className="w-16 h-16 bg-card border border-border rounded-md flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-muted" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-foreground text-sm">{item.productName}</h3>
                    <p className="text-xs text-muted mt-1">{item.product?.category?.name || "Digital Product"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">Rp {item.productPrice.toLocaleString('id-ID')}</p>
                    <p className="text-xs text-muted mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Pajak (11%)</span>
                <span>Rp {order.tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-foreground pt-3 border-t border-border">
                <span>Total Pembayaran</span>
                <span className="golden-text">Rp {order.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Payment Verification Section */}
          <div className="bg-card border border-border rounded-lg p-6 custom-shadow transition-colors duration-300">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> Status & Verifikasi
            </h2>
            
            {order.orderStatus === 'PENDING' ? (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-6 text-center">
                <Clock className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Menunggu Pembayaran Pelanggan</h3>
                <p className="text-sm text-muted mb-6">Batas waktu: {new Date(order.paymentDeadline).toLocaleString('id-ID')}</p>
                
                <OrderActionButtons orderId={order.id} currentStatus={order.orderStatus} />
              </div>
            ) : order.orderStatus === 'PAID' ? (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-6 text-center">
                <CreditCard className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Pembayaran Diterima</h3>
                <p className="text-sm text-muted mb-6">Silakan proses pengiriman atau selesaikan pesanan.</p>
                
                <OrderActionButtons orderId={order.id} currentStatus={order.orderStatus} />
              </div>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 rounded-md p-6 text-center">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Pesanan Selesai</h3>
                <p className="text-sm text-muted">Produk telah dikirimkan ke pelanggan.</p>
              </div>
            )}
            
            {order.verifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-foreground mb-3">Riwayat Verifikasi</h3>
                <div className="space-y-3">
                  {order.verifications.map(v => (
                    <div key={v.id} className="p-3 bg-background border border-border rounded-md text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold text-green-500">Diverifikasi oleh Admin</span>
                        <span className="text-muted">{new Date(v.verifiedAt).toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-foreground">Nominal: Rp {v.amountReceived.toLocaleString('id-ID')}</p>
                      {v.notes && <p className="text-muted italic mt-1">"{v.notes}"</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Customer Info */}
          <div className="bg-card border border-border rounded-lg p-6 custom-shadow transition-colors duration-300">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Data Pelanggan
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider">Nama Lengkap</p>
                <p className="font-bold text-foreground">{order.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider flex items-center gap-1"><Mail className="w-3 h-3" /> Email</p>
                <p className="text-foreground font-mono text-sm">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider flex items-center gap-1"><Phone className="w-3 h-3" /> Telepon / WhatsApp</p>
                <div className="flex items-center justify-between">
                  <p className="text-foreground font-mono text-sm">{order.customerPhone}</p>
                  <a href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=Halo%20${order.customerName},%20terkait%20pesanan%20${order.orderNumber}...`} target="_blank" className="p-1.5 bg-green-500/10 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors" title="Chat via WhatsApp">
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-card border border-border rounded-lg p-6 custom-shadow transition-colors duration-300">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" /> Info Pembayaran
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider">Metode Pembayaran</p>
                <p className="font-bold text-foreground">
                  {order.paymentMethod === 'manual_whatsapp' ? 'Transfer Manual (WhatsApp)' : order.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider">Nomor Referensi</p>
                <div className="flex items-center gap-2 bg-background border border-border p-2 rounded-md">
                  <code className="text-sm text-foreground flex-grow">{order.referenceNumber}</code>
                  <button className="text-muted hover:text-primary transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}