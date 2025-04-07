"use client";

import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Navbar from "./Navbar";

export default function AdminReviews() {
    const { theme } = useContext(ThemeContext);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className={`${isDark ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
            <Navbar />
            <div className="p-6 max-w-5xl  mx-auto pt-36 ">
                <h1 className="text-3xl font-bold  text-center mb-6">What People Are Saying</h1>

                {loading ? (
                    <p className="text-center">Loading feedback...</p>
                ) : feedbacks.length === 0 ? (
                    <p className="text-center">No feedback yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {feedbacks.map((fb) => (
                            <div
                                key={fb._id}
                                className={`rounded-xl shadow-lg p-4 transition duration-300 ${isDark ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"
                                    }`}
                            >
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
        </div>
    );
}
