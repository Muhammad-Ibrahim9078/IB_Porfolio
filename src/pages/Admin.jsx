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

    // 🔐 ADMIN LOGIN (PASSWORD ONLY)
    Swal.fire({
      title: "Admin Login",
      width: "90%", // 🔥 mobile overflow fix
      padding: "1.5rem",
      allowOutsideClick: false,
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "swal-confirm",
        denyButton: "swal-deny",
      },
      html: `
        <input 
          type="password" 
          id="password" 
          class="swal2-input"
          placeholder="Enter Admin Password"
          style="width:100%; margin:0.5rem auto;"
        />
      `,
      confirmButtonText: "Login",
      showDenyButton: true,
      denyButtonText: "Back",

      preConfirm: () => {
        const password = document.getElementById("password").value;

        if (!password) {
          Swal.showValidationMessage("Password is required");
          return false;
        }
        return password;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value === "ibrahim9078@") {
          setAuthenticated(true);
        } else {
          Swal.fire("Error", "Wrong Password", "error").then(() =>
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

        {/* DESKTOP NAV */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center mb-10">
          {["projects", "contacts", "feedback"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all
                ${
                  activeSection === item
                    ? "bg-blue-600 shadow-lg"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden mb-10">
          <button
            className="text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>

          <div
            className={`mt-4 flex flex-col gap-4 overflow-hidden transition-all duration-300 ${
              menuOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            {["projects", "contacts", "feedback"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item);
                  setMenuOpen(false);
                }}
                className={`px-6 py-2 rounded-lg text-lg font-semibold w-full transition-all
                  ${
                    activeSection === item
                      ? "bg-blue-600 shadow-lg"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
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
