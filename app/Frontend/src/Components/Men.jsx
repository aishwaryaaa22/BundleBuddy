import React, { useState, useContext } from "react";
import productsData from "./Men.json";
import { createData } from "./Context";
import { createDatatwo } from "./Contexttwo";
import Footer from "./Footer";
import Recommended from "./Recommended";
import Pagination from "./Pagination";
import { CiHeart } from "react-icons/ci";
import './Featured.css';
import { IoColorFilter, IoFilterSharp } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";

function Men() {
  const { addToCart } = useContext(createData);
  const { addToWishlist } = useContext(createDatatwo);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState(5000); // Fixed state shape from array to number
  const [selectedSize, setSelectedSize] = useState("");

  const filteredProducts = productsData.filter((product) => {
    return (
      (category ? product.category === category : true) &&
      (color ? product.color === color : true) &&
      product.price <= priceRange
    );
  });

  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white overflow-x-hidden">
      <div className="second text-center py-6 text-3xl font-bold">MEN</div>
      <Recommended />

      {/* Main Container - Full width matching layout */}
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 px-4 py-6">
        
        {/* Horizontal Top Filter Bar */}
        <div className="w-full bg-white text-black shadow-md rounded-xl p-4 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold border-b lg:border-b-0 pb-2 lg:pb-0 w-full lg:w-auto">
            <IoFilterSharp className="text-xl" />
            <span className="text-lg">Filters</span>
          </div>

          {/* Form Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center items-end gap-4 w-full lg:w-auto grow justify-end">
            {/* Category Filter */}
            <div className="flex flex-col gap-1 w-full lg:w-48">
              <label className="font-bold flex gap-1 items-center text-xs text-gray-700">
                <MdOutlineCategory /> Category
              </label>
              <select
                className="w-full border rounded p-2 bg-gray-50 cursor-pointer text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Shirt">Shirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Lower">Lower</option>
                <option value="Cap">Cap</option>
                <option value="Socks">Socks</option>
              </select>
            </div>

            {/* Color Filter */}
            <div className="flex flex-col gap-1 w-full lg:w-48">
              <label className="font-bold flex gap-1 items-center text-xs text-gray-700">
                <IoColorFilter /> Color
              </label>
              <select
                className="w-full border rounded p-2 bg-gray-50 cursor-pointer text-sm"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">All</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Green">Pink</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-1 w-full lg:w-64">
              <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                <span>PRICE RANGE</span>
                <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded">₹{priceRange}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">0</span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <span className="text-xs text-gray-400">5000</span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setCategory("");
                setColor("");
                setPriceRange(5000);
              }}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm py-2 px-6 rounded-lg transition duration-200 h-[38px] w-full lg:w-auto"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Product Grid - Fullscreen width view */}
       <div className="w-full">
  {/* The grid layout across screen sizes */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 text-white w-full">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div
          data-aos="fade-up"
          data-aos-delay={product.aosDelay}
          key={product.id}
          /* Clean layout wrapper with no card background to match the reference image */
          className="flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1 relative"
        >
          <Link to={`/product/${product.id}`} className="block group grow flex-col">
            {/* Aspect ratio changed to 3:4 portrait style */}
            <div className="w-full overflow-hidden bg-neutral-700 aspect-3/4 shrink-0">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={product.imgUrl}
                alt={product.name}
              />
            </div>
            
            {/* Card Typography Layout */}
            <div className="mt-3 px-1 grow flex flex-col justify-start">
              <h3 className="text-xl font-bold tracking-wide text-white">
                {product.name}
              </h3>
              <p className="text-sm font-medium text-slate-400 mt-0.5">{product.color}</p>
              <p className="font-bold text-lg mt-1 text-white">₹{product.price}</p>
            </div>
          </Link>

          {/* Exact pill-shaped "ADD" button matching the screenshot */}
          <div className="text-box mt-4 w-full flex justify-start z-10">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-[#434d5e] hover:bg-[#4f5b6e] text-white font-bold py-2 px-10 text-center rounded-full text-sm shadow-md tracking-wider transition-colors inline-block duration-200"
            >
              ADD
            </a>
          </div>
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-400 py-20 text-lg">
        No products found.
      </p>
    )}
  </div>
</div>
      </div>

      <div className="flex items-center justify-center py-8">
        <Pagination />
      </div>
      <Footer />
    </div>
  );
}

export default Men;