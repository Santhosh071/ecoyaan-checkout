import Image from "next/image";
import { CartItem as CartItemType } from "@/context/CheckoutContext";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const itemTotal = item.product_price * item.quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={item.image}
          alt={item.product_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 leading-tight">
          {item.product_name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
        <p className="text-sm text-green-600 font-medium mt-1">
          ₹{item.product_price} × {item.quantity}
        </p>
      </div>

      {/* Item Total */}
      <div className="text-right flex-shrink-0">
        <p className="text-base font-bold text-gray-800">₹{itemTotal}</p>
      </div>
    </div>
  );
}