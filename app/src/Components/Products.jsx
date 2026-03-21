import React,{useContext} from "react";
import Data from "./Data.json";
import { createData } from "./Context";

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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5 px-18">
              {Data.map((item) => (
                <div className="shadow-lg flex flex-col h-auto w-full text-sm"  data-aos="fade-up" data-aos-delay={item.aosDelay} key={item.aosDelay}>
                  <img
                    className="w-full h-auto max-w-xs object-cover cursor-pointer"
                    src={item.imgUrl}
                    alt="image loading"
                  />
                  <p className="text-white text-3xl">{item.name}</p>
                  <p>{item.description}</p>
                  <br />
                  <p className="text-white text-2xl ">{item.price}</p>

                  <div className="text-box">
                    <a href="#" onClick={() => addToCart(item)} className="btn btn-white btn-animate py-2">
                      ADD
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
