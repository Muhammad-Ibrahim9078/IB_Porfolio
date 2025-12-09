import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // <-- LOADING STATE

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  async function sendMessage() {
    const { fullName, email, phone, service, message } = form;

    if (!fullName || !email || !phone || !service || !message) {
      Swal.fire("Error!", "Please fill all required fields!", "error");
      return;
    }

    try {
      setLoading(true); // START LOADING

      await addDoc(collection(db, "contact"), {
        fullName,
        email,
        phone,
        service,
        message,
        created_at: serverTimestamp(),
        read: false, // NEW FIELD so admin panel me unread filter kaam kare
      });

      Swal.fire("Success!", "Your message has been sent!", "success");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setLoading(false); // END LOADING
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex justify-center items-center text-white">
      <div
        className="max-w-lg w-full bg-gray-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700"
        data-aos="fade-up"
      >
        <h1
          className="text-4xl font-extrabold mb-6 text-center tracking-wide"
          data-aos="zoom-in"
        >
          Contact Us
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          data-aos="fade-right"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          data-aos="fade-left"
        />

        <input
          type="text"
          placeholder="Contact Number"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          data-aos="fade-right"
        />

        <input
          type="text"
          placeholder="Service You Need"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition-all"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          data-aos="fade-left"
        />

        <textarea
          placeholder="Write your message..."
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 h-32 focus:border-blue-500 outline-none transition-all"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          data-aos="fade-up"
        ></textarea>

        {/* SEND BUTTON WITH LOADING */}
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`w-full p-3 rounded-lg font-semibold text-lg transition-all
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"}
            shadow-lg hover:shadow-blue-800/40
          `}
          data-aos="zoom-in"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </div>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}
