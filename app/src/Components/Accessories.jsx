import { useContext } from "react";
import React, { useState } from "react";
import productsData from "./Accessories.json";
import Footer from "./Footer";
import { createData } from "./Context";
import { createDatatwo } from "./Contexttwo";
import Pagination from "./Pagination";
import Recommended from "./Recommended";
import { CiHeart } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { IoColorFilter } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
function Women() {
  const { addToCart } = useContext(createData);
    const { addToWishlist } = useContext(createDatatwo);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState([5000]);
  const [selectedSize, setSelectedSize] = useState("");

  const filteredProducts = productsData.filter((product) => {
    return (
      (category ? product.category === category : true) &&
      (color ? product.color === color : true) &&
      product.price <= priceRange
    );
  });
  return (
    <div>
      <div className="second">ACCESSORIES</div>
      <Recommended />

      <div className="flex flex-col md:flex-row gap-6 p-6 text-black">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl  gap-1 items-center flex font-semibold mb-4"><IoFilterSharp/>Filters</h2>

          {/* Category Filter */}
          <div className="mb-4">
            <label className=" font-bold mb-1 flex gap-1 items-center"><MdOutlineCategory/>Category</label>
            <select
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Cap">Cap</option>
              <option value="Socks">Socks</option>
              <option value="Bag">Bag</option>
            </select>
          </div>

          {/* Color Filter */}
          <div className="mb-4">
            <label className="  font-bold mb-1 flex gap-1 items-center"><IoColorFilter/>Color</label>
            <select
              className="w-full border rounded p-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="">All</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Black">Black</option>
              <option value="Beige">Beige</option>
              <option value="White">White</option>
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Price Range
              </h3>
              <span className="text-xs font-mono font-bold">{priceRange}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>5000</span>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setCategory("");
                setColor("");
                setPriceRange([5000]);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-20 px-20 p-8 text-white">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                data-aos="fade-up"
                data-aos-delay={product.aosDelay}
                key={product.id}
                className="shadow-lg flex flex-col h-auto w-full text-sm hover:shadow-lg transition cursor-pointer"
              >
                <Link to={`/product/${product.id}`}>
                <img
                  className="w-full h-70 max-w-xs object-cover cursor-pointer"
                  src={product.imgUrl}
                  alt="image loading"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <p className="text-sm text-slate-300">{product.color}</p>
                <p className="font-bold">{product.price}</p>
                </Link>
                <div className="flex">
                  <div>
                    <a
                      href="cart"
                      onClick={() => addToCart(item)}
                      className=" btn-white btn-animate py-2"
                    >
                      ADD
                    </a>
                  </div>
                  <div>
                    <a
                      href="wishlist"
                      onClick={() => addToWishlist(item)}
                      className="text-blue-400 text-3xl hover:text-blue-200 bg-blue-200"
                    >
                      <CiHeart />
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white">
              No products found.
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center p-10 mt-5">
        <Pagination />
      </div>
      <Footer />
    </div>
  );
}

export default Women;
