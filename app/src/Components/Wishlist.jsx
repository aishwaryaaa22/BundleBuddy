import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { createData } from "./Context";

function Wishlist() {
  const { cart } = useContext(createData);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 0;
  return (
    <div>
      <section className=" mx-auto justify-center lg:mt-10 flex-row max-w-full items-center bg-gray-100 rounded-4xl lg:p-6 text-black border-b py-5   ">
        <p className="text-foreground text-black text-center">
          YOUR WISHLIST
          <ul >
            {cart.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap  text-black">
                <div className="ml-6 flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg text-black">
                      {item.name}
                    </p>
                  </div>
                </div>
                <p>{item.price}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg"></div>
                  <p>{item.qty}</p>
                  <div>
                    <MdDelete />
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </p>

        {/* */}
        <section className="mx-auto  px-4 text-black md:max-w-300">
        <div className="">
          <div className="border py-5 px-4 shadow-md text">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 text-black">
              <div className="flex justify-between ">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between ">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-xl font-bold text-gray-400">
                <span>Total</span>
                <span>{(subtotal + shipping).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-300 hover:text-black transition-colors active:scale-95">
              Proceed to Checkout
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Free shipping on orders over 500
            </p>
          </div>
        </div>
        </section>
      </section>
    </div>
  );
}

export default Wishlist;
