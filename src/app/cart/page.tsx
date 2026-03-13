import { CartData } from "@/context/CheckoutContext";
import CartPageClient from "./CartPageClient";

async function getCartData(): Promise<CartData> {
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch cart data");
  return res.json();
}

export default async function CartPage() {
  const cartData = await getCartData();

  return <CartPageClient initialCartData={cartData} />;
}