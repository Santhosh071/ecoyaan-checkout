"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  doorNo: string;
  streetName: string;
  area: string;
  landmark: string;
  pinCode: string;
  city: string;
  state: string;
}

interface CheckoutContextType {
  cartData: CartData | null;
  setCartData: (data: CartData) => void;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartDataState] = useState<CartData | null>(null);
  const [shippingAddress, setShippingAddressState] = useState<ShippingAddress | null>(null);

  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem("ecoyaan_cart");
      const savedAddress = sessionStorage.getItem("ecoyaan_address");
      if (savedCart) setCartDataState(JSON.parse(savedCart));
      if (savedAddress) setShippingAddressState(JSON.parse(savedAddress));
    } catch (e) {
      console.error("Failed to load from sessionStorage", e);
    }
  }, []);

  function setCartData(data: CartData) {
    setCartDataState(data);
    try {
      sessionStorage.setItem("ecoyaan_cart", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }

  function setShippingAddress(address: ShippingAddress) {
    setShippingAddressState(address);
    try {
      sessionStorage.setItem("ecoyaan_address", JSON.stringify(address));
    } catch (e) {
      console.error("Failed to save address", e);
    }
  }

  return (
    <CheckoutContext.Provider
      value={{ cartData, setCartData, shippingAddress, setShippingAddress }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
}