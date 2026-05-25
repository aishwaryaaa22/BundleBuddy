import React, { useState ,useContext} from "react";
import Top from "./Top.json";
import { FaStar } from "react-icons/fa";
import { createData } from "./Context";

function TopProducts() {
   const { addToCart } = useContext(createData);
  
  return (
    <div>
      <div className="  mt-10 mb-10">
        <div className="">
          <div className=" text-center p-10">
            <h2 className=" text-blue-300" data-aos="fade-up">
              Top Rated Products for you
            </h2>
            <h1 className="text-3xl font-bold" data-aos="fade-up">
              BEST PRODUCTS
            </h1>
            <p className="text-xs text-gray-400 " data-aos="fade-up">
              Buy the top rated products and get discounts upto 5%
            </p>
          </div>
          {/*body section*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-20 md:gap-25 p-12 ">
            {Top.map((item) => (
              <div
                data-aos="zoom-in"
                className="rounded-2xl bg-white hover:bg-black hover:text-white relative shadow-xl duration-300 group max-w-300"
              >
                <div className="">
                  <img
                    src={item.imgUrl}
                    className="h-75  max-w-140  mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                    alt="loading"
                  />
                </div>
                <div className="text-center ]">
                  <div className="w-full flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-black">
                      {item.name}
                    </h1>
                    <h3 className=" text-gray-400 hover:text-white duration-300 text-sm">
                      {item.description}
                    </h3>
                  </div>
                  </div>
                <div className="flex  justify-center items-center p-8">
                  <a href="#" onClick={() => addToCart(item)} className="btn btn-white btn-animate ">
                    ADD
                  </a>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
