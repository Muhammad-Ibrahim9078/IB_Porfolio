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
const CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME";

export default function CrudProjects() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    image: "",
  });

  const [data, setData] = useState([]);

  // ----------------- FETCH ------------------
  async function fetchProjects() {
    let snapshot = await getDocs(collection(db, "projects"));
    let arr = [];
    snapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
    setData(arr);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // ------------------ IMAGE UPLOAD ------------------
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

  // ------------------- ADD ------------------
  async function addProject() {
    try {
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
    }
  }

  // ------------------- DELETE ------------------
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

  // ------------------- EDIT ------------------
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
    <div className="p-8 max-w-5xl mx-auto text-white">

      <h1 className="text-3xl font-bold mb-6">Projects CRUD with Cloudinary</h1>

      {/* ADD FORM */}
      <div className="bg-gray-800 p-6 rounded grid gap-4">

        <input
          className="p-2 rounded bg-gray-700"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="p-2 rounded bg-gray-700"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="p-2 rounded bg-gray-700"
          placeholder="GitHub Link"
          value={form.githubLink}
          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
        />

        <input
          className="p-2 rounded bg-gray-700"
          placeholder="Live Link"
          value={form.liveLink}
          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        />

        <input
          type="file"
          className="p-2 rounded bg-gray-700"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button
          onClick={addProject}
          className="bg-green-600 p-2 rounded">
          Add Project
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {data.map((p) => (
          <div key={p.id} className="bg-gray-900 p-4 rounded shadow">

            {p.image && (
              <img
                src={p.image}
                className="h-40 w-full object-cover rounded mb-3"
                alt=""
              />
            )}

            <h2 className="text-xl font-bold">{p.title}</h2>
            <p className="text-gray-300">{p.description}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => editProject(p)}
                className="bg-yellow-600 px-4 py-1 rounded">
                Edit
              </button>

              <button
                onClick={() => deleteProject(p.id)}
                className="bg-red-600 px-4 py-1 rounded">
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}















































// import React, { useEffect, useState } from "react";
// import { db } from "../config/firebase";
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// function CrudProjectsNoImage() {


//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     githubLink: "",
//     liveLink: "",
//   });

//   const [data, setData] = useState();


//   // ADD
//   async function addProject() {
//     await addDoc(collection(db, "projects"), {
//       ...form,
//       created_at: serverTimestamp(),
//     });

//     setForm({ title: "", description: "", githubLink: "", liveLink: "" });
//   }


//   return (
//     <div className="p-8 max-w-4xl mx-auto text-white">

//       <h1 className="text-3xl font-bold mb-6">Projects CRUD (No Image)</h1>

//       <div className="bg-gray-800 p-6 rounded grid gap-4">

//         <input
//           className="p-2 rounded bg-gray-700"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <textarea
//           className="p-2 rounded bg-gray-700"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <input
//           className="p-2 rounded bg-gray-700"
//           placeholder="GitHub Link"
//           value={form.githubLink}
//           onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
//         />

//         <input
//           className="p-2 rounded bg-gray-700"
//           placeholder="Live Link"
//           value={form.liveLink}
//           onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
//         />

//           <button onClick={addProject} className="bg-green-600 p-2 rounded">
//             Add
//           </button>
//        </div>
//        </div>

//   )
// }

// export default CrudProjectsNoImage;


