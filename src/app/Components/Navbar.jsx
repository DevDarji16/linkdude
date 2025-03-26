'use client'
import Link from 'next/link'
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import React, { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className='fixed select-none w-full '>
      <div className='bg-white px-5 sm:px-10 flex items-center mt-4 mx-2 sm:mx-12 justify-between shadow-lg p-3 rounded-full'>
        <Link href={'/'}> <div className='font-bold text-xl sm:text-2xl '>Lyncnest</div></Link>
        <div className='gap-6 flex'>
          <Link href={'/templates'}><div className='sm:flex hidden text-gray-500 hover:bg-gray-100 p-1 rounded-lg'>Templates</div></Link>
          {/* <Link href={'/discover'}><div className='sm:flex hidden text-gray-500 hover:bg-gray-100 p-1 rounded-lg'>Discover</div></Link>
          <Link href={'/workspace'}><div className='sm:flex hidden text-gray-500 hover:bg-gray-100 p-1 rounded-lg'>Workspace</div></Link> */}
        </div>
        <div className='flex items-center gap-2'>

          <Link href={'/register'}><div className='bg-green-400 text-black hover:bg-green-500 font-bold p-2.5 sm:p-3 rounded-full'>Get Started
          </div></Link>
          <div className='sm:hidden' onClick={() => setMenuOpen(!menuOpen)}><IoIosMenu size={25} /></div>
        </div>


      </div>
      <div className={`fixed top-0 left-0 h-screen bg-white shadow-lg w-3/4 ${menuOpen?'translate-x-0':'-translate-x-full'} duration-300 ease-in-out transition-transform `}>
      <div className='flex justify-end p-4'>
      <IoMdClose size={30} onClick={() => setMenuOpen(false)}/>
      </div>
      <div className=' flex flex-col gap-4 items-start p-6 text-lg'>
        <Link href={'/templates'}><div className='flex font-semibold text-gray-600 hover:bg-gray-100 p-1 rounded-lg hover:underline'  onClick={() => setMenuOpen(false)}>Templates</div></Link>
        <div className='border w-full border-gray-300'></div>
        <Link href={'/discover'}><div className='flex font-semibold text-gray-600 hover:bg-gray-100 p-1 rounded-lg hover:underline' onClick={() => setMenuOpen(false)}>Discover</div></Link>
        <div className='border w-full border-gray-300'></div>

        <Link href={'/workspace'}><div className='flex font-semibold text-gray-600 hover:bg-gray-100 p-1 rounded-lg hover:underline' onClick={() => setMenuOpen(false)}>Workspace</div></Link>

      </div>
      </div>
    </div>
  )
}

export default Navbar