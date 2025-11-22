import React from "react";
import { FaCode, FaPaintBrush, FaMobileAlt, FaServer } from "react-icons/fa";

function IProvideServices() {
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      desc: "Modern, fast, responsive websites using HTML, CSS, JS, React & Tailwind.",
    },
    {
      icon: <FaPaintBrush />,
      title: "UI / UX Design",
      desc: "Attractive and user-friendly UI designs to improve the user experience.",
    },
    {
      icon: <FaMobileAlt />,
      title: "App Development",
      desc: "Cross-platform mobile applications with smooth performance.",
    },
    {
      icon: <FaServer />,
      title: "Backend Development",
      desc: "Secure APIs & backend using Node.js, Express, MongoDB & Firebase.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-5 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-3">What I Provide</h2>
        <p className="text-gray-300 mb-12 text-lg">
          These are the professional services I offer to my clients.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-6 rounded-xl shadow-xl flex flex-col justify-center items-center gap-4 cursor-pointer group"
            >
              {/* Icon */}
              <div className="text-6xl text-blue-400 group-hover:text-blue-300 transition">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-300 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IProvideServices;
