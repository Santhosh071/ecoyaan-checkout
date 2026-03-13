"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartData, useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";

export default function CartPageClient({ initialCartData }: { initialCartData: CartData }) {
  const router = useRouter();
  const { setCartData } = useCheckout();

  // Hydrate global context with SSR data
  useEffect(() => {
    setCartData(initialCartData);
  }, [initialCartData, setCartData]);

  const subtotal = initialCartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <h1 className="text-xl font-bold text-green-700">Ecoyaan</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={1} />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-700 mb-2">
                {initialCartData.cartItems.length} Items
              </h3>

              {initialCartData.cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>

            {/* Eco Badge */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">♻️</span>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Eco-Friendly Products
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  All items in your cart are sustainably sourced and plastic-free.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary + CTA */}
          <div className="lg:col-span-1 space-y-4">
            <OrderSummary
              subtotal={subtotal}
              shippingFee={initialCartData.shipping_fee}
              discount={initialCartData.discount_applied}
            />

            <button
              onClick={() => router.push("/shipping")}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold py-4 rounded-xl transition-all duration-150 shadow-md text-base"
            >
              Proceed to Checkout →
            </button>

            <p className="text-xs text-center text-gray-400">
              🔒 Secure checkout powered by Ecoyaan
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}