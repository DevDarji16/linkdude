'use client'
import Typed from 'typed.js'
import React, { useRef,useEffect,useMemo } from 'react'
import MeteorCanvas from './MeteorCanvas';
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const arr=['create','share','inspire']
const Homepage = () => {
  const intro=useRef(null)
  const {theme,toggleTheme}=useContext(ThemeContext)

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
    <div className='relative'>
      <MeteorCanvas/>
        <div className={`${theme==='dark'?'bg-[#F3F3F1] text-black':'bg-black text-white'} h-screen bg-[#F3F3F1] flex justify-center items-center`}>
            <div className='select-none text-center z-20 font-extrabold  text-5xl sm:text-7xl'> One simple link for everything <br />  you <span  ref={intro} className='bg-gradient-to-tr from-purple-600 to-blue-400 text-transparent bg-clip-text'></span> </div>
        </div>
        
    </div>
  )
}

export default Homepage