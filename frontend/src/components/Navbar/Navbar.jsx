import React from "react";
import { User, Settings, LogOutIcon, Hamburger, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useState } from "react";

const Navbar = () => {
  const { logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div className="w-full flex items-center relative justify-between h-14 bg-gray-800">
      <div className="logo text-white font-bold text-2xl pl-3 cursor-pointer">
        <Link to="/">ChatterBox </Link>
      </div>
        <div className="lg:hidden flex items-center justify-center mr-2 size-10" onClick={()=>setMenuOpen(!menuOpen)}>
          <Menu/>
          </div>
      <div className="options hidden md:flex items-center text-white gap-8 pr-5 ">
        <div className="flex items-center gap-1 cursor-pointer">
          <Link to="/profile" className="flex items-center justify-center">
            {" "}
            <User /> Profile{" "}
          </Link>
        </div>
        <div className="flex items-center cursor-pointer">
          <Link to="/settings" className="flex items-center justify-center">
            {" "}
            <Settings /> Settings{" "}
          </Link>
        </div>
        <div onClick={logout} className="flex items-center cursor-pointer">
         <Link to="/" className="flex items-center justify-center"> <LogOutIcon /> Logout </Link>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-14 right-0 w-1/3 rounded-2xl bg-gray-900 flex flex-col items-start text-white p-4 gap-4 lg:hidden z-50">
          <Link to="/profile" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <User /> Profile
          </Link>
          <Link to="/settings" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <Settings /> Settings
          </Link>
          <div onClick={() => { logout(); setMenuOpen(false); }} className="flex items-center gap-2 cursor-pointer">
            <LogOutIcon /> Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
