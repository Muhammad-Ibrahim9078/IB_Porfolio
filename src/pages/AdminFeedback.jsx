import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function AdminFeedback() {
  const [data, setData] = useState([]);

  async function loadData() {
    const snap = await getDocs(collection(db, "feedback"));
    setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => {
    loadData();
  }, []);

  async function remove(id) {
    const res = await Swal.fire({
      title: "Delete?",
      text: "This feedback will be removed",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (res.isConfirmed) {
      await deleteDoc(doc(db, "feedback", id));
      loadData();
    }
  }

  async function markRead(id) {
    await updateDoc(doc(db, "feedback", id), { read: true });
    loadData();
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Feedback Management</h1>

      <div className="grid gap-4">
        {data.map(f => (
          <div
            key={f.id}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:justify-between sm:items-center
              ${f.read ? "bg-green-900/40 border-green-600" : "bg-gray-800 border-gray-700"}`}
          >
            <div className="mb-3 sm:mb-0">
              <h3 className="font-bold text-lg">{f.name}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{f.message}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {!f.read && (
                <button
                  onClick={() => markRead(f.id)}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                >
                  ✓ Read
                </button>
              )}

              <button
                onClick={() => remove(f.id)}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
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
