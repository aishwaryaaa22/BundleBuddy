import React, { useState, useEffect, useContext } from "react";
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
import { MdGroups2 } from "react-icons/md";
import { createData } from "./Context";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [address, setAddress] = useState("Update Location");
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(createData);
  const location = useLocation();
  const isCartPage = location.pathname === "/Cart";
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // LocalStorage se user ka data nikalna (Login ke waqt save kiya hoga)
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Aishwarya Sharma",
    email: "aishwarya056789@gmail.com",
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  // 👇 Ye line add karo (Isse error chala jayega)
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setAddress(savedLocation);
    } else {
      // Optional: Automatically ask for GPS on first visit
      // getLocation();
    }
  }, []);

  const handleManualLocation = () => {
    const userCity = prompt("Enter your City/Area:");
    if (userCity) {
      setAddress(userCity);
      localStorage.setItem("userLocation", userCity);
    }
  };
  const fetchNearbyBundles = async (lat, lng) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bundles/nearby?lat=${lat}&lng=${lng}`,
      );
      const data = await response.json();
      setBundles(data); // Sirf 5km wale bundles hi state mein jayenge
    } catch (error) {
      console.error("Error fetching bundles:", error);
    }
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      // Browser popup dikhayega "Allow Location?"
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchNearbyBundles(latitude, longitude);
          try {
            // Yeh API coordinates ko address (City name) mein badalti hai
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const data = await res.json();

            // City ya suburb nikaalna
            const detectedCity =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown Location";
            setAddress(detectedCity); // Input box mein city name set ho jayega
          } catch (err) {
            console.error("Geocoding error:", err);
            alert("Could not fetch city name.");
          }
        },
        (error) => {
          alert("Please enable GPS/Location permission in your browser.");
        },
      );
    }
  };
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
          <div
            onClick={() => setIsSearchOpen(true)}
            className=" relative hidden group sm:block w-50 sm:50  hover:w-70 transition-all hover:text-black rounded-full border border-gray-300 px-2 py-1  focus:outline-none  focus:border-blue-600"
          >
            {/*} <button
             onClick={() => setIsSearchOpen(true)}
              className="w-70 sm:70 hover:w-100 transition-all duration-300 rounded-full border border-gray-300 px-2 py-1  focus:outline-none  focus:border-blue-600"
            />*/}

            <span className="text-gray-400 hover:text-blue-500">Serach</span>
            <FaSearch className="text-gray-500 group-hover:text-blue-300 absolute top-1/2 -translate-y-1/2 right-3" />
          </div>
          <SearchDrawer
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>

        <div>
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Update Location"
              value={address} // State use karein taaki GPS se jo address aaye wo yahan dikhe
              onChange={(e) => setAddress(e.target.value)} // Manual typing ke liye
              className="w-45 sm:w-60 bg-transparent border-b border-gray-600 text-white transition-all duration-300 px-5 py-1 focus:outline-none focus:border-blue-400"
            />

            {/* Sirf Icon par click karne se GPS chale */}
            <HiLocationMarker
              onClick={getLocation}
              className="text-gray-200 cursor-pointer hover:text-blue-300 absolute right-2 top-1/2 -translate-y-1/2 text-xl transition-all"
            />
          </div>
        </div>
        <button className="text-white text-3xl relative inline-block hover:text-blue-300 transition-all duration-200 py-1 px-4 items-center gap-3 group cursor-pointer">
          <Link to="/Cart">
            <IoBagHandleOutline />
            {cart.length > 0 && !isCartPage && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.qty, 0)}
              </span>
            )}
          </Link>
        </button>
        <button className="text-white text-3xl  hover:text-blue-700 transition-all duration-200 py-1 flex items-center  group cursor-pointer">
          <Link to="/MyGroups">
            <MdGroups2 />
          </Link>
        </button>

        <div className="flex items-center gap-6">
          {!isLoggedIn ? (
            /* AGAR USER LOGGED IN NAHI HAI */
            <div className="flex gap-4 items-center">
              
              <button className="glow-on-hover text-sm bg-blue-900 text-white px-5 py-2 rounded-md font-bold transition-all active:scale-95">
                <Link to="/AuthForm">SIGN UP</Link>
              </button>
            </div>
          ) : (
            /* AGAR USER LOGGED IN HAI */
            <div className="relative">
              {/* Profile Trigger */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 hover:bg-gray-800 px-3 py-1.5 rounded-full transition-all border border-gray-700"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-500/20">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </div>
                <span className="text-sm font-medium text-gray-200">
                  {user?.name?.split(" ")[0]}
                </span>
                <span
                  className={`text-[10px] transition-transform duration-300 ${showProfile ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown Menu */}
              {showProfile && (
                <div className="absolute right-0 mt-3 w-64 bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden py-2 z-[1000] animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-800 mb-2 bg-gray-900/30">
                    <p className="text-sm font-bold text-white">{user?.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white transition"
                    onClick={() => setShowProfile(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/MyGroups"
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white transition"
                    onClick={() => setShowProfile(false)}
                  >
                    My Joined Bundles
                  </Link>

                  <hr className="my-2 border-gray-800" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 transition font-bold"
                  >
                    LOG OUT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
