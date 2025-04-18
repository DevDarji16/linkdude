// components/GetStartedButton.tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function GetStartedButton({loggedIn}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="relative cursor-pointer inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-xl hover:shadow-2xl group"
    >
      {/* Glowing Ring */}
      <span className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>

      {/* Text + Icon */}
      <span className="relative z-10 flex items-center gap-2 text-lg tracking-wide">
        {loggedIn?'Workspace':'Get Started'}
        
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}
