import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
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
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Feedback Management</h1>

      <div className="grid gap-4">
        {data.map(f => (
          <div
            key={f.id}
            className={`p-4 rounded-xl border flex justify-between items-center
            ${f.read ? "bg-green-900/40 border-green-600" : "bg-gray-800 border-gray-700"}`}
          >
            <div>
              <h3 className="font-bold">{f.name}</h3>
              <p className="text-gray-300">{f.message}</p>
            </div>

            <div className="flex gap-3">
              {!f.read && (
                <button
                  onClick={() => markRead(f.id)}
                  className="px-3 py-1 bg-blue-600 rounded"
                >
                  ✓ Read
                </button>
              )}

              <button
                onClick={() => remove(f.id)}
                className="px-3 py-1 bg-red-600 rounded"
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
