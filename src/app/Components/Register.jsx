'use client'
import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Link from 'next/link';
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';
import MeteorsBackground from './MeteorCanvas';
const Register = () => {
    const {theme,toggleTheme}=useContext(ThemeContext)

  return (
    <div>
      <MeteorsBackground/>
                    <div className='absolute top-4 right-6 sm:top-11 sm:right-20 cursor-pointer' onClick={toggleTheme}>{theme === 'light' ? <MdOutlineDarkMode size={27} className='text-white' /> : <MdLightMode size={27} />}</div>
        
      <div className={`${theme === 'dark' ? 'bg-[#F3F3F1] text-black' : 'bg-[#181b1e] text-white'}  h-screen  `}>

        <Link href={'/'} className='absolute' >
          <div className='sm:pt-8 select-none  pt-4 pl-4 inline-block sm:pl-8 text-xl sm:text-2xl font-semibold'>
            Lyncnest
          </div>
        </Link> 

        <div className='flex  justify-center items-center min-h-screen p-3'>

          <div className={` shadow-lg ${theme==='light'?'text-white bg-gray-800':'text-black bg-white'} z-10   p-6 sm:max-w-2xl rounded-lg `}>
            <div className='space-y-2'>
              <div className='font-extrabold text-2xl sm:text-4xl text-center'>Start with Lyncnest</div>
              <div className='text-gray-500 text-[15px] text-center'>Sign up for free!</div>
              <Link href={'https://lyncnest-a5aq.onrender.com/auth/google'}><div className={`mt-6 border border-gray-300 rounded-full mt-4 flex p-2 gap-1 text-[15px] justify-center items-center cursor-pointer ${theme==='light'?'hover:bg-gray-700':'hover:bg-gray-100'}  font-semibold`}><FcGoogle size={23} />Sign up with Google</div></Link>
              <div className={`border border-gray-300 rounded-full mt-4 flex p-2 gap-1 text-[15px] justify-center items-center cursor-pointer ${theme==='light'?'hover:bg-gray-700':'hover:bg-gray-100'}  font-semibold`}><BsLinkedin size={20} className='text-blue-500' />Sign up with LinkedIn</div>
              <div className='text-center text-[13px] text-gray-500 mt-6'>Already have an account? <Link href={'/login'} className='text-blue-500 hover:underline'>Login</Link></div>
              <div className='mt-6 text-[12px] text-gray-500 text-center'>By signing up, you agree to our <Link href={'/terms-and-conditions'} className='underline'>Terms and Conditions</Link> & <Link href={'/privacy-policy'} className='underline'>Privacy Policy</Link>  </div>
            </div>

          </div>
        </div>
      </div>
      <div className='px-2 bg-[#F3F3F1]'>
      <div className='border border-gray-300 w-full '></div>

      </div>
    </div>
  )
}

export default Register