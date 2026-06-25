import React from "react";
import logo from "../assets/logoo.png";
import LOGO from "../assets/LOGO.jpeg";

function Scanner() {
  return (
    <div className="m-4 sm:m-10 md:m-20">
      <div className="bg-slate-100 min-h-17 py-3 px-4 sm:px-6 flex items-center justify-between text-center cursor-pointer rounded-xl shadow-sm">
        
        {/* Left App Logo */}
        <div className="shrink-0">
          <img 
            className="h-10 w-10 sm:h-14 sm:w-14 md:h-17 md:w-17 rounded-lg sm:rounded-2xl object-contain" 
            src={logo} 
            alt="Logo loading" 
          />
        </div>

        {/* Center Text Action */}
        <div className="text-black p-2 px-2 sm:px-6 md:px-20 font-extrabold text-base sm:text-2xl md:text-4xl text-center tracking-wider uppercase select-none">
          Know More
        </div>

        {/* Right QR Code Logo */}
        <div className="shrink-0">
          <img 
            className="h-10 w-10 sm:h-14 sm:w-14 md:h-17 md:w-17 object-contain rounded" 
            src={LOGO} 
            alt="QR Code"
          />
        </div>

      </div>
    </div>
  );
}

export default Scanner;