import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full shadow-md z-50">
        <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Ib_Portfolio</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-10 text-lg">
            <a href="#home" className="relative group">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a href="#about" className="relative group">
              About
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a href="#projects" className="relative group">
              Projects
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a href="#contact" className="relative group">
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown Menu FULL WIDTH */}
          <nav
            className={`md:hidden flex flex-col rounded items-center bg-gray-600 gap-10 text-lg shadow-md overflow-hidden transition-all duration-300 ${
              open ? "max-h-[600px] py-6 w-[90px]" : "max-h-0 py-0 w-full"
            }`}
          >
            <a href="#intro" onClick={() => setOpen(false)} className="bg-white hover:bg-green-200 text-black rounded p-1">Intro</a>
            <a href="#about" onClick={() => setOpen(false)} className="bg-white hover:bg-green-200 text-black rounded p-1">About</a>
            <a href="#projects" onClick={() => setOpen(false)} className="bg-white hover:bg-green-200 text-black rounded p-1">Projects</a>
            <a href="#contact" onClick={() => setOpen(false)} className="bg-white hover:bg-green-200 text-black rounded p-1">Contact</a>
          </nav>
      </header>

      {/* Push content below header */}
      <div className="pt-24"></div>
    </>
  );
}

export default Header;
