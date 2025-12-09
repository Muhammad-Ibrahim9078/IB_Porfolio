import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-10 border-t border-gray-700">

      {/* TOP GRID */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">M. Ibrahim</h2>
          <p className="text-gray-400 leading-relaxed">
            Full Stack Developer delivering high-quality web and mobile
            solutions with modern technologies.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-all"
            >
              <FaFacebookF className="text-white text-xl" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-white transition-all group"
            >
              <FaGithub className="text-white group-hover:text-black text-xl" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 transition-all"
            >
              <FaLinkedinIn className="text-white text-xl" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition-all"
            >
              <FaInstagram className="text-white text-xl" />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#contact" 
            className="hover:text-white">Contact</a></li>
            <Link to={'crud'}>Admin Dashboard</Link>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Services
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-white">Web Development</li>
            <li className="hover:text-white">App Development</li>
            <li className="hover:text-white">UI/UX Designing</li>
            <li className="hover:text-white">Backend Solutions</li>
            
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>

          <p className="text-gray-400 mb-2">
            Email: <span className="text-white">ibrahimwebdeveloper9078 <br /> @gmail.com</span>
          </p>

          <p className="text-gray-400 mb-2">
            Phone: <span className="text-white">+92 3702789462</span>
          </p>

          <p className="text-gray-400">
            Location: <span className="text-white">Karachi, Pakistan</span>
          </p>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-16 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-500">
          © {new Date().getFullYear()} M. Ibrahim — All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
