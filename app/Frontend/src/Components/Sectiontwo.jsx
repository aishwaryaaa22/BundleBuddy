import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdFindInPage } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import Footer from "./Footer";
import Email from "./Email";
import Scanner from "./Scanner";
import aboutimg from "../assets/image3.png";

function Sectiontwo() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="flex flex-col bg-black p-2 px-10 gap-4 h-auto mb-4">
        <section className="w-full bg-neutral-900 text-white py-16 px-4 md:px-8 lg:px-16 overflow-x-hidden">
          <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1" data-aos="fade-right">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-slate-400 font-semibold">
                  Our Story
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  Redefining Streetwear Essentials.
                </h2>
              </div>

              <div className="h-1 w-20 bg-[#434d5e] rounded-full"></div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
                We believe that clothing is more than just fabric—it’s movement,
                attitude, and self-expression. Born out of the vibrant energy of
                the local street culture, our curated collections blend raw,
                underground aesthetics with functional everyday comfort.
              </p>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Every piece, from our premium heavyweight drops to our minimal
                everyday accessories, is designed for those who navigate the
                world with rhythm and purpose. We focus on premium construction,
                utility-focused designs, and versatile fits that make a
                statement without trying too hard.
              </p>

              <div className="pt-4">
                <a
                  href=""
                  className="bg-[#434d5e] hover:bg-[#4f5b6e] text-white font-bold py-3 px-8 text-center rounded-full text-sm shadow-md tracking-wider transition-all duration-200 inline-block"
                >
                  EXPLORE THE DROP
                </a>
              </div>
            </div>

            <div
              className="w-full order-1 md:order-2 flex justify-center"
              data-aos="fade-left"
            >
              <div className="w-full max-w-md md:max-w-full overflow-hidden bg-neutral-800 aspect-3/4 relative group shadow-2xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={aboutimg}
                  alt="Brand Lookbook Portrait"
                />

                <div className="absolute inset-0 border border-neutral-700/50 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        <h2 class="text-center text-3xl  font-bold mb-4 py-2">
          {" "}
          <span class="text-gray-500 items-center font-serif block sm:inline">
            Process is
          </span>{" "}
          <span class="text-white block sm:inline">Everything</span>
        </h2>

        <div className="slider-container gap-6">
          <Slider {...settings}>
            <div className=" cursor-pointer transition">
              <div className="column-1 text-white text-5xl">
                <MdFindInPage />
                <br />
                <p className="text-3xl font-bold sm:text-2xl md:text-4xl">
                  Explore
                </p>
                <p className="text-sm sm:text-base md:text-xl text-gray-300">
                  Discover the latest all of all the collections and explore
                  according to your interests.
                </p>
              </div>
            </div>
            <div className="cursor-pointer transition">
              <div className="column-1 text-white text-5xl">
                <FaCartShopping />
                <br />
                <p className="text-3xl font-bold sm:text-2xl md:text-4xl">
                  Save & Commit
                </p>
                <p className=" text-sm sm:text-base md:text-xl text-gray-300">
                  Add all the items to the cart for purchasing.They "Commit to
                  Buy." The app holds a pre-authorization on their card but
                  doesn't charge them yet.
                </p>
              </div>
            </div>
            <div className="cursor-pointer transition">
              <div className="column-1 text-white text-5xl">
                <CiDiscount1 />
                <br />
                <p className=" font-bold text-3xl sm:text-2xl md:text-4xl">
                  Get discount
                </p>
                <p className="text-sm sm:text-base md:text-xl text-gray-300">
                  Price of an item isn't fixed—it drops as more people in your
                  physical vicinity (apartment, dorm, or street) join the
                  "Bundle".
                </p>
              </div>
            </div>
            <div className="cursor-pointer transition">
              <div className="column-1 text-white text-5xl">
                <IoMdTimer />
                <br />
                <p className=" font-bold text-3xl sm:text-2xl md:text-4xl">
                  Countdown
                </p>
                <p className="text-sm sm:text-base md:text-xl text-gray-300">
                  A 24-hour timer starts. Users share the link with neighbors to
                  drive the price down further.
                </p>
              </div>
            </div>
            <div className=" cursor-pointer transition">
              <div className="column-1 text-white text-5xl">
                <FaPeopleGroup />
                <br />
                <p className=" font-bold text-3xl sm:text-2xl md:text-4xl">
                  Drop
                </p>
                <p className="text-sm sm:text-base md:text-xl text-gray-300">
                  When the timer hits zero, the final price is calculated based
                  on the total number of participants. Everyone is charged the
                  lowest reached price.
                </p>
              </div>
            </div>
            <div className="cursor-pointer transition"></div>
            <div className="cursor-pointer transition"></div>
            <div className="cursor-pointer transition"></div>
          </Slider>
        </div>
        <Scanner />
      </div>
    </div>
  );
}

export default Sectiontwo;
