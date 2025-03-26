'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io';

const Template1 = () => {
  const [darklight, setDarkLight] = useState(false)
  const [addMenu, setAddMenu] = useState(false)
  const [skills, setSkills] = useState([])
  const [skillname, setSkillName] = useState('')

  const handleAddSkill = () => {
    if (skillname.length > 0) {
      setSkills([...skills, skillname])
      setSkillName('')
      setAddMenu(false)
    }
  }

  return (
    <div className='h-screen text-white flex justify-center w-screen bg-gray-950 overflow-y-auto p-6'>
      {/* Add Skill Modal */}
      <div onClick={() => setAddMenu(false)} className={`${addMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center text-black items-center mx-2 z-10 backdrop-blur-[3px]`}>
        <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-xl max-w-[300px] px-2 rounded-xl w-full">
          <div className='flex items-center mt-4 relative'>
            <div className='text-center w-full text-[17px] font-bold'>Add New Skill</div>
            <IoMdClose onClick={() => setAddMenu(false)} className='cursor-pointer hover:bg-gray-100 m-3 mt-4 rounded-lg absolute right-0' size={25} />
          </div>
          <div className='p-2 mt-4 w-full'>
            <input type="text" value={skillname} onChange={e => setSkillName(e.target.value)} placeholder='Add Skill' className='p-2 border rounded-lg w-full ' />
          </div>
          <button onClick={handleAddSkill} className='w-full bg-sky-400 font-bold mb-2 text-white hover:bg-sky-500 p-2 rounded'>Add Skill</button>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-xl'>

        {/* Hero Section */}
        <div className='flex items-center mt-28 gap-6'>
          <div>
            <div className='max-w-xl text-4xl sm:text-6xl font-semibold w-full' contentEditable suppressContentEditableWarning>hi, I'm dev👋🏻</div>
            <div className='max-w-xl mt-3 text-xl w-full' contentEditable suppressContentEditableWarning>
              Second-year university student with good <br /> front-end skills and keen to learn new technologies.
            </div>
          </div>
          <div><Image src={'/images/userprofile.jpg'} className='rounded-full mt-4' width={100} height={100} alt='User Image' /></div>
        </div>

        {/* About Section */}
        <div className='mt-12'>
          <div className='relative inline-block text-2xl'>
            About
            <div className='absolute h-0.5 w-full bottom-0 left-0 bg-gradient-to-tr from-blue-500 to-purple-600'></div>
          </div>
        </div>
        <div contentEditable suppressContentEditableWarning className='mt-3 text-[14px] text-gray-400'>
          Welcome to my portfolio! I'm a passionate and creative developer with a deep love for building intuitive and engaging digital experiences. With a strong foundation in modern web technologies, I specialize in crafting sleek, high-performing websites and applications that not only look great but also deliver seamless user experiences.
        </div>

        {/* Skills Section */}
        <div className='mt-12'>
          <div className='relative inline-block text-2xl'>
            Skills
            <div className='absolute h-0.5 w-full bottom-0 left-0 bg-gradient-to-tr from-blue-500 to-purple-600'></div>
          </div>
        </div>
        <div className='mt-3 flex flex-wrap gap-2 text-black text-[14px] font-semibold'>
          {skills.map((skill, index) => (
            <div key={index} className='bg-white p-1 rounded-xl cursor-pointer hover:bg-gradient-to-tr hover:from-blue-500 hover:to-purple-500 hover:text-white duration-700 transition-all ease-in-out px-3'>{skill}</div>
          ))}
          <div onClick={() => setAddMenu(!addMenu)} className='bg-gray-100 bg-opacity-90 p-1 cursor-pointer rounded-xl px-3 flex items-center gap-1'><FaPlus size={12} />Add</div>
        </div>

        {/* Education Section */}
        <div className='mt-12'>
          <div className='relative inline-block text-2xl'>
            Education
            <div className='absolute h-0.5 w-full bottom-0 left-0 bg-gradient-to-tr from-blue-500 to-purple-600'></div>
          </div>
        </div>
        <div className='mt-3 text-[14px] text-gray-400' contentEditable suppressContentEditableWarning>
          📚 <b>Bachelor of Computer Science</b> <br />
          XYZ University, 2023 - Present
        </div>
        <div className='mt-3  text-[14px] text-gray-400' contentEditable suppressContentEditableWarning>
          📖 <b>High School Diploma</b> <br />
          ABC High School, Graduated 2022
        </div>

      </div>
    </div>
  )
}

export default Template1;
