import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function ProjectsShow() {
  const [data, setData] = useState([]);

  // ----------------- FETCH PROJECTS ------------------
  async function fetchProjects() {
    let snapshot = await getDocs(collection(db, "projects"));
    let arr = [];
    snapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
    setData(arr);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // ---------- OPEN CARD DETAILS IN SWEETALERT ----------
  function openDetails(p) {
    const shortDesc = p.description.slice(0, 150);

    Swal.fire({
      title: p.title,
      width: "90%",
      showCloseButton: true,
      showConfirmButton: false,
      html: `
        <img 
          src="${p.image}" 
          style="width:100%; border-radius:10px; margin-bottom:10px;" 
        />

        <p 
          id="desc"
          style="
            text-align:left;
            font-size:15px;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
          "
        >
          ${p.description}
        </p>

        <button 
          id="readMoreBtn"
          style="
            background:none;
            border:none;
            color:#60a5fa;
            cursor:pointer;
            margin-top:5px;
            font-size:14px;
          "
        >
          Read more
        </button>

        <div style="margin-top:15px; display:flex; gap:10px; justify-content:center;">
          <a href="${p.githubLink}" target="_blank"
             style="padding:10px 15px; background:#111827; color:white; border-radius:8px;">
            GitHub
          </a>

          <a href="${p.liveLink}" target="_blank"
             style="padding:10px 15px; background:#2563eb; color:white; border-radius:8px;">
            Live Demo
          </a>
        </div>
      `,
      didOpen: () => {
        const desc = document.getElementById("desc");
        const btn = document.getElementById("readMoreBtn");
        let expanded = false;

        btn.addEventListener("click", () => {
          expanded = !expanded;

          if (expanded) {
            desc.style.webkitLineClamp = "unset";
            desc.style.overflow = "visible";
            btn.innerText = "Read less";
          } else {
            desc.style.webkitLineClamp = "2";
            desc.style.overflow = "hidden";
            btn.innerText = "Read more";
          }
        });
      },
    });
  }

  return (
    <div
      id="projects"
      className="p-6 sm:p-8 max-w-6xl mx-auto text-white"
      data-aos="zoom-in"
    >
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      {/* PROJECTS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((p) => (
          <div
            key={p.id}
            onClick={() => openDetails(p)}
            className="bg-gray-900 p-4 rounded shadow cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            {p.image && (
              <img
                src={p.image}
                className="h-40 w-full object-cover rounded mb-3"
                alt=""
              />
            )}

            <h2 className="text-xl font-bold">{p.title}</h2>

            <div className="mt-3">
              <span className="text-sm bg-blue-600 px-3 py-1 rounded-full inline-block hover:bg-blue-700 transition">
                More Info →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
