import React from "react";
import logo from "../assets/logoo.png";
import LOGO from "../assets/LOGO.jpeg";
function Scanner() {
  return (
    <div className="m-20">
      <div className="bg-slate-100 h-17 flex items-center justify-center text-center cursor-pointer">
        <div className="">
          <img className="h-17 rounded-2xl" src={logo} alt="Logo loading"></img>
        </div>
        <div className="text-black p-4 px-20 font-extrabold text-4xl text-center">
          KNOW MORE
        </div>
        <div>
          <img className="h-17" src={LOGO} />
        </div>
      </div>
     
    </div>
  );
}

export default Scanner;
