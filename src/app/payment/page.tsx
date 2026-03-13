"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";

export default function PaymentPage() {
  const router = useRouter();
  const { cartData, shippingAddress } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("upi");

  if (!cartData || !shippingAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Session expired. Please start again.</p>
          <button
            onClick={() => router.push("/cart")}
            className="text-green-600 underline font-medium"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + cartData.shipping_fee - cartData.discount_applied;

  function handlePayment() {
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/success");
    }, 2000);
  }

  const paymentOptions = [
    { id: "upi", label: "UPI", icon: "📱", desc: "Pay via UPI ID or QR code" },
    { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, Rupay" },
    { id: "netbanking", label: "Net Banking", icon: "🏦", desc: "All major banks supported" },
    { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
  ];

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
        <StepIndicator currentStep={3} />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Pay</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Shipping Address Review */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <span>📍</span> Delivering To
                </h3>
                <button
                  onClick={() => router.push("/shipping")}
                  className="text-xs text-green-600 underline font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-gray-800">{shippingAddress.fullName}</p>
                <p>{shippingAddress.doorNo}, {shippingAddress.streetName}</p>
                <p>
                  {shippingAddress.area}
                  {shippingAddress.landmark ? `, Near ${shippingAddress.landmark}` : ""}
                </p>
                <p>{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}</p>
                <p className="mt-1 text-gray-500">
                  {shippingAddress.email} | +91 {shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Order Items Review */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>🛒</span> Order Items
              </h3>
              <div className="space-y-3">
                {cartData.cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.product_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-800">
                      ₹{item.product_price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>💳</span> Payment Method
              </h3>
              <div className="space-y-2">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all
                      ${selectedPayment === option.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-100 hover:border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={selectedPayment === option.id}
                      onChange={() => setSelectedPayment(option.id)}
                      className="accent-green-600"
                    />
                    <span className="text-xl">{option.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{option.label}</p>
                      <p className="text-xs text-gray-500">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24 space-y-4">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Price Details
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{cartData.shipping_fee}</span>
                </div>
                {cartData.discount_applied > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>− ₹{cartData.discount_applied}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-800 text-base">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full text-white font-bold py-4 rounded-xl transition-all shadow-md text-base flex items-center justify-center gap-2
                  ${isProcessing
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 active:scale-95"
                  }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>🔒 Pay Securely ₹{grandTotal}</>
                )}
              </button>

              <p className="text-xs text-center text-gray-400">
                Your payment is 100% secure & encrypted
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/shipping")}
          className="mt-5 text-sm text-green-600 underline font-medium"
        >
          ← Back to Shipping
        </button>
      </div>
    </main>
  );
}