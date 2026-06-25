import PageHeader from "@/components/PageHeader";
import CartClient from "./CartClient";

export default function CartPage() {
  return (
    <div className="pb-20">
      <PageHeader 
        title="KERANJANG BELANJA" 
        subtitle="Kelola produk digital yang ingin Anda beli" 
      />
      <CartClient />
    </div>
  );
}
