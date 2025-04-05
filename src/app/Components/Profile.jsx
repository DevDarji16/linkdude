import React from 'react'

import { LuPencil } from "react-icons/lu";
const Profile = ({showProfile,setShowProfile}) => {
  return (
    <div className='relative'>
        <div className='absolute bottom-12.5 sm:bottom-6.5 left-14'>
        <LuPencil onClick={()=>{setShowProfile(!showProfile)}} className='cursor-pointer '  size={18} />
          </div>
    </div>
  )
}

export default Profile