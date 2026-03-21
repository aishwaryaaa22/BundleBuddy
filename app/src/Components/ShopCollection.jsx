import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../assets/imagefive5.png";
import Image2 from "../assets/imagefour4.png";
import Image3 from "../assets/imageone1.png";
import "./Shop.css";
import Products from "./Products";
import TopProducts from "./TopProducts";
import Banner from "./Banner";

import Footer from "./Footer";
import Email from "./Email";


const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% on all accessories",
    description:
      "Buy the latest accessories in our collection and get upto 50% discount",
  },
  {
    id: 2,
    img: Image2,
    title: "Upto 10% on woman's clothing",
    description:
      "Buy the latest accessories in our collection and get upto 50% discount",
  },
  {
    id: 3,
    img: Image3,
    title: "Upto 10% on man's clothing",
    description:
      "Buy the latest accessories in our collection and get upto 50% discount",
  },
];

function ShopCollection() {
  var settings = {
    dots: false,
    arrows: false,
    speed: 800,
    infinite: true,
    cssEase: "ease-in-out",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div>
      
      <div className="relative overflow-hidden h-60 w-full sm:min-h-120  bg-gray-100 flex justify-center dark:bg-gray-950 dark:text-white duration-200">
        <div className="h-full w-650 bg-black absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {ImageList.map((data) => (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3">
                  <div className="flex flex-col gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm::order-1 relative z-10">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold" data-aos="zoom-out" data-aos-duration="500" data-aos-once="true">
                      {data.title}
                    </h1>
                    <p className="text-sm" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">{data.description}</p>
                    <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="300">
                      <button className="btn btn-white btn-animate py-2 p-5  rounded-full cursor-pointer">
                        Order Now
                      </button>
                    </div>
                  </div>
                  {/*Image*/}
                  <div className="order-1 sm:order-2 flex justify-center ">
                    <div className="relative z-10">
                      <img
                        src={data.img}
                        alt="loading"
                        className="w-300 h-100 sm:h-full sm:w-450 sm:scale-105 lg:scale-120 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      <TopProducts/>
       <Products/>
      <Banner/>
      <Email/>
      <Footer/>
    </div>
  );
}

export default ShopCollection;
