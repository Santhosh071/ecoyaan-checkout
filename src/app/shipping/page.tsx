"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout, ShippingAddress } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

type FormErrors = Partial<Record<keyof ShippingAddress, string>>;

export default function ShippingPage() {
  const router = useRouter();
  const { setShippingAddress, cartData } = useCheckout();

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    doorNo: "",
    streetName: "",
    area: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!form.doorNo.trim()) newErrors.doorNo = "Door / Flat No is required";
    if (!form.streetName.trim()) newErrors.streetName = "Street name is required";
    if (!form.area.trim()) newErrors.area = "Area / Locality is required";

    if (!form.pinCode.trim()) {
      newErrors.pinCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(form.pinCode)) {
      newErrors.pinCode = "Enter a valid 6-digit PIN code";
    }

    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "Please select a state";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingAddress]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setShippingAddress(form);
    router.push("/payment");
  }

  function inputClass(field: keyof ShippingAddress) {
    return `w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all ${
      errors[field]
        ? "border-red-400 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
    }`;
  }

  if (!cartData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <button onClick={() => router.push("/cart")} className="text-green-600 underline font-medium">
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <h1 className="text-xl font-bold text-green-700">Ecoyaan</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <StepIndicator currentStep={2} />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Address</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} noValidate>
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">

                {/* ── CONTACT DETAILS ── */}
                <p className="text-xs font-semibold text-green-700 uppercase tracking-widest">
                  Contact Details
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" name="fullName" value={form.fullName}
                    onChange={handleChange} placeholder="e.g. Sam"
                    className={inputClass("fullName")}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="e.g. sam@email.com"
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg">
                      +91
                    </span>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange} placeholder="10-digit number" maxLength={10}
                      className={`flex-1 border rounded-r-lg px-4 py-3 text-sm outline-none transition-all ${
                        errors.phone
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* ── DELIVERY ADDRESS ── */}
                <p className="text-xs font-semibold text-green-700 uppercase tracking-widest pt-2">
                  Delivery Address
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Door / Flat No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="doorNo" value={form.doorNo}
                      onChange={handleChange} placeholder="e.g. 4B / 12"
                      className={inputClass("doorNo")}
                    />
                    {errors.doorNo && <p className="text-red-500 text-xs mt-1">{errors.doorNo}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="streetName" value={form.streetName}
                      onChange={handleChange} placeholder="e.g. Anna Salai"
                      className={inputClass("streetName")}
                    />
                    {errors.streetName && <p className="text-red-500 text-xs mt-1">{errors.streetName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area / Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" name="area" value={form.area}
                    onChange={handleChange} placeholder="e.g. T. Nagar"
                    className={inputClass("area")}
                  />
                  {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landmark{" "}
                    <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text" name="landmark" value={form.landmark}
                    onChange={handleChange} placeholder="e.g. Near Spencer Plaza"
                    className={inputClass("landmark")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="pinCode" value={form.pinCode}
                      onChange={handleChange} placeholder="6-digit PIN" maxLength={6}
                      className={inputClass("pinCode")}
                    />
                    {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="city" value={form.city}
                      onChange={handleChange} placeholder="e.g. Chennai"
                      className={inputClass("city")}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state" value={form.state} onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all bg-white ${
                      errors.state
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    }`}
                  >
                    <option value="">Select your state</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>

              </div>

              <div className="flex gap-3 mt-5">
                <button
                  type="button" onClick={() => router.push("/cart")}
                  className="flex-1 border-2 border-green-600 text-green-600 font-semibold py-3 rounded-xl hover:bg-green-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-2 w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md"
                >
                  Continue to Payment →
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-3">
                Order Summary
              </h3>
              <div className="space-y-2">
                {cartData.cartItems.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2">{item.product_name}</span>
                    <span className="font-medium text-gray-800 flex-shrink-0">
                      ₹{item.product_price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>₹{cartData.cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0) + cartData.shipping_fee}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}