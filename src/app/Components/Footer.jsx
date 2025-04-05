
import Link from 'next/link'
import React, { useContext } from 'react'
import { ThemeContext } from "@/context/ThemeContext";
const Footer = () => {
      const { theme } = useContext(ThemeContext);
    
  return (
    <div>
        <footer className={`${theme === 'dark' ? 'bg-gray-100' : 'bg-black'} relative text-white py-6`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h2 className={`${theme==='light'?'text-gray-100':'text-black'} text-2xl font-bold font-myfont `}>Lyncnest</h2>
            <p className="text-gray-400 text-sm">Your all-in-one link management tool</p>
          </div>

          <div className={`${theme==='dark'?'text-gray-600':'text-gray-200'} flex space-x-6 text-gray-600"`}>
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/about-us" className="  transition">About us</Link>
            <Link href="/contact-us" className=" transition">Contact us</Link>
            <Link href="/rate-us" className="  transition">Rate us</Link>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/terms-and-condition" className="text-gray-400  transition">Terms and Conditions</a>
            <a href="/privacy-policy" className="text-gray-400  transition">Privacy Policy</a>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          © 2025 Lyncnest. All rights reserved.
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer