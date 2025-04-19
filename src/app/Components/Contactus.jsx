"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Navbar from "./Navbar";
import MeteorsBackground from "./MeteorCanvas";
import Footer from "./Footer";

export default function ContactUsPage() {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "light";

    return (
        <div className={`${isDark ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
            <Navbar />
            <MeteorsBackground />

            <div
                className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${isDark
                    ? "bg-gradient-to-br from-zinc-900 to-zinc-800"
                    : "bg-gradient-to-br from-white to-gray-100"
                    }`}
            >
                <div
                    className={`w-full relative max-w-md p-6 rounded-2xl shadow-xl space-y-6 transition-all duration-300 ${isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
                        }`}
                >
                    <h2 className="text-2xl font-bold text-center">Contact Us</h2>
                    <p className="text-center text-lg">
                        Got questions, feedback, or need help? Reach out to us anytime at:
                    </p>
                    <div className="text-center">
                        <p className="text-yellow-500 font-semibold text-xl break-all">
                            sylverpixel@gmail.com
                            
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
