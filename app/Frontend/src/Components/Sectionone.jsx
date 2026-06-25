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
            {!isLoggedIn ? (
              <button className="glow-on-hover text-xl bg-blue-900 text-white px-6 py-0 mb-2 rounded-md font-bold mt-4 ">
                {" "}
                <Link to="/AuthForm">SIGN UP</Link>
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="glow-on-hover text-xl bg-red-600 text-white px-6 py-0 mb-2 rounded-md font-bold mt-4"
              >
                LOG OUT
              </button>
            )}
          </section>
        </div>
      </div>
      <marquee direction="down" scrollamount="2" className="arrow">
        <IoIosArrowDown />
      </marquee>
      <Sectiontwo />
      <Featured />
      <Email />
      <Footer />
    </>
  );
}

export default Sectionone;
