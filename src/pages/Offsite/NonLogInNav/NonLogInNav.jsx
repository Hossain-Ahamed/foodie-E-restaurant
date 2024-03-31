import React from "react";
import logo from "../../../assets/images/brand-icon.png";
import { Link } from "react-router-dom";

const NonLogInNav = () => {
  return (
    <>
      <div className="shadow-md">
      <div className="flex justify-between items-center lg:w-[900px] mx-auto py-2">
        <div className="flex items-center gap-2">
          <img className="w-[50px] h-[50px]" src={logo} alt="" />
          <p className="text-xl font-bold text-[#F69449]">Foodie</p>
        </div>
      
        <div className="flex gap-3 md:gap-6">
          <Link to="/login" className="border border-[#F69449] rounded-md text-sm md:text-base px-2 md:px-4 py-1 text-[#F69449] hover:bg-[#fff1e4]">Login</Link>
          {/* <Link className="border rounded-md text-sm md:text-base px-2 md:px-4 py-1 bg-[#F69449] text-white">Sign Up</Link> */}
        </div>
      </div>
      </div>
    </>
  );
};

export default NonLogInNav;
