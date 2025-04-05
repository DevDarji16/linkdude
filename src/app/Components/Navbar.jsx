'use client'
import Link from 'next/link'
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import React, { useState } from 'react'
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { LoggedIn } from "@/context/LoggedIn";
import { MdLightMode, MdOutlineDarkMode,MdArrowForward  } from 'react-icons/md';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)
    const { loggedInData } = useContext(LoggedIn);
    // const [isLoggedIn,setIsLoggedIn]=useState(loggedInData.isLoggedIn)
  
  
  return (
    <div className='fixed z-40 select-none w-full '>
     
      <div className='flex justify-center'>
        <div className={`${theme === 'light' ? 'text-white bg-gray-500/30' : 'text-black bg-gray-400/30'} w-full max-w-[300px] sm:max-w-[625px]  rounded-b-3xl backdrop-blur-[8px] ${menuOpen?'translate-y-[0]':'-translate-y-[82px]'} duration-300 ease-in-out transition-transform`}>
        <div className='flex flex-col gap-2  pt-2 sm:pt-2'>
        <Link href={'/about-us'}> <div className='text-center text-[15px]  flex justify-center items-center gap-1 '>About us</div></Link>
        <div className='px-6 w-full'>

        <div className='border border-gray-500 w-full'></div>
        </div>
        <Link href={`${loggedInData?'/workspace':'/register'}`} > <div className='text-center text-[15px]  flex justify-center items-center gap-1 '>{loggedInData?'Workspace':'Get Started'} <MdArrowForward  size={21} /></div></Link>
          <div className='flex justify-between  p-4  sm:p-2 sm:px-4 h-full  items-center'>
            {menuOpen?
            <IoMdClose onClick={()=>setMenuOpen(!menuOpen)} className='flex sm:hidden ' size={23}/>
            :<IoIosMenu onClick={()=>setMenuOpen(!menuOpen)} className='flex sm:hidden ' size={23} />}
          
            <Link href={'/'}><div className='font-myfont text-xl font-semibold'>LyncNest</div></Link>
            <div className='flex justify-center items-center '>

              <div className=' cursor-pointer' onClick={toggleTheme}>{theme === 'dark' ? <MdOutlineDarkMode size={27} /> : <MdLightMode size={27} />}</div>
              <Link href={'/about-us'}> <div className='text-[17px] hover:text-green-500 hidden sm:flex cursor-pointer duration-300 px-5'>About us</div></Link>
              <Link href={`${loggedInData?'/workspace':'/register'}`}  ><div className=' hover:bg-transparent font-bold p-2 hidden sm:flex sm:items-center sm:gap-1 sm:p-3 rounded-full duration-300'>{loggedInData?'Workspace':'Get Started'} 
              </div></Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar