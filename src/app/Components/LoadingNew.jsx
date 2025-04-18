import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AdvancedLoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 backdrop-blur-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center justify-center space-y-6 text-white select-none">
            {/* Glowing Logo Text */}
            <motion.div
              className="text-5xl font-bold tracking-wide font-myfont"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              LinkDude
            </motion.div>

            {/* Rotating Loader Icon */}
            <motion.div
              className="text-pink-400"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Loader2 size={36} className="animate-spin" />
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 animate-pulse"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              className="text-xs text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Powering up your space...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
