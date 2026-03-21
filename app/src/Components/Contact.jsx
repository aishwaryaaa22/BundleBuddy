import React from "react";
import { IoCallSharp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import Footer from "./Footer";

function Contact() {
  return (
    <>
      <div className="flex flex-col bg-gray-100  p-15 px-35 gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-black rounded-3xl shadow-lg flex flex-col p-8 h-90 overflow-hidden hover:bg-gray-500">
            <div className="bg-gray-900 p-4 flex justify-center">
              <span className=" shadow-2xl text-white px-6 py-2 rounded-md text-md hover:text-amber-600 font-bold">
                Connect with us
              </span>
            </div>
            <div className="flex text-9xl mx-auto justify-center gap-10 h-80 w-100 text-white">
              <marquee direction="down" scrollamount="3">
                <div className=" rounded-4xl w-6 flex hover:text-blue-600 justify-center cursor-pointer transition">
                  <FaFacebookF />
                </div>
              </marquee>
              <marquee direction="up" scrollamount="3">
                {" "}
                <div className=" rounded-4xl w-6 flex hover:text-red-600 justify-center cursor-pointer transition">
                  <CiYoutube />
                </div>
              </marquee>
              <marquee direction="down" scrollamount="3">
                <div className=" rounded-4xl w-6 flex hover:text-pink-600 justify-center cursor-pointer transition">
                  <FaInstagram />
                </div>
              </marquee>
              <marquee direction="up" scrollamount="3">
                <div className=" rounded-4xl w-6 flex hover:text-gray-900 justify-center cursor-pointer transition">
                  <IoCallSharp />
                </div>
              </marquee>
              <marquee direction="down" scrollamount="3">
                <div className=" rounded-4xl w-6 flex hover:text-red-500 justify-center cursor-pointer transition">
                  <MdOutlineMail />
                </div>
              </marquee>
              <marquee direction="up" scrollamount="3">
                <div className=" rounded-4xl w-6 hover:text-blue-400 flex justify-center cursor-pointer transition">
                  <FaLinkedinIn />
                </div>
              </marquee>
              <marquee direction="down" scrollamount="3">
                <div className=" rounded-4xl w-6 hover:text-blue-700 flex justify-center cursor-pointer transition">
                  <FaTwitter />
                </div>
              </marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
