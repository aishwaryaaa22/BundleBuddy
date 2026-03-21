import React, { useState } from "react";
import "./Navbar.css";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import Featured from "./Featured";
import Email from "./Email";
import Contact from "./Contact";
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

  return (
    <>
    <AutoPopup/>
      <section className="but">
        <button className="glow-on-hover text-xl bg-blue-900 text-white px-6 py-2 mb-2 rounded-md font-bold mt-6 ">
          <Link to="/ShopCollection">SHOP COLLECTION</Link>
        </button>
      </section>

      <div className="columns-1 one">
        <div className="second">
          <span>BREAK THE SILENCE</span>
        </div>
        <div className="third">
          {" "}
          Streetwear that speaks louder than words. Limited drops, unlimited
          attitude.
        </div>
        <div className="flex justify-center ">
        <section className="butt">
          <button className="glow-on-hover text-xl bg-blue-900 text-white px-6 py-0 mb-2 rounded-md font-bold mt-4 ">
            {" "}
            <Link to="/FullFormByState">LOG IN</Link>
          </button>
        </section>
         <section className="butt">
          <button className="glow-on-hover text-xl bg-blue-900 text-white px-6 py-0 mb-2 rounded-md font-bold mt-4 ">
            {" "}
            <Link to="/FullFormByState">SIGN UP</Link>
          </button>
        </section>
        </div>
      </div>
      <marquee direction="down" scrollamount="2" className="arrow">
        <IoIosArrowDown />
      </marquee>
      <Sectiontwo />

      <Featured />
      <Email />
      <Contact />
      <Footer />
    </>
  );
}

export default Sectionone;
