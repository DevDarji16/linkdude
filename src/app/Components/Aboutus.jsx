'use client'
import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar'
import { ThemeContext } from "@/context/ThemeContext";
import { LoggedIn } from "@/context/LoggedIn";
import Image from 'next/image';
import Footer from './Footer';

const Aboutus = () => {
  const { theme } = useContext(ThemeContext);


  return (
    <div className='overflow-hidden '>

    <div className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}  w-screen overflow-y-auto`}>
      <Navbar />
      <main className={`h-full w-full  max-w-4xl mx-auto px-4 pt-28 py-12 selection:text-green-500`}>

        <h1 className="text-4xl font-bold mb-4 text-center font-myfont">About Lyncnest</h1>

        <p className={`text-lg mb-8 text-center ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`}>
        Lyncnest is a modern <span className='bg-gradient-to-tr from-blue-400 to-purple-700 text-transparent bg-clip-text font-bold'>link-in-bio</span> platform that helps users showcase their content and organize multiple spaces — with more features like web templates coming soon.

        </p>

        <section className="grid md:grid-cols-2 gap-8">
          <div className={`${theme === 'dark' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} flex flex-col items-center shadow-md rounded-2xl p-6 border border-gray-300`}>
            <Image src={'/images/myimage.jpg'} width={100} height={100} className='rounded-full h-24 sm:h-26 object-cover' alt='Frontend Developer Image'/>
            <h1 className='font-bold text-xl'>Dev Darji</h1>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-tr from-emerald-400 to-indigo-600 text-transparent bg-clip-text ">-Frontend Developer</h2>
            <p className={`${theme === 'light' ? 'text-gray-300' : 'text-gray-800'} text-center`}>
  The frontend of Lyncnest is built using <span className="font-medium">Next.js (App Router)</span> and <span className="font-medium">Tailwind CSS</span>, focusing on delivering a clean, responsive, and accessible user experience. The interface is designed with modern UI practices, reusable components, and performance in mind to ensure seamless navigation across all devices.
</p>

          </div>

          <div className={`${theme === 'dark' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} flex flex-col items-center shadow-md rounded-2xl p-6 border border-gray-300`}>
          <Image src={'/images/mehulimage.jpg'} width={100} height={100} className='rounded-full h-24 sm:h-26 object-cover' alt='Backend Developer Image'/>
          <h1 className='font-bold text-xl'>Mehul Soni</h1>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-tr from-emerald-400 to-indigo-600 text-transparent bg-clip-text">-Backend Developer</h2>
            <p className={`${theme === 'light' ? 'text-gray-300' : 'text-gray-800'} text-center`}>
  The backend of Lyncnest is developed using <span className="font-medium">Node.js</span>, <span className="font-medium">Express</span>, and <span className="font-medium">MongoDB</span>. It manages user authentication, database operations, API routing, and all core server-side functionality to ensure secure and efficient data handling.
</p>

          </div>
        </section>

        <div className={`mt-12 text-center ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
          <p>We’ve worked together to make Lyncnest powerful, customizable, and easy to use for creators everywhere.</p>
        </div>
      </main>
    </div>
      <Footer/>
    </div>
  )
}

export default Aboutus;
