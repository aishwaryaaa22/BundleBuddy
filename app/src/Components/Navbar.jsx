import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logoo.png";
import { IoBagHandleOutline } from "react-icons/io5";
import { NavLink, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { HiLocationMarker } from "react-icons/hi";
import Cart from "./Cart";
import SearchDrawer from "./SearchDrawer";
import { Search } from "lucide-react";
function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <div>
      <div className="ig cursor-pointer transition text-m ">
        <img className="logo" src={logo} />
        <div className="">
          {" "}
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "grey" : "white",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
            })}
          >
            HOME
          </NavLink>
        </div>
        <div className="" style={{ color: "aliceblue" }}>
          {" "}
          <NavLink
            to="/Featured"
            style={({ isActive }) => ({
              color: isActive ? "grey" : "white",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
            })}
          >
            FEATURED
          </NavLink>
        </div>

        <div className="" style={{ color: "aliceblue" }}>
          <ul>
            <li className="text-black text-center flex items-center group relative cursor-pointer">
              {" "}
              <NavLink
                to="/ShopCollection"
                style={({ isActive }) => ({
                  color: isActive ? "grey" : "white",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: "none",
                })}
              >
                SHOP
              </NavLink>
              <ol className=" absolute invisible group-hover:visible left-0 bg-gray-300 rounded-2xl top-5 mt-2 transition-all duration-100 linear  max-0 overflow-hidden group-hover:max-h-30 z-50 w-30 h-30 about ">
                <li className="flex text-slate-950 py-2 hover:text-white hover:bg-gray-700">
                  <Link to="/Womenn">WOMEN</Link>
                </li>
                <li className="flex text-slate-950 py-2 hover:text-white hover:bg-gray-700">
                  <Link to="/Men">MEN</Link>
                </li>
                <li className="flex text-slate-950 py-2 hover:text-white hover:bg-gray-700">
                  <Link to="/Accessories">&nbsp;ACCESSORIES</Link>
                </li>
              </ol>
            </li>
          </ul>
        </div>

        <div className="" style={{ color: "aliceblue" }}>
          {" "}
          <NavLink
            to="/Sectiontwo"
            style={({ isActive }) => ({
              color: isActive ? "grey" : "white",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
            })}
          >
            ABOUT
          </NavLink>
        </div>
        <div className="">
          {" "}
          <NavLink
            to="/Contact"
            style={({ isActive }) => ({
              color: isActive ? "grey" : "white",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
            })}
          >
            CONTACT
          </NavLink>
        </div>
        <div>
          <div  onClick={() => setIsSearchOpen(true)} className=" relative hidden group sm:block w-50 sm:50  hover:w-70 transition-all hover:text-black rounded-full border border-gray-300 px-2 py-1  focus:outline-none  focus:border-blue-600"
          >
            {/*} <button
             onClick={() => setIsSearchOpen(true)}
              className="w-70 sm:70 hover:w-100 transition-all duration-300 rounded-full border border-gray-300 px-2 py-1  focus:outline-none  focus:border-blue-600"
            />*/}

            <span
              
              className="text-gray-400 hover:text-blue-500"
            >
              Serach
            </span>
            <FaSearch
              
              className="text-gray-500 group-hover:text-blue-300 absolute top-1/2 -translate-y-1/2 right-3"
            />
          </div>
          <SearchDrawer
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>

        <div>
          <div className=" relative group hidden sm:block">
            <input
              type="text"
              placeholder="Update Location"
              className="w-45 sm:60 text-white transition-all duration-300  px-5 py-1  "
            />
            <HiLocationMarker className="text-gray-200 hover:text-4xl group-hover:text-blue-300 absolute top-1/2 -translate-y-1/2 right-3" />
          </div>
        </div>
        <button className="text-white text-3xl  hover:text-blue-300 transition-all duration-200 py-1 px-4 flex items-center gap-3 group cursor-pointer">
          <Link to="/Cart">
            <IoBagHandleOutline />
          </Link>
        </button>
        <button className="text-white text-3xl  hover:text-blue-700 transition-all duration-200 py-1 flex items-center  group cursor-pointer">
          <Link to="/Wishlist">
            <CiHeart />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
