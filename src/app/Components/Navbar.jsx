'use client'
import Link from 'next/link'
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import React, { useState } from 'react'
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { MdLightMode, MdOutlineDarkMode,MdArrowForward  } from 'react-icons/md';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className='fixed z-40 select-none w-full '>
      {/* <div className='bg-white px-5 sm:px-10 flex items-center mt-4 mx-2 sm:mx-12 justify-between shadow-lg p-3 rounded-full'>
        <Link href={'/'}> <div className='font-bold text-xl sm:text-2xl '>Lyncnest</div></Link>
        <div className='gap-6 flex'>
          <Link href={'/templates'}><div className='sm:flex hidden text-gray-500 hover:bg-gray-100 p-1 rounded-lg'>Templates</div></Link>
          
        </div>
        <div className='flex items-center gap-2'>

          <Link href={'/register'}><div className='bg-green-400 text-black hover:bg-green-500 font-bold p-2.5 sm:p-3 rounded-full'>Get Started
          </div></Link>
          <div className='sm:hidden' onClick={() => setMenuOpen(!menuOpen)}><IoIosMenu size={25} /></div>
        </div>


      </div>
      <div className={`fixed top-0 left-0 h-screen ${theme==='dark'?'bg-white':'bg-gray-900'}  shadow-lg w-3/4 ${menuOpen?'translate-x-0':'-translate-x-full'} duration-300 ease-in-out transition-transform `}>
      <div className={` ${theme==='light'?'text-gray-300':'text-gray-600'} flex items-center gap-2 justify-end p-4`}>
      <div className=' cursor-pointer' onClick={toggleTheme}>{theme==='dark'?<MdOutlineDarkMode size={27}/>:<MdLightMode size={27}/>}</div>
      <IoMdClose size={30} onClick={() => setMenuOpen(false)}/>
      </div>
      <div className=' flex flex-col gap-4 items-start p-6 text-lg'>
        <Link href={'/templates'}><div className={`flex font-semibold  hover:bg-gray-100 p-1 rounded-lg hover:underline ${theme==='light'?'text-gray-300':'text-gray-600'}`}  onClick={() => setMenuOpen(false)}>Templates</div></Link>
        
        <div className='border w-full border-gray-300'></div>
        

      </div>
      </div> */}
      <div className='flex justify-center'>
        <div className={`${theme === 'light' ? 'text-white bg-gray-500/30' : 'text-black bg-gray-400/30'} w-full max-w-[300px] sm:max-w-[625px]  rounded-b-3xl backdrop-blur-[8px] ${menuOpen?'translate-y-[0]':'-translate-y-[82px]'} duration-300 ease-in-out transition-transform`}>
        <div className='flex flex-col gap-2  pt-2 sm:pt-2'>
        <Link href={'/about-us'}> <div className='text-center text-[15px]  flex justify-center items-center gap-1 '>About us</div></Link>
        <div className='px-6 w-full'>

        <div className='border border-gray-500 w-full'></div>
        </div>
        <Link href={'/register'}> <div className='text-center text-[15px]  flex justify-center items-center gap-1 '>Get Started <MdArrowForward  size={21} /></div></Link>
          <div className='flex justify-between  p-4  sm:p-2 sm:px-4 h-full  items-center'>
            {menuOpen?
            <IoMdClose onClick={()=>setMenuOpen(!menuOpen)} className='flex sm:hidden ' size={23}/>
            :<IoIosMenu onClick={()=>setMenuOpen(!menuOpen)} className='flex sm:hidden ' size={23} />}
          
            <Link href={'/'}><div className='font-myfont text-xl font-semibold'>LyncNest</div></Link>
            <div className='flex justify-center items-center '>

              <div className=' cursor-pointer' onClick={toggleTheme}>{theme === 'dark' ? <MdOutlineDarkMode size={27} /> : <MdLightMode size={27} />}</div>
              <Link href={'/about-us'}> <div className='text-[17px] hover:text-green-500 hidden sm:flex cursor-pointer duration-300 px-5'>About us</div></Link>
              <Link href={'/register'}><div className='bg-green-500  hover:bg-green-600 font-bold p-2 hidden sm:flex sm:p-3 rounded-full duration-300'>Get Started
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