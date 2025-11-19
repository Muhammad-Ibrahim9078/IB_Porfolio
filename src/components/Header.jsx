import React from "react";

function Header() {
  return (
    <>
      <div className="flex  justify-between items-center p-5 ">
        <h1 className="pr-[30px]">Ib_Portfolio</h1>

        <nav className="flex gap-16">
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
      </div>
    </>
  );
}

export default Header;
