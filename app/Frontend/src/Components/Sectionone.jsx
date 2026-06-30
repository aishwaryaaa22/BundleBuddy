import React, { useState , useEffect} from "react";
import "./Navbar.css";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import Featured from "./Featured";
import Email from "./Email";
import Footer from "./Footer";
import Sectiontwo from "./Sectiontwo";
import AOS from "aos";
import "aos/dist/aos.css";

import AutoPopup from "./Popup";

function Sectionone() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Agar token hai toh true, warna false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload(); // UI refresh karne ke liye
  };
  
  return (
    <>
      <AutoPopup />
      
      {/* Shop Collection Action Layer */}
      <section className="but flex justify-center w-full px-4">
        <button className="glow-on-hover text-lg sm:text-xl bg-blue-900 text-white px-6 py-2 mb-2 rounded-md font-bold mt-6 whitespace-nowrap">
          <Link to="/ShopCollection" className="block w-full h-full">SHOP COLLECTION</Link>
        </button>
      </section>

      {/* Main Hero Hero Content Grid */}
      <div className="columns-1 one w-full text-center px-4 sm:px-8 md:px-16 max-w-4xl mx-auto space-y-4">
        
        {/* Brand Catchphrase Accent Text */}
        <div className="second text-3xl sm:text-5xl md:text-7xl font-black tracking-wider leading-none text-white break-words">
          <span>BREAK THE SILENCE</span>
        </div>
        
        {/* Brand Mission Content Layer */}
        <div className="third text-sm sm:text-base md:text-xl max-w-xl mx-auto text-neutral-300 font-medium leading-relaxed px-2">
          Streetwear that speaks louder than words. Limited drops, unlimited attitude.
        </div>
        
        {/* Conditional Action Auth Form Control */}
        <div className="flex justify-center pt-2">
          <section className="butt w-full sm:w-auto px-4 flex justify-center">
            {!isLoggedIn ? (
              <button className="glow-on-hover text-lg sm:text-xl bg-blue-900 text-white px-8 py-2 mb-2 rounded-md font-bold mt-4 min-w-[160px]">
                <Link to="/AuthForm" className="block w-full h-full">SIGN UP</Link>
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="glow-on-hover text-lg sm:text-xl bg-red-600 text-white px-8 py-2 mb-2 rounded-md font-bold mt-4 min-w-[160px]"
              >
                LOG OUT
              </button>
            )}
          </section>
        </div>
      </div>
      
      {/* Navigation Indicators Section */}
      <div className="w-full flex justify-center py-4">
        <marquee direction="down" scrollamount="2" className="arrow text-white text-2xl flex justify-center h-8 w-8">
          <IoIosArrowDown />
        </marquee>
      </div>

      {/* Main Section Modules Tree */}
      <Sectiontwo />
      <Featured />
      <Email />
      <Footer />
    </>
  );
}

export default Sectionone;