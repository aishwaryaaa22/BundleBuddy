import React, { useContext } from "react";
import "./Featured.css";
import Data from "./Data.json";
import Cart from "./Cart";
import { useState } from "react";
import { createData } from "./Context";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
//import AutoPopup from "./Popupaddtocart";

function Featured() {
  const { addToCart } = useContext(createData);
  // const [count, setCount] = useState(0);
  //const [cart, setCart] = useState([]);

  //const handleAdd = (product) => {
  //  setCount(count + 1);
  // setCart([...cart, product]);

  //const handleRemove = () => {
  // if (count > 0) {
  //  setCount(count - 1);
  //  setItem(count - 1 === 0 ? null : product);
  //}
  // };

  return (
    <div>
      <div className="w-full text-center sm:text-left px-4 sm:px-8 md:px-14 mt-8">
        <div className="second text-xl sm:text-xl md:text-5xl font-black text-white tracking-widest uppercase"> FEATURED</div>
      </div>
      <div className="w-full bg-slate-950 min-h-screen py-20 px-4 sm:px-8 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {Data.map((product) => (
            <div key={product.id}>
              <div className="shadow-lg bg-white/5 p-4 rounded-2xl flex flex-col justify-between h-full w-full text-sm">
                 <Link to={`/product/${product.id}`}>
                  <img
                    className="w-full h-auto max-w-xs object-cover cursor-pointer"
                    src={product.imgUrl}
                    alt="image loading"
                  />
                  <p className="text-white text-xl sm:text-2xl font-bold mt-3 line-clamp-1">{product.name}</p>
                  <p>{product.description}</p>
                  <br />
                  <p className="text-white text-xl ">₹{product.price}</p>
                </Link>
                <div className="text-box">
                  <a
                    href="#"
                    onClick={() => addToCart(product)}
                    className="btn btn-white btn-animate py-2 "
                  >
                    Add
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
       <div className=" flex justify-center mb-10">
              <button
                type="submit"
                className="bg-[#e4edfe] hover:bg-[#4f5b6e] flex justify-center items-center gap-2 text-black font-bold py-3 px-10 rounded-full text-sm shadow-md tracking-wider transition-colors duration-200 cursor-pointer"
              >
                EXPLORE MORE<FaArrowRight/>
              </button>
            </div>
    </div>
  );
}

export default Featured;
