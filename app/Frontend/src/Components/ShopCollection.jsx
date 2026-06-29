import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../assets/CAP.png";
import Image2 from "../assets/MAIN.png";
import Image3 from "../assets/aboutimg.png";
import "./Shop.css";
import Products from "./Products";
import TopProducts from "./TopProducts";
import Banner from "./Banner";
import Footer from "./Footer";
import Email from "./Email";

const ImageList = [
  {
     id: 2,
    img: Image2,
    title: "Upto 10% on Woman's clothing",
    description:
      "Buy the latest accessories in our collection and get upto 50% discount",
  },
  {
    id: 3,
    img: Image3,
    title: "Upto 10% on Man's clothing",
    description:
      "Buy the latest accessories in our collection and get upto 50% discount",
   
  },
  {
     id: 1,
    img: Image1,
    title: "Upto 50% on all accessories",
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
      
<div className="relative overflow-hidden min-h-125 sm:min-h-150 lg:max-h-180 w-full bg-gray-100 flex items-center justify-center">
  
  <div className="h-full w-[150%] sm:w-[120%] lg:w-250 bg-black absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-10"></div>
  
  <div className="container px-4 py-8 md:py-12">
    <Slider {...settings}>
      {ImageList.map((data) => (
        <div key={data.id} className="outline-none">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-100 md:min-h-125">
            
      
            <div className="flex flex-col gap-4 text-center md:text-left order-2 md:order-1 flex-1 max-w-xl relative z-10">
              <h1
                className="text-4xl text-black sm:text-5xl lg:text-6xl font-bold leading-tight"
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
              >
                {data.title}
              </h1>
              <p
                className="text-sm md:text-base text-gray-600"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
              >
                {data.description}
              </p>
              <div
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="300"
              >
                <button className="btn btn-white btn-animate py-3 px-6 rounded-full w-fit mx-auto md:mx-0 font-semibold shadow-md">
                  Order Now
                </button>
              </div>
            </div>

            {/* Right Content (Image Centered Vertically) */}
            <div className="w-full h-full aspect-4/4 overflow-hidden  relative">
              <img
                src={data.img}
                alt={data.title}
                className='w-full h-full object-cover object-top'
                style={{ display: 'block', margin: 'auto' }}
              />
            </div>

          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>

      <TopProducts />
      <Products />
      <Banner />
      <Email />
      <Footer />
    </div>
  );
}

export default ShopCollection;
