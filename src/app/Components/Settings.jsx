'use client'
import React from 'react';
import Link from 'next/link';
import { IoMdSettings } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { LoggedIn } from "@/context/LoggedIn";

import { ThemeContext } from "@/context/ThemeContext";
const Settings = ({ settings,name, url,username, setSettings }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)
  const { setLoggedInData } = useContext(LoggedIn);

    const router = useRouter()
    const handleLogOut = () => {
        fetch("https://lyncnest-a5aq.onrender.com/logout", {
            credentials: "include",
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                    setLoggedInData(false);
                    router.replace('/')

            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className='relative ' onClick={(e) => e.stopPropagation()}>
            <div className={`${settings ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-46   duration-300 transition-all ease-in-out rounded-lg flex flex-col ${theme === 'light' ? 'bg-[#181b1e] text-white' : 'bg-gray-100'} items-center absolute bottom-22 sm:bottom-14 left-8  shadow-lg border p-2`}>
                <div className='text-[13px] '>Settings</div>
                <div className={`${theme==='light'?'border-gray-700':'border-gray-300'} border  w-full my-2`}></div>
                <div className='w-full flex justify-center'> <img src={url} className='rounded-full object-cover h-12 w-12' alt="" />
                </div>
                <div className='font-semibold text-[14px]'>@{username}</div>
                <div className='text-[15px]'>{name}</div>
                <div className={`${theme==='light'?'border-gray-700':'border-gray-300'} border  w-full my-2`}></div>
                <Link href={'/about-us'} className='w-full'>
                    <div className={`${theme === 'dark' ? 'hover:bg-gray-200' : 'hover:bg-[#24292e]'} text-center text-[13px] rounded-lg p-1`}>About us</div>
                </Link>
                <Link href={'/terms-and-condition'} className='w-full'>
                    <div className={`${theme === 'dark' ? 'hover:bg-gray-200' : 'hover:bg-[#24292e]'} text-center text-[13px] rounded-lg p-1`}>Terms and Condition</div>
                </Link>
                <Link href={'/privacy-policy'} className='w-full'>
                    <div className={`${theme === 'dark' ? 'hover:bg-gray-200' : 'hover:bg-[#24292e]'} text-[13px]  rounded-lg p-1 text-center`}>Privacy Policy</div>
                </Link>
                <div onClick={handleLogOut} className='text-[13px] cursor-pointer hover:bg-red-600 w-full bg-red-500 rounded-lg p-1 mt-1 font-semibold text-center'>
                    Log Out
                </div>
            </div>
            <div className='p-3 absolute bottom-9  sm:bottom-0   '>
                <div className={`${theme === 'dark' ? 'hover:bg-gray-200' : 'hover:bg-[#181b1e]'}  transition-all duration-300 rounded-lg inline-block p-2`}>
                    <IoMdSettings size={20} onClick={() => setSettings(!settings)} className='cursor-pointer' />
                </div>
            </div>
        </div>
    );
};

export default Settings;
