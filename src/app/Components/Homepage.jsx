'use client'
import Typed from 'typed.js'
import React, { useRef, useEffect, useMemo } from 'react'
import MeteorCanvas from './MeteorCanvas';
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Image from 'next/image';
import { motion } from "framer-motion";
import Link from 'next/link'
import { LuUserRoundCheck } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import Footer from './Footer';

const arr = ['create', 'share', 'inspire']
const Homepage = () => {
  const intro = useRef(null)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const features = [
    {
      title: "Customizable Spaces",
      description: "Create multiple spaces, each with a unique URL, and customize them to match your brand.",
      icon: "🌐",
    },
    {
      title: "Live Preview",
      description: "Instantly see how your page looks as you edit your links and layout.",
      icon: "👀",
    },
    {
      title: "Drag & Drop",
      description: "Easily reorder your links with a simple drag-and-drop feature.",
      icon: "🖱️",
    },
    {
      title: "Pre-Made Templates",
      description: "Choose from multiple beautifully designed templates to get started quickly.",
      icon: "🎨",
    },
    {
      title: "One-Click Sharing",
      description: "Share your Lyncnest profile with a unique link across all platforms.",
      icon: "🔗",
    },
    {
      title: "Fast & Mobile-Friendly",
      description: "Optimized for speed and responsive on all devices.",
      icon: "⚡",
    },
  ];

  const options = useMemo(() => ({
    strings: arr,
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 500,
    loop: true,
  }), []);

  useEffect(() => {
    const typed = new Typed(intro.current, options);
    return () => typed.destroy();
  }, [options]);


  return (
    <div className='relative selection:text-green-500 overflow-hidden'>
      <div className={`${theme === 'dark' ? 'bg-[#F3F3F1] text-black' : 'bg-black text-white'} relative h-screen bg-[#F3F3F1] flex justify-center items-center`}>


        <MeteorCanvas />
        <div className='selection:text-green-500  text-center z-20 font-extrabold  text-5xl sm:text-7xl'> One simple link for everything <br />  you <span ref={intro} className='bg-gradient-to-tr from-purple-600 to-blue-400 text-transparent bg-clip-text'></span> </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-100' : 'bg-black'} w-full px-12 `}>
        <div className='w-full border border-gray-400'></div>
      </div>
      <section className={`${theme === 'dark' ? 'bg-gray-100 text-white' : 'bg-black text-white'} relative py-16 pb-24 pt-20`}>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="max-w-6xl mx-auto px-6 text-center relative flex flex-col items-center ">

            <motion.div
              className="absolute right-1/2 top-[-30px] h-24 w-48 rounded-full bg-green-400 blur-[20px] "
              animate={{ y: [0, -10, 0], x: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-[-30px] h-24 w-48 rounded-full bg-green-400 blur-[20px] "
              animate={{ y: [0, -10, 0], x: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-[-30px] h-24 w-24 rounded-full bg-green-400 blur-[20px] "
              animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-1/2 top-[-30px] h-24 w-24 rounded-full bg-green-400 blur-[20px] "
              animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <h2 className="font-myfont  selection:text-purple-500 text-4xl font-bold  mb-6 relative ">
              Why Choose <span className="font-bold bg-clip-text text-transparent bg-gradient-to-tr from-purple-700 to-blue-400">Lyncnest?</span>
            </h2>
          </div>
          <p className={`${theme === 'light' ? 'text-white' : 'text-black'} text-lg mb-12`}>
            The easiest way to manage and share all your important links in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`${theme === 'dark' ? 'bg-white' : 'bg-gray-900'}  p-6 rounded-2xl shadow-md hover:shadow-lg transition`}>
                <div className="text-blue-600 text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className={`${theme === 'dark' ? 'text-gray-800' : 'text-gray-100'} text-xl font-semibold  mb-2`}>{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className={`${theme === 'dark' ? 'bg-gray-100' : 'bg-black'} w-full px-12 `}>
        <div className='w-full border border-gray-400'></div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-100 text-black' : 'bg-black text-white'} p-2 pb-20 flex flex-col items-center relative  z-30 w-screen  `}>
        <motion.div
          className="absolute right-1/2 h-32 w-32 rounded-full bg-green-400 blur-[20px]"
          animate={{ y: [0, -10, 0], x: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 h-32 w-32 rounded-full bg-green-400 blur-[20px]"
          animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-32 w-32 rounded-full bg-green-400 blur-[20px]"
          animate={{ y: [-10, 10, -10], x: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className='z-10 font-myfont selection:text-purple-500  mt-12 text-4xl'>

          How it works?

        </div>
        <div className='mt-10 z-10 flex select-none flex-wrap gap-4 justify-center'>
          <div className={` rounded-xl relative border  w-72 h-52 p-7 flex flex-col items-center`}>

            <LuUserRoundCheck size={40} />

            <div className='font-myfont text-[19px] mt-2'>Sign Up</div>
            <div className='mt-4'>Create an account- Start for free</div>
          </div>
          <div className='rounded-xl  border w-72 h-52 p-7 flex flex-col items-center'>
            <IoMdAddCircleOutline size={40} />

            <div className='font-myfont text-[19px] mt-2'>Create a Space</div>
            <div className='mt-4 text-center'>Choose a template or start blank.</div>
          </div>
          <div className='rounded-xl  border w-72 h-52 p-7 flex flex-col items-center'>
            <MdOutlineDashboardCustomize size={40} />

            <div className='font-myfont text-[19px] mt-2 text-center'>Add & Customize Links</div>
            <div className='text-center mt-4'>Name, reorder, and personalize your links.</div>
          </div>
          <div className='rounded-xl  border w-72 h-52 p-7 flex flex-col items-center'>
            <MdOutlinePublishedWithChanges size={40} />

            <div className='font-myfont text-[19px] mt-2'>Publish & Share</div>
            <div className='mt-4 text-center'>Get a unique URL and share it anywhere!</div>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-gray-100' : 'bg-black'} w-full px-12 `}>
        <div className='w-full border border-gray-400'></div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default Homepage