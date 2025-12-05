import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects").then(res => setProjects(res.data));
  }, []);

  const openDetails = (p) => {
    Swal.fire({
      title: p.title,
      html: `
        <img src="${p.image}" style="width:100%; border-radius:10px;" />
        <p class="mt-3 text-left">${p.description}</p>
        <br/>
        <a href="${p.liveUrl}" target="_blank" class="bg-green-500 text-white p-2 rounded block mt-3">
          Live Demo
        </a>
        <a href="${p.githubUrl}" target="_blank" class="bg-black text-white p-2 rounded block mt-3">
          GitHub Code
        </a>
      `,
      showConfirmButton: false,
      width: "600px",
    });
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {projects.map((p) => (
        <div
          key={p._id}
          onClick={() => openDetails(p)}
          className="cursor-pointer border shadow rounded p-3 hover:scale-105 transition"
        >
          <img src={p.image} className="h-48 w-full object-cover rounded" />
          <h3 className="text-xl font-bold mt-2">{p.title}</h3>
        </div>
      ))}
    </div>
  );
}
