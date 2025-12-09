import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CrudProjects from "./CrudProjects";
import ContactMessages from "../components/ContactMessages";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
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

      // 🔥 FIX : SweetAlert se values return karwana
      preConfirm: () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
          Swal.showValidationMessage("Please enter Username & Password");
        }

        return { username, password };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          result.value.username === "ibrahim9078" &&
          result.value.password === "ibrahim9078@"
        ) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1200,
          });
          setAuthenticated(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: "Username or Password is wrong!",
            confirmButtonText: "Try Again",
            showDenyButton: true,
            denyButtonText: "Back",
          }).then((res) => {
            if (res.isDenied) {
              navigate("/");
            } else {
              window.location.reload();
            }
          });
        }
      } else if (result.isDenied) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-[#0c1124] flex justify-center px-4 py-6">
      {authenticated ? (
        <div
          className="w-full max-w-6xl bg-white/5 backdrop-blur-md shadow-xl 
                     border border-white/10 rounded-2xl p-6 md:p-10 text-white"
          data-aos="fade-up"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>

            <Link
              to="/"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Back
            </Link>
          </div>

          {/* TABS */}
          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all ${
                activeTab === "projects"
                  ? "bg-blue-600 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Add Projects
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all ${
                activeTab === "contacts"
                  ? "bg-green-600 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              View Contact Messages
            </button>
          </div>

          {/* CONTENT */}
          <div data-aos="fade-in">
            {activeTab === "projects" && <CrudProjects />}
            {activeTab === "contacts" && <ContactMessages />}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Admin;
