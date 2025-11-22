import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdAnimation } from "react-icons/md";


import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGithub,
  FaBootstrap,
} from "react-icons/fa";

import { SiTailwindcss, SiMongodb, SiExpress, SiFirebase } from "react-icons/si";

const techStack = [
  { icon: <FaHtml5 className="text-orange-500" />, name: "HTML" },
  { icon: <FaCss3Alt className="text-blue-500" />, name: "CSS" },
  { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind" },
  { icon: <FaBootstrap className="text-purple-600" />, name: "Bootstrap" },
  { icon: <MdAnimation className="text-blue-500" />, name: "AOS Animation" },
  { icon: <FaJs className="text-yellow-400" />, name: "JavaScript" },
  { icon: <FaReact className="text-blue-400" />, name: "React" },
  { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
  { icon: <SiExpress className="text-gray-300" />, name: "Express.js" },
  { icon: <SiMongodb className="text-green-400" />, name: "MongoDB" },
  { icon: <SiFirebase className="text-yellow-500" />, name: "Firebase" },
  { icon: <FaDatabase className="text-blue-300" />, name: "Database" },
  { icon: <FaGithub className="text-white" />, name: "GitHub" },
];

function TechIUsed() {

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section id="tech" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center px-5">

        <h2
          className="text-4xl font-bold mb-12"
          data-aos="fade-up"
        >
          The Technologies I Use
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 80}
              className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col
              items-center justify-center gap-3 hover:bg-gray-700 hover:scale-105
              transition-all duration-300"
            >
              <div className="text-6xl">{tech.icon}</div>
              <p className="text-lg font-semibold">{tech.name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TechIUsed;
