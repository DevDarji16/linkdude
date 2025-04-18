
import React, { useEffect, useState, memo } from 'react'
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import Link from 'next/link';

const Spaces = (props) => {

  const [spaceChange, setSpaceChange] = useState(null)
  return (
    <div onClick={() => { spaceChange === null ? '' : setSpaceChange(null) }}>

      <div>
        <div className={`py-4 px-2 text-xl`}>Your spaces</div>
        <div className='flex flex-wrap gap-4'>
          <div onClick={() => {
            props.setSpaceClick(!props.spaceClick); 
          }} className='h-32 w-32 cursor-pointer rounded-3xl hover:text-white relative border  hover:bg-black transition-all duration-200  flex flex-col justify-center items-center'>
            <div className='text-4xl'><FaPlus /></div>
            <div className='font-semibold absolute bottom-4'>Add Space</div>
          </div>
          { }

          {props.spaces.map((space, index) => {
            return <div key={index}
              className=' h-32 w-32 rounded-3xl relative hover:text-white  border  hover:bg-black transition-all duration-200  flex flex-col justify-center items-center'>
              <div className='absolute right-2 top-3 cursor-pointer p-1' onClick={(e) => { e.stopPropagation(); spaceChange === null ? setSpaceChange(index) : setSpaceChange(null) }}><BsThreeDotsVertical /></div>
              <div onClick={e => e.stopPropagation()} className={`${spaceChange === index ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${props.theme==='light'?'bg-[#181b1e] text-white':'bg-white text-black'} duration-300 transition-all ease-in-out absolute right-7 top-3  p-2 rounded-lg  shadow-lg border text-black`}>
                <div className={`${props.theme==='light'?'hover:bg-[#24292e]':'hover:bg-gray-200'} text-center flex items-center cursor-pointer  mb-1 p-1 rounded-lg`} onClick={() => { props.setRenameSpace(space.name); props.setRenameNewSpace(space.name); setSpaceChange(false); props.setRenameMenu(!props.renameMenu) }}><MdOutlineEdit size={20} />Rename</div>
                <div className='border w-full'></div>
                <div className='text-center bg-red-400 rounded-lg p-1 mt-1 px-2 cursor-pointer hover:bg-red-500 flex items-center gap-1' onClick={() => { props.setSpaceDeleteClick(!props.spaceDeleteClick); props.setSpaceDeleteName(space.name); setSpaceChange(false) }}><RiDeleteBin5Line /> Delete</div>
              </div>
              <Link href={`/space/${props.userData.username}/${space.name}`}> <div className='font-semibold py-12 bottom-4 flex text-xl items-center'>{space.name} </div>
              </Link>
            </div>
          })}

        </div>
      </div>
    </div>
  )
}

export default memo(Spaces)