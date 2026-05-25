import React, { useContext } from "react";
import "./Featured.css";
import Data from "./Data.json";
import Cart from "./Cart";
import { useState } from "react";
import { createData } from "./Context";
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
      <div className="columns-1 two">
        <div className="second"> FEATURED</div>
      </div>
      <div className="columns-1 bg-slate-950 h-200 p-10">
        <div className="flex gap-8 p-14">
          {Data.map((product) => (
            <div key={product.id}>
              <div className="shadow-lg flex flex-col h-auto w-full text-sm">
                 <Link to={`/product/${product.id}`}>
                  <img
                    className="w-full h-auto max-w-xs object-cover cursor-pointer"
                    src={product.imgUrl}
                    alt="image loading"
                  />
                  <p className="text-white text-3xl">{product.name}</p>
                  <p>{product.description}</p>
                  <br />
                  <p className="text-white text-xl ">₹{product.price}</p>
                </Link>
                <div className="text-box">
                  <a
                    href="#"
                    onClick={() => addToCart(product)}
                    className="btn btn-white btn-animate py-2"
                  >
                    Add
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;
