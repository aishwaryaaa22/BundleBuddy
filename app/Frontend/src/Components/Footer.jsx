import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <h5 className="font-bold mb-2 links">Quick Links</h5>
              <ul className="list">
                <li className=" a hover:text-gray-400 text-white cursor-pointer">
                  <Link to="/">
                  Home
                  </Link>
                </li>
                <li className="b text-white hover:text-gray-400 cursor-pointer">
                  <Link to="/Sectiontwo">
                  About
                  </Link>
                </li>
                <li className="c text-white hover:text-gray-400 cursor-pointer">
                   <Link to="ShopCollection/">
                  Services
                  </Link>
                </li>
                <li className="d text-white hover:text-gray-400 cursor-pointer">
                   <Link to="/Contact">
                  Contact
                  </Link>
                </li>
                <li className="d text-white hover:text-gray-400 cursor-pointer">
                  Return & Refund Policies
                </li>
                <li className="d text-white hover:text-gray-400 cursor-pointer">
                  Help
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-2">Contact Us</h5>
              <p className="text-gray-400">
                D-24. Pocket-16, Rohini-110085, Delhi, India
              </p>
              <p className="text-gray-400">(91+) 9821918642</p>
              <p className="text-gray-400">bundlebuddy@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-4xl text-center mt-2 font-extrabold">BundleBuddy.com</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
