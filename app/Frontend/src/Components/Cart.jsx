import React, { useContext } from "react";
import {
  IoBagHandleOutline,
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import { createData } from "./Context";

function Cart() {
  const { cart, dispatch } = useContext(createData);
  const { increaseQty, decreaseQty, removeFromCart } = useContext(createData);

  const subtotal = cart.reduce((acc, item) => {
    // Dono keys check karein: price (static JSON) aur productPrice (DB)
    const currentPrice = Number(item.price || item.productPrice || 0);
    return acc + (currentPrice * item.qty);
}, 0);
  const shipping = subtotal > 500 || cart.length === 0 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <IoBagHandleOutline size={80} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-indigo-700">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2">Add something to make me happy! </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-bold mb-10 tracking-tight">
        Shopping Bag ({cart.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT: Product List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 pb-6 border-b border-gray-100 items-start"
            >
              {/* Product Image */}
              <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between self-stretch">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-gray-200">
                      {item.name}
                    </h3>

                    <p className="font-bold text-lg">
                     ₹{Number(item.price || item.productPrice || 0).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.color} | Size: M
                  </p>
                </div>

                {/* Controls: Qty and Delete */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 gap-4">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="hover:text-black text-gray-400"
                    >
                      <IoRemoveOutline />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="hover:text-black text-gray-400"
                    >
                      <IoAddOutline />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400  hover:text-red-500 transition-colors"
                  >
                    <IoTrashOutline size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary (Sticky) */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Estimate</span>
                <span className="font-medium text-gray-900">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              <hr className="border-gray-200 my-4" />
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg">
              Proceed to Checkout
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 uppercase tracking-widest">
              Secure Checkout • 100% Original Products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
