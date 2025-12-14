import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const CLOUDINARY_UPLOAD_PRESET = "ib_cloudinary";
const CLOUDINARY_CLOUD_NAME = "df92wfbox";

export default function CrudProjects() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    image: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProjects() {
    let snapshot = await getDocs(collection(db, "projects"));
    let arr = [];
    snapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
    setData(arr);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.secure_url;
  }

  async function addProject() {
    try {
      setLoading(true);
      let imgUrl = "";
      if (form.image) imgUrl = await uploadImage(form.image);

      await addDoc(collection(db, "projects"), {
        ...form,
        image: imgUrl,
        created_at: serverTimestamp(),
      });

      Swal.fire("Success!", "Project Added Successfully!", "success");

      setForm({
        title: "",
        description: "",
        githubLink: "",
        liveLink: "",
        image: "",
      });

      fetchProjects();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "This project will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "projects", id));
        fetchProjects();
        Swal.fire("Deleted!", "Project has been deleted.", "success");
      }
    });
  }

  function editProject(p) {
    Swal.fire({
      title: "Edit Project",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${p.title}">
        <input id="desc" class="swal2-input" placeholder="Description" value="${p.description}">
        <input id="git" class="swal2-input" placeholder="GitHub Link" value="${p.githubLink}">
        <input id="live" class="swal2-input" placeholder="Live Link" value="${p.liveLink}">
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          description: document.getElementById("desc").value,
          githubLink: document.getElementById("git").value,
          liveLink: document.getElementById("live").value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateDoc(doc(db, "projects", p.id), { ...result.value });
        Swal.fire("Updated!", "Project updated successfully!", "success");
        fetchProjects();
      }
    });
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Projects CRUD with Cloudinary & Firebase
      </h1>

      {/* --- ADD FORM --- */}
      <div className="bg-gray-800 p-4 sm:p-6 rounded-xl grid gap-4">
        <input
          className="w-full p-3 rounded bg-gray-700 text-sm sm:text-base"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded bg-gray-700 h-24 sm:h-28 text-sm sm:text-base"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full p-3 rounded bg-gray-700 text-sm sm:text-base"
          placeholder="GitHub Link"
          value={form.githubLink}
          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
        />

        <input
          className="w-full p-3 rounded bg-gray-700 text-sm sm:text-base"
          placeholder="Live Link"
          value={form.liveLink}
          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        />

        <input
          type="file"
          className="w-full p-2 rounded bg-gray-700 text-sm sm:text-base"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button
          onClick={addProject}
          disabled={loading}
          className={`w-full p-3 rounded text-sm sm:text-base font-semibold transition-all 
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"
            }`}
        >
          {loading ? "Saving..." : "Add Project"}
        </button>
      </div>

      {/* --- PROJECT CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        {data.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            {p.image && (
              <img
                src={p.image}
                className="h-40 sm:h-48 w-full object-cover rounded mb-3"
                alt=""
              />
            )}

            <h2 className="text-lg sm:text-xl font-bold">{p.title}</h2>
            <p className="text-gray-300 text-sm sm:text-base">{p.description}</p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => editProject(p)}
                className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition w-full sm:w-auto"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProject(p.id)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
