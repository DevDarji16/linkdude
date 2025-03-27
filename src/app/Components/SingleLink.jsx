// 'use client'
import React,{memo} from 'react'
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { MdArrowOutward } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
const SingleLink = (props) => {
      const {theme,toggleTheme}=useContext(ThemeContext)
  
    const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
          } = useSortable({id: props.id});
          const style = {
            transform: CSS.Transform.toString(transform),
            transition,
          };
          const formatURL = (url) => {
            if (!url.startsWith("http://") || !url.startsWith("https://")) {
              return `https://${url}`;
            }
            return url;
          };
  return (
    <div ref={setNodeRef} style={style} className={`${theme==='light'?'bg-[#363d44]':'bg-white'} p-3 flex items-center gap-5 justify-between  rounded-xl `}>
                <div className='w-full'>
                  <div className='mb-1'>{props.name}</div>
                  <div className='text-gray-500 text-[14px] max-w-[230px] sm:max-w-[500px] truncate'>{props.url}</div>
                  <div className='flex mt-4 justify-between'>
                    <div>
                     <a href={formatURL(props.url)} target='_blank'><MdArrowOutward size={20} className='inline-block cursor-pointer' /></a> 
                    </div>
                    <div><RiDeleteBin5Line onClick={() => { props.setDeleteMenu(!props.deleteMenu);props.setDeleteID(props.id) }} className='text-red-500 cursor-pointer' /></div>
                  </div>
                </div>
    
                <div {...attributes} {...listeners}><PiDotsSixVerticalBold size={20} className='text-gray-500 cursor-grabbing' />
                </div>
              </div>
  )
}

export default memo(SingleLink)