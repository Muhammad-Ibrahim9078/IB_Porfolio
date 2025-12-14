import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Resume from "./Resume";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full shadow-md z-50" id="header" >
        <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Ib_Portfolio</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-10 text-lg">

            <a href="#about" className="relative group">
              About
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a href="#tech" className="relative group">
              Tech I Used
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#services" className="relative group">
              Services
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a href="#projects" className="relative group">
              Projects
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <div className="relative group">
              {/* DROPDOWN BUTTON */}
              <button className="relative font-semibold text-white">
                Connect
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* DROPDOWN MENU */}
              <div
                className="
        absolute top-full mt-3 
        w-48 
        bg-gray-900 
        rounded-xl 
        shadow-xl 
        border border-gray-700
        opacity-0 
        invisible 
        group-hover:opacity-100 
        group-hover:visible
        transition-all 
        duration-300
      "
              >
                <a
                  href="#contact"
                  className="block px-5 py-3 hover:bg-blue-600 rounded-t-xl transition"
                >
                  Contact
                </a>

                <a
                  href="#social_media"
                  className="block px-5 py-3 hover:bg-blue-600 transition"
                >
                  Social Media
                </a>

                <a
                  href="#feedback"
                  className="block px-5 py-3 hover:bg-blue-600 rounded-b-xl transition"
                >
                  Feedback
                </a>
              </div>
            </div>


            <div className="w-[180px] text-center"><Resume /></div>

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
          className={`md:hidden fixed top-0 right-0 mt-[60px] h-full rounded-xl bg-gray-700 text-white flex flex-col items-center gap-8 pt-10 pb-10 shadow-xl transition-all duration-300 ${open ? "w-60 opacity-100" : "w-0 opacity-0"
            }`}
          style={{ overflowX: "hidden" }}
        >

          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-green-200 w-40 text-center"
          >
            About
          </a>

          <a
            href="#tech"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-green-200 w-40 text-center"
          >
            Tech I Used
          </a>
          <a
            href="#services"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-green-200 w-40 text-center"
          >
            Services
          </a>
          <a
            href="#projects"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-green-200 w-40 text-center"
          >
            Projects
          </a>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-green-200 w-40 text-center"
          >
            Contact
          </a>

          <a
            href="#social_media"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-green-200 w-40 text-center"
          >
            Social Media
          </a>
          <a
            href="#feedback"
            onClick={() => setOpen(false)}
            className="bg-white text-black px-4 py-2 rounded hover:bg-green-200 w-40 text-center"
          >
            Feedback
          </a>

          <div className="w-[180px] text-center"><Resume /></div>
        </nav>

      </header>

      {/* Push content below header */}
      <div className="pt-24"></div>
    </>
  );
}

export default Header;

