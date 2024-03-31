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
          <p className="text-xl font-bold text-[#F69449]">Script Horizon</p>
        </div>
        {/* <div>
          <div className="w-full xl:w-[52rem] relative">
            <form className="w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              </div>
              <input
                type="search"
                className="input-field block w-full h-10 p-2 pl-10 text-base rounded-md bg-white md:bg-light-100 border"
                placeholder="Your street and street number"
              />
            </form>
          </div>
        </div> */}
        <div className="flex gap-3 md:gap-6">
          <Link to="/login" className="border border-[#F69449] rounded-md text-sm md:text-base px-2 md:px-4 py-1 text-[#F69449] hover:bg-[#fff1e4]">Login</Link>
          <Link className="border rounded-md text-sm md:text-base px-2 md:px-4 py-1 bg-[#F69449] text-white">Sign Up</Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default NonLogInNav;
