import React,{useContext} from "react";
import Data from "./Data.json";
import { createData } from "./Context";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
function Products() {
  const { addToCart } = useContext(createData);
  console.log(Data);
  return (
    <div>
      <div className="mt-10 mb-12">
        <div className="">
          <div className="text-center mb-8 max-w-600 mx-auto">
            <h2 className=" text-blue-300" data-aos="fade-up">Top Selling Products for you</h2>
            <h1 className="text-2xl font-bold" data-aos="fade-up">PRODUCTS</h1>
            <p className="text-xs text-gray-400 " data-aos="fade-up">
              Buy the top selling products and get discounts upto 5%
            </p>
          </div>
          {/*body section */}
          <div>
            
      <div className="w-full bg-slate-950 min-h-screen py-6 justify-center items-center px-4 sm:px-8 mb-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {Data.map((product) => (
            <div key={product.id}>
              <div className="shadow-lg bg-white/5 p-4 rounded-2xl flex flex-col justify-between h-full w-full text-sm">
                 <Link to={`/product/${product.id}`}>
                  <div className="w-full h-130 sm:h-130 rounded-xl overflow-hidden bg-neutral-900">
                  <img
                    className='w-full h-full object-cover object-top cursor-pointer group-hover:scale-105 transition-transform duration-300'
                    src={product.imgUrl}
                    alt="image loading"
                  />
                  </div>
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
          </div>
        </div>
      </div>
      <div className=" flex justify-center mb-10">
              <button
                type="submit"
                className="bg-[#e4edfe] hover:bg-[#4f5b6e] flex justify-center items-center gap-2 text-black font-bold py-3 px-10 rounded-full text-sm shadow-md tracking-wider transition-colors duration-200 cursor-pointer"
              >
                EXPLORE MORE
                <FaArrowRight />
              </button>
            </div>
    </div>
  );
}

export default Products;
