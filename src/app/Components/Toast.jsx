import React from 'react'
import { IoMdCheckmarkCircle, IoMdClose } from 'react-icons/io'
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const Toast = ({message,close,showToast}) => {
      const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <div>
        <div className={`z-20 fixed bottom-4 right-4 ${theme==='light'?'bg-gray-200 text-black border-2 border-black':'bg-gray-900 text-white  border-2 border-gray-500'} shadow-lg p-4 rounded-[7px] flex items-center gap-1 transition-all duration-300 ease-in-out ${showToast ? 'translate-x-0' : 'translate-x-[130%]'}`}><IoMdCheckmarkCircle size={20} className='text-green-500'/>{message}  <IoMdClose size={18} className='cursor-pointer ' onClick={close}/></div>
    </div>
  )
}

export default Toast