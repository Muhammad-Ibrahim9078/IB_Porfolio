import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CrudProjects from "./CrudProjects";
import { Link, useNavigate } from "react-router-dom"; // react-router-dom ka hook

function Admin() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate(); // navigation ke liye hook

    useEffect(() => {
        Swal.fire({
            title: "Admin Login",
            html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username" />
        <input type="password" id="password" class="swal2-input" placeholder="Password" />
      `,
            confirmButtonText: "Login",
            focusConfirm: false,
            showDenyButton: true, // extra button dikhane ke liye
            denyButtonText: "Back", // button ka text
            allowOutsideClick: false,
            backdrop: true,
            preConfirm: () => {
                const username = Swal.getPopup().querySelector("#username").value;
                const password = Swal.getPopup().querySelector("#password").value;

                if (!username || !password) {
                    Swal.showValidationMessage(`Please enter username & password`);
                }

                return { username, password };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // agar login button click kiya
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
                            navigate("/"); // "/" route par redirect
                        } else {
                            // Retry login
                            window.location.reload(); // ya chahen to dobara Swal fire kara sakte ho
                        }
                    });
                }
            } else if (result.isDenied) {
                navigate("/"); // agar Back button click ho
            }
        });
    }, [navigate]);

    return (
        <div
            className="
        min-h-screen w-full 
        bg-gradient-to-br from-[#0a0f24] via-[#0f1a33] to-[#0a0f24] 
        flex justify-center 
        items-start md:items-center
        pt-6 md:pt-0 
        px-3 sm:px-4 md:px-6
      "
        >
            {authenticated ? (
                <div
                    className="
            w-full 
            max-w-6xl 
            bg-white/5 backdrop-blur-md shadow-xl 
            border border-white/10 
            rounded-xl sm:rounded-2xl 
            p-4 sm:p-6 md:p-8 
            mt-4 md:mt-0
          "
                >
                    <h1
                        className="
              text-2xl sm:text-3xl md:text-4xl 
              text-white font-bold 
              mb-4 sm:mb-6 
              text-center
            "
                    >
                        Admin Dashboard
                    </h1>

                    <Link
                        to="/"
                        className="text-blue-200 hover:text-blue-800 p-2 rounded-xl bg-red-600"
                    >
                        Back
                    </Link>


                    <div className="w-full">
                        <CrudProjects />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Admin;
