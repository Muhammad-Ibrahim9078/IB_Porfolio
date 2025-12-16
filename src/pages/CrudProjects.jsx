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
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    image: "",
  });

  const [data, setData] = useState([]);

  // ===== FETCH PROJECTS =====
  async function fetchProjects() {
    const snapshot = await getDocs(collection(db, "projects"));
    const arr = [];
    snapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
    setData(arr);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // ===== IMAGE UPLOAD =====
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

  // ===== ADD PROJECT =====
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

      setOpenForm(false);
      fetchProjects();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  // ===== DELETE =====
  async function deleteProject(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "projects", id));
        fetchProjects();
        Swal.fire("Deleted!", "Project deleted.", "success");
      }
    });
  }

  // ===== EDIT =====
  function editProject(p) {
    Swal.fire({
      title: "Edit Project",
      html: `
        <input id="title" class="swal2-input" value="${p.title}">
        <textarea id="desc" class="swal2-textarea">${p.description}</textarea>
        <input id="git" class="swal2-input" value="${p.githubLink}">
        <input id="live" class="swal2-input" value="${p.liveLink}">
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      preConfirm: () => ({
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        githubLink: document.getElementById("git").value,
        liveLink: document.getElementById("live").value,
      }),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateDoc(doc(db, "projects", p.id), result.value);
        Swal.fire("Updated!", "Project updated.", "success");
        fetchProjects();
      }
    });
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Projects CRUD</h1>

      {/* ===== ADD BUTTON ===== */}
      <button
        onClick={() => setOpenForm(!openForm)}
        className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        {openForm ? "Close Form" : "Add Project"}
      </button>

      {/* ===== FORM (BUTTON KE NICHE) ===== */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          openForm ? "max-h-[900px] mt-6" : "max-h-0"
        }`}
      >
        <div className="bg-gray-800 p-6 rounded-xl grid gap-4">

          <input
            className="w-full p-3 rounded bg-gray-700"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="w-full p-3 rounded bg-gray-700 h-28"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            className="w-full p-3 rounded bg-gray-700"
            placeholder="GitHub Link"
            value={form.githubLink}
            onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
          />

          <input
            className="w-full p-3 rounded bg-gray-700"
            placeholder="Live Link"
            value={form.liveLink}
            onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
          />

          <input
            type="file"
            className="w-full p-2 rounded bg-gray-700"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />

          <button
            onClick={addProject}
            disabled={loading}
            className="bg-green-600 py-3 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>

      {/* ===== PROJECT CARDS ===== */}
      <div className="grid sm:grid-cols-2 gap-6 mt-10">
        {data.map((p) => (
          <div key={p.id} className="bg-gray-900 p-4 rounded-xl">

            {p.image && (
              <img
                src={p.image}
                className="h-40 w-full object-cover rounded mb-3"
                alt=""
              />
            )}

            <h2 className="text-xl font-bold">{p.title}</h2>

            <p
              className={`text-gray-300 text-sm ${
                expanded[p.id] ? "" : "line-clamp-2"
              }`}
            >
              {p.description}
            </p>

            {p.description?.length > 100 && (
              <button
                onClick={() =>
                  setExpanded(prev => ({
                    ...prev,
                    [p.id]: !prev[p.id],
                  }))
                }
                className="text-blue-400 text-sm mt-1 hover:underline"
              >
                {expanded[p.id] ? "Read less" : "Read more"}
              </button>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => editProject(p)}
                className="bg-yellow-600 px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(p.id)}
                className="bg-red-600 px-4 py-2 rounded"
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
