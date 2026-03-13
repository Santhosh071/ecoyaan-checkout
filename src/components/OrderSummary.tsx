interface Props {
  subtotal: number;
  shippingFee: number;
  discount: number;
}

export default function OrderSummary({ subtotal, shippingFee, discount }: Props) {
  const grandTotal = subtotal + shippingFee - discount;

  return (
    <div className="bg-green-50 rounded-xl p-5 space-y-3">
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
          <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
            {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>− ₹{discount}</span>
          </div>
        )}
      </div>

      <div className="border-t border-green-200 pt-3 flex justify-between font-bold text-gray-800 text-base">
        <span>Grand Total</span>
        <span>₹{grandTotal}</span>
      </div>

      <p className="text-xs text-gray-500 text-center pt-1">
        🌱 Your order supports eco-friendly practices
      </p>
    </div>
  );
}