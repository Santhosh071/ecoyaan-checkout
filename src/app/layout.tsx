import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Eco-friendly checkout flow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <CheckoutProvider>
          {children}
        </CheckoutProvider>
      </body>
    </html>
  );
}