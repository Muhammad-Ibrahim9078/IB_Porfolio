import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { FaPenFancy } from "react-icons/fa";

export default function Feedback() {
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });

  // ---------- FETCH FEEDBACK ----------
  async function loadFeedback() {
    const q = query(
      collection(db, "feedback"),
      orderBy("created_at", "desc")
    );
    const snapshot = await getDocs(q);
    setFeedbacks(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  // ---------- SUBMIT FEEDBACK ----------
  async function submitFeedback() {
    if (!form.name || !form.message) {
      Swal.fire("Error", "All fields required", "error");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "feedback"), {
        name: form.name,
        message: form.message,
        created_at: serverTimestamp(),
        read: false,
      });

      Swal.fire("Thanks!", "Feedback submitted successfully", "success");
      setForm({ name: "", message: "" });
      setOpenForm(false);
      loadFeedback();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="feedback" className="bg-gray-900 text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-6">What People Say</h2>

        {/* ============ GIVE FEEDBACK BUTTON ============ */}
        <div className="mb-6">
          <button
            onClick={() => setOpenForm(!openForm)}
            className="flex items-center gap-2 bg-blue-600 px-5 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            <FaPenFancy />
            Give Feedback
          </button>

          {/* ============ FORM OPENS JUST BELOW BUTTON ============ */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openForm ? "max-h-[500px] mt-4" : "max-h-0"
            }`}
          >
            <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600 focus:outline-none"
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <textarea
                placeholder="Your Message"
                className="w-full mb-4 p-2 rounded bg-gray-900 border border-gray-600 h-28 resize-none focus:outline-none"
                value={form.message}
                onChange={e =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <button
                onClick={submitFeedback}
                disabled={loading}
                className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit Feedback"}
              </button>

            </div>
          </div>
        </div>

        {/* ============ FEEDBACK LIST ============ */}
        <div className="space-y-4">
          {feedbacks.length === 0 && (
            <p className="text-gray-400">No feedback yet.</p>
          )}

          {feedbacks.map(f => (
            <div
              key={f.id}
              className="bg-gray-800 p-5 rounded-xl border border-gray-700"
            >
              <h4 className="font-semibold text-lg">{f.name}</h4>
              <p className="text-gray-300 mt-2">{f.message}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
