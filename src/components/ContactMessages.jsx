import React, { useEffect, useState } from "react";
import { db } from "../config/firebase.js";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all"); // all | unread

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "contact"));
    const data = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setMessages(data);
  };

  const markAsRead = async (id) => {
    await updateDoc(doc(db, "contact", id), { read: true });
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)));
  };

  const deleteMessage = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (confirm.isConfirmed) {
      await deleteDoc(doc(db, "contact", id));
      setMessages((prev) => prev.filter((msg) => msg.id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Message has been deleted.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  const filteredMessages = filter === "unread" ? messages.filter((m) => !m.read) : messages;
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="text-white p-4 sm:p-6 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold">Contact Messages</h2>

        {/* FILTER BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
              filter === "all" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              filter === "unread" ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Unread
            <span className="bg-red-500 text-white px-2 rounded-md text-sm">{unreadCount}</span>
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="grid gap-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 sm:p-5 rounded-xl shadow-lg border transition-all flex flex-col sm:flex-col gap-3
              ${msg.read ? "bg-green-900/30 border-green-500" : "bg-gray-800 border-gray-600"}`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <h3 className="text-xl font-semibold">{msg.fullName}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{msg.message}</p>
                <p className="text-gray-300 text-sm sm:text-base"><strong>Email:</strong> {msg.email}</p>
                <p className="text-gray-300 text-sm sm:text-base"><strong>Contact:</strong> {msg.phone}</p>
                <p className="text-gray-300 text-sm sm:text-base"><strong>Service:</strong> {msg.service}</p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:mt-0 w-full sm:w-auto">
                {!msg.read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    Mark as Read ✓
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                >
                  Delete 🗑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
