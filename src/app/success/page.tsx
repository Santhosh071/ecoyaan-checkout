"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

export default function SuccessPage() {
  const router = useRouter();
  const { shippingAddress, cartData } = useCheckout();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setOrderId(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const grandTotal = cartData
    ? cartData.cartItems.reduce(
        (s, i) => s + i.product_price * i.quantity, 0
      ) + cartData.shipping_fee - cartData.discount_applied
    : 0;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div
        className={`max-w-md w-full text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Successful! 🎉
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for choosing eco-friendly products. Your order has been placed.
        </p>

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-left space-y-4 mb-6">

          {/* Order ID */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-sm text-gray-500">Order ID</span>
            <span className="font-bold text-green-700 tracking-wider">#{orderId}</span>
          </div>

          {/* Items */}
          {cartData && (
            <div className="space-y-2">
              {cartData.cartItems.map((item) => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₹{item.product_price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Shipping + Total */}
          {cartData && (
            <div className="text-sm flex justify-between text-gray-500 border-t border-gray-100 pt-2">
              <span>Shipping</span>
              <span>₹{cartData.shipping_fee}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-gray-800 pt-1 border-t border-gray-100">
            <span>Total Paid</span>
            <span className="text-green-700">₹{grandTotal}</span>
          </div>

          {/* Delivery Address */}
          {shippingAddress && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-700 mb-1">📍 Delivering to</p>
              <p className="font-medium text-gray-800">{shippingAddress.fullName}</p>
              <p>{shippingAddress.doorNo}, {shippingAddress.streetName}</p>
              <p>
                {shippingAddress.area}
                {shippingAddress.landmark ? `, Near ${shippingAddress.landmark}` : ""}
              </p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}
              </p>
              <p className="text-gray-500 text-xs pt-1">+91 {shippingAddress.phone}</p>
            </div>
          )}

          {/* Eco Message */}
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-green-700 text-sm font-medium">
              🌱 You just made a greener choice!
            </p>
            <p className="text-green-600 text-xs mt-0.5">
              Every purchase supports a sustainable future.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/cart")}
          className="w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold py-4 rounded-xl transition-all shadow-md"
        >
          🛍️ Continue Shopping
        </button>

        <p className="text-xs text-gray-400 mt-4">
          A confirmation will be sent to{" "}
          <span className="font-medium">{shippingAddress?.email ?? "your email"}</span>
        </p>
      </div>
    </main>
  );
}