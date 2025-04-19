"use client";

import { useState, useContext, useMemo } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeContext } from "@/context/ThemeContext";
import Navbar from "./Navbar";
import MeteorsBackground from "./MeteorCanvas";
import Toast from "./Toast";
import Footer from "./Footer";

export default function RateUsPage() {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "light";

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({ email: "", rating: "", message: "" });

    const handleSubmit = () => {
        let valid = true;
        const newErrors = { email: "", rating: "" };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }
        if (message.trim().length === 0) {
            newErrors.message = "Please write your feedback.";
            valid = false;
        }


        if (rating === 0) {
            newErrors.rating = "Please select a rating.";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            fetch('https://lyncnest-a5aq.onrender.com/feedback/sendfeedback',
                {
                    method: 'POST',
                    credentials: 'include',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email ,content:`${categories[currectCategory]}: ${message}`,stars:rating})
                })
                .then(response => response.json())
                .then(data => {
                    setRating(0);
                    setHover(0);
                    setEmail("");
                    setMessage("");
                    setErrors({ email: "", rating: "" });
                    setToastMessage('Thanks for rating us!')
                    setShowToast(true)
                    setTimeout(()=>{
                        setShowToast(false)
                    },2000)
                })
        }
    };
    const categories=['Features Request','Bug Report','User Experience','Design Feedback','Others']
    const [currectCategory,setCurrentCategory]=useState(0)

    return (
        <div className={`${isDark ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
            <Navbar />
             <MeteorsBackground />
             <Toast message={toastMessage} showToast={showToast} close={()=>setShowToast(false)}/>


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
                    <h2 className="text-2xl font-bold text-center">Rate Linkdude</h2>

                    {/* Star Rating */}
                    <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                    className="mx-1 transition-transform transform hover:scale-110 focus:outline-none"
                                >
                                    <Star
                                        size={30}
                                        fill={starValue <= (hover || rating) ? "#facc15" : "none"}
                                        stroke="#facc15"
                                    />
                                </button>
                            );
                        })}
                    </div>
                    {errors.rating && (
                        <p className="text-sm text-red-500 text-center -mt-2">{errors.rating}</p>
                    )}

                    <div className="space-y-1">
                        <Input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${isDark
                                ? "bg-zinc-800 border-zinc-700 text-white"
                                : "bg-white border-gray-300 text-black"
                                } ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        {categories.map((category,index)=>{
                           return <div key={index} onClick={()=>setCurrentCategory(index)} className={`${currectCategory===index?'bg-yellow-500 text-gray-900':'text-white'} border border-gray-300 p-1.5  rounded-full cursor-pointer hover:bg-yellow-500 hover:text-gray-900`}>{category}</div>
                        })}
                    </div>
                    <div className="space-y-1">
                        <Textarea
                            placeholder="Your feedback or suggestions..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={`${isDark
                                ? "bg-zinc-800 border-zinc-700 text-white"
                                : "bg-white border-gray-300 text-black"
                                } ${errors.message ? "border-red-500" : ""}`}
                        />
                        {errors.message && (
                            <p className="text-sm text-red-500">{errors.message}</p>
                        )}
                    </div>


                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        className={`cursor-pointer w-full py-2 font-semibold rounded-xl transition-colors duration-300 ${isDark
                            ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                            : "bg-black hover:bg-gray-800 text-white"
                            }`}
                    >
                        Submit Feedback
                    </Button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
