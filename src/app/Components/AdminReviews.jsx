"use client";

import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Navbar from "./Navbar";
import { Trash2 } from "lucide-react";

export default function AdminReviews() {
  const { theme } = useContext(ThemeContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const isDark = theme === "light";

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("https://lyncnest-a5aq.onrender.com/feedback/get/getfeedback");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const confirmDelete = (fb) => {
    setSelectedFeedback(fb);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    if (!selectedFeedback) return;
    try {
      const res = await fetch("https://lyncnest-a5aq.onrender.com/feedback/deletefeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId: selectedFeedback._id }),
      });

      if (!res.ok) throw new Error("Failed to delete feedback");

      setFeedbacks((prev) => prev.filter((fb) => fb._id !== selectedFeedback._id));
      setShowPopup(false);
      setSelectedFeedback(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete feedback.");
    }
  };

  return (
    <div className={`${isDark ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto pt-36">
        <h1 className="text-3xl font-bold text-center mb-6">What People Are Saying</h1>

        {loading ? (
          <p className="text-center">Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center">No feedback yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((fb) => (
              <div
                key={fb._id}
                className={`relative rounded-xl shadow-lg p-4 transition duration-300 ${
                  isDark ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"
                }`}
              >
                <button
                  onClick={() => confirmDelete(fb)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Delete Feedback"
                >
                  <Trash2 size={18} />
                </button>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(fb.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="font-semibold">{fb.email}</p>
                <p className="mt-2">{fb.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Popup */}
      {showPopup && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 w-full max-w-md mx-auto shadow-lg ${isDark ? "bg-zinc-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-xl font-semibold mb-4">Delete Feedback?</h2>
            <p className="text-sm text-gray-400 mb-2">Email: <span className="font-medium">{selectedFeedback.email}</span></p>
            <p className="text-sm mb-4">"{selectedFeedback.content}"</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 cursor-pointer text-white hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
