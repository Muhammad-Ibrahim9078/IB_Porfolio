import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CrudProjects from "./CrudProjects";
import ContactMessages from "../components/ContactMessages";
import AdminFeedback from "./AdminFeedback";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiMenu, HiX } from "react-icons/hi";

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("projects");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });

    Swal.fire({
      title: "Admin Login",
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username" />
        <input type="password" id="password" class="swal2-input" placeholder="Password" />
      `,
      confirmButtonText: "Login",
      showDenyButton: true,
      denyButtonText: "Back",
      allowOutsideClick: false,
      preConfirm: () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
          Swal.showValidationMessage("Please enter Username & Password");
        }
        return { username, password };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          result.value.username === "ibrahim9078" &&
          result.value.password === "ibrahim9078@"
        ) {
          setAuthenticated(true);
        } else {
          Swal.fire("Error", "Invalid Credentials", "error").then(() =>
            navigate("/")
          );
        }
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[#0c1124] text-white flex justify-center px-4 py-6">
      <div
        className="w-full max-w-6xl bg-white/5 backdrop-blur-md border border-white/10 
                   rounded-2xl p-6 md:p-10 shadow-xl"
        data-aos="fade-up"
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* SWITCH BUTTONS */}
        {/* Desktop buttons */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center mb-10">
          <button
            onClick={() => setActiveSection("projects")}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all
              ${activeSection === "projects"
                ? "bg-blue-600 shadow-lg"
                : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            Projects
          </button>

          <button
            onClick={() => setActiveSection("contacts")}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all
              ${activeSection === "contacts"
                ? "bg-green-600 shadow-lg"
                : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            Contacts
          </button>

          <button
            onClick={() => setActiveSection("feedback")}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all
              ${activeSection === "feedback"
                ? "bg-purple-600 shadow-lg"
                : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            Feedback
          </button>
        </div>

        {/* Mobile burger menu */}
        <div className="md:hidden mb-10">
          <button
            className="text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>

          <div
            className={`mt-4 flex flex-col gap-4 transition-all duration-300 overflow-hidden ${
              menuOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <button
              onClick={() => { setActiveSection("projects"); setMenuOpen(false); }}
              className={`px-6 py-2 rounded-lg text-lg font-semibold w-full text-center transition-all
                ${activeSection === "projects"
                  ? "bg-blue-600 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              Projects
            </button>

            <button
              onClick={() => { setActiveSection("contacts"); setMenuOpen(false); }}
              className={`px-6 py-2 rounded-lg text-lg font-semibold w-full text-center transition-all
                ${activeSection === "contacts"
                  ? "bg-green-600 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              Contacts
            </button>

            <button
              onClick={() => { setActiveSection("feedback"); setMenuOpen(false); }}
              className={`px-6 py-2 rounded-lg text-lg font-semibold w-full text-center transition-all
                ${activeSection === "feedback"
                  ? "bg-purple-600 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              Feedback
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div data-aos="fade-in">
          {activeSection === "projects" && <CrudProjects />}
          {activeSection === "contacts" && <ContactMessages />}
          {activeSection === "feedback" && <AdminFeedback />}
        </div>
      </div>
    </div>
  );
}

export default Admin;
