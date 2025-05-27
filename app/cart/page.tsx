"use client";

import { useCart } from "@/app/context/cart-context";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex-1 space-y-8 bg-pink-50 dark:bg-gray-900">
      <Navbar />

      {cart.length === 0 ? (
        <div className="text-center mt-10">Your cart is empty</div>
      ) : (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold">Your Cart</h1>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p>Price: USD {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.title)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Order Summary */}
          <div className="mt-8 border-t pt-6 space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-md transition-colors"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
