import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdFindInPage } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import Footer from './Footer';
import Email from './Email';
import Scanner from './Scanner';

function Sectiontwo() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 1000,
    cssEase: "linear"
  };

  return (
    <div>
      <div className="flex flex-col bg-black p-2 px-10 gap-4 h-auto mb-4">
         <h2 class="text-center text-3xl font-bold mb-4 py-2">
          {" "}
          <span class="text-gray-500 items-center font-serif">Process is</span>{" "}
          <span class="text-white">Everything</span>
        </h2>

        <div className="slider-container gap-6">
          <Slider {...settings}>
            <div className=" cursor-pointer transition">
                <div className='column-1 text-white text-5xl'>
                 <MdFindInPage/><br/>
                <p className='text-4xl font-bold'>Explore</p>
                <p className='text-xl'>Discover the latest all of all the collections and explore according to your interests.
                </p>
                </div>
            </div>
             <div className="cursor-pointer transition">
                 <div className='column-1 text-white text-5xl'>
                 <FaCartShopping/><br/>
                <p className='text-4xl font-bold'>Save & Commit</p>
                <p className='text-xl'>Add all the items to the cart for purchasing.They "Commit to Buy." The app holds a pre-authorization on their card but doesn't charge them yet.
                </p>
                </div>
            </div>
             <div className="cursor-pointer transition">
                <div className='column-1 text-white text-5xl'>
                 <CiDiscount1/><br/>
                <p className='text-4xl font-bold'>Get discount</p>
                <p className='text-xl'>Price of an item isn't fixed—it drops as more people in your physical vicinity (apartment, dorm, or street) join the "Bundle".
                </p>
                </div>
            </div>
             <div className="cursor-pointer transition">
                <div className='column-1 text-white text-5xl'>
                 <IoMdTimer/><br/>
                <p className='text-4xl font-bold'>Countdown</p>
                <p className='text-xl'>A 24-hour timer starts. Users share the link with neighbors to drive the price down further.
                </p>
                </div>
            </div>
             <div className=" cursor-pointer transition">
                <div className='column-1 text-white text-5xl'>
                 <FaPeopleGroup/><br/>
                <p className='text-4xl font-bold'>Drop</p>
                <p className='text-xl'>When the timer hits zero, the final price is calculated based on the total number of participants. Everyone is charged the lowest reached price.
                </p>
                </div>
            </div>
             <div className="cursor-pointer transition">
            
            </div>
             <div className="cursor-pointer transition">

            </div>
             <div className="cursor-pointer transition">
    
            </div>
          </Slider>
        </div>
        <Scanner/>
      </div>

    </div>
  )
}

export default Sectiontwo