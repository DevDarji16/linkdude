'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import Spaces from './Spaces';
import Webtemplate from './Webtemplate';
import Templates from './Templates';
import Settings from './Settings';
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
const Workspace = () => {
    const {theme,toggleTheme}=useContext(ThemeContext)

    const [menuOpen, setMenuOpen] = useState(false)
    const [menuOption, setMenuOption] = useState(1)
    const [settings, setSettings] = useState(false)
    const [userData, setUserData] = useState({ profileName: '' })
    const [spaceClick, setSpaceClick] = useState(false)
    const [spaceName, setSpaceName] = useState('')
    const [spaceDeleteName, setSpaceDeleteName] = useState('')
    const [spaceDeleteClick, setSpaceDeleteClick] = useState(false)
    const [spaces, setSpaces] = useState([])
    const [spaceadded, setSpaceadded] = useState(0)

    const [renameSpace, setRenameSpace] = useState('')
    const [renameNewSpace, setRenameNewSpace] = useState('')
    const [renameMenu, setRenameMenu] = useState(false)


    useEffect(() => {
        fetch('https://lyncnest-a5aq.onrender.com/auth/currentUser', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                console.log('current user data', data)
                setUserData(data)

            }
            )

    }, [])
    
    useEffect(() => {
        fetch('https://lyncnest-a5aq.onrender.com/space/getspaces', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log('spaces',data)
                setSpaces(data)
            })
    }, [spaceadded])


    const handleAddSpace = () => {
        if (spaceName.length > 0) {
            fetch('https://lyncnest-a5aq.onrender.com/space/createspace',
                {
                    method: 'POST',
                    credentials: 'include',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: spaceName })
                })
                .then(response => response.json())
                .then(data => {
                    setSpaceClick(false)
                    setSpaceName('')
                    setSpaceadded(prev => prev + 1)
                })
        }
        setSpaceClick(false)
    }
    const handleDeleteSpace = () => {
        fetch('https://lyncnest-a5aq.onrender.com/space/removespace', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: spaceDeleteName })
        })
            .then(response => response.json())
            .then(data => {
                setSpaceadded(prev => prev + 1)
                setSpaceDeleteClick(false)
            })
    }
    const handleRenameSpace = () => {
        fetch('https://lyncnest-a5aq.onrender.com/space/updatespace', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: renameSpace, newName: renameNewSpace })
        })
            .then(response => response.json())
            .then(data => {
                setSpaceadded(prev => prev + 1)
                setRenameMenu(false)
            })
    }
    return (
        <div onClick={() => setSettings(false)} className={`${theme==='dark'?'bg-[#F3F3F1] text-black':'bg-[#181b1e] text-white'} relative h-screen  overflow-x-hidden`}>
            <div className='absolute top-4 right-6 sm:top-11 sm:right-20 cursor-pointer' onClick={toggleTheme}>{theme==='dark'?<MdOutlineDarkMode size={27}/>:<MdLightMode size={27}/>}</div>
            {/* Add space menu */}
            <div onClick={() => setSpaceClick(false)} className={`${spaceClick ? 'opacity-100' : 'opacity-0 pointer-events-none'}  transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
                <div onClick={(e) => e.stopPropagation()} className={`${theme==='dark'?'bg-[#F3F3F1] text-black':'bg-[#0c0e0f] text-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
                    <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Add New Space</div><IoMdClose onClick={() => setSpaceClick(false)} className='cursor-pointer hover:bg-gray-100 m-3 mt-4 rounded-lg absolute right-0' size={25} /></div>
                    <div className='p-2 mt-4 w-full'>
                        <input type="text" value={spaceName} onChange={e => (setSpaceName(e.target.value))} placeholder='Space name' className={` ${theme==='dark'?'text-gray-800':'text-white'} p-2 border rounded-lg w-full `} />
                        <div className='text-[11px] mt-2 text-center'>Note: Every space you make should have unique name.</div>
                    </div>
                    <button onClick={handleAddSpace} className='w-full bg-sky-400 font-bold mb-2 text-white hover:bg-sky-500 p-2 rounded'>Add Space</button>

                </div>
            </div>

            {/* Delete space menu */}
            <div onClick={() => setSpaceDeleteClick(false)} className={`${spaceDeleteClick ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
                <div onClick={(e) => e.stopPropagation()} className={`${theme==='dark'?'bg-[#F3F3F1] text-black':'bg-[#0c0e0f] text-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
                    <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Delete Space</div><IoMdClose onClick={() => setSpaceDeleteClick(false)} className='cursor-pointer hover:bg-gray-100 m-3 mt-4 rounded-lg absolute right-0' size={25} /></div>
                    <div className='p-2  w-full'>
                        <div className='mt-2 text-center'>Are you sure you want to delete these space?</div>
                        <div className='flex mt-2 gap-1'>

                            <button className={`${theme==='dark'?'bg-gray-200 hover:bg-gray-300':'bg-gray-700 hover:bg-gray-600  text-white'} w-full cursor-pointer  rounded-lg`} onClick={() => setSpaceDeleteClick(false)}>No</button>
                            <button className='bg-red-500 p-2 rounded-lg hover:bg-red-600 w-full cursor-pointer' onClick={handleDeleteSpace}>Delete</button>
                        </div>
                    </div>


                </div>
            </div>

            {/* Rename space Menu  */}
            <div onClick={() => setRenameMenu(false)} className={`${renameMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
                <div onClick={(e) => e.stopPropagation()} className={`${theme==='dark'?'bg-[#F3F3F1] text-black':'bg-[#0c0e0f] text-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
                    <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Rename Space</div><IoMdClose onClick={() => setRenameMenu(false)} className='cursor-pointer hover:bg-gray-100 m-3 mt-4 rounded-lg absolute right-0' size={25} /></div>
                    <div className='p-2 mt-4 w-full'>
                        <input type="text" value={renameNewSpace} onChange={e => (setRenameNewSpace(e.target.value))} placeholder='Space name' className='p-2 border rounded-lg w-full ' />
                        <div className='text-[11px] mt-2 text-center'>Note: Every space you make should have unique name</div>
                    </div>
                    <button onClick={handleRenameSpace} className='w-full bg-sky-400 font-bold mb-2 hover:bg-sky-500 p-2 rounded text-white'>Rename Space</button>

                </div>
            </div>




            <div className='flex'>
                <div className={`${theme==='dark'?'bg-[#F3F3F1] text-black':'bg-[#0c0e0f] text-white'} hidden sm:flex sm:flex-col fixed justify-between pr-6 shadow-lg h-screen w-1/5 `}>
                    <div className='space-y-6 flex-grow'>
                        <div className={`md:mt-7 md:ml-5  ml-4 mt-4 md:text-4xl ${theme==='dark'?' text-black':' text-gray-200'}  font-semibold`}>
                            Lyncnest
                        </div>

                        <div className={`md:ml-6 ml-3 mt-7 flex gap-2 ${theme==='dark'?' text-black':' text-gray-200'}  flex-col`}>
                            <div className={`${menuOption === 1 ? 'bg-black text-white' : 'hover:bg-gray-600'} w-full transition-all duration-300  hover:text-white p-2 cursor-pointer pl-4 rounded-lg `} onClick={() => { setMenuOption(1); setSettings(false) }}>
                                Spaces
                            </div>
                            <div className='border border-gray-400 w-full'></div>
                            {/* <div className={`${menuOption === 2 ? 'bg-black text-white' : 'hover:bg-gray-600'} w-full transition-all duration-300 cursor-pointer hover:text-white p-2 pl-4 rounded-lg`} onClick={() => { setMenuOption(2); setSettings(false) }}>
                                Templates
                            </div>
                            <div className='border border-gray-400 w-full'></div> */}

                            <div className={`${menuOption === 3 ? 'bg-black text-white' : 'hover:bg-gray-600'} w-full transition-all duration-300 hover:text-white  cursor-pointer p-2 pl-4 rounded-lg`} onClick={() => { setMenuOption(3); }}>
                                Web Templates
                            </div>
                        </div>

                    </div>
                    <Settings settings={settings} username={userData?.username} name={userData?.profileName} url={userData?.profile} setSettings={setSettings} />


                </div>
                <div className={`${theme==='dark'?' text-black bg-white':'bg-[#0c0e0f] text-gray-200'} z-10 fixed h-screen space-y-5 w-3/4 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col justify-between duration-300 ease-in-out`}>
                    <div className='flex justify-end pt-5 pr-7 text-3xl' onClick={() => setMenuOpen(!menuOpen)}><IoMdClose /></div>
                    <div className='flex flex-grow h-full flex-col justify-between'>

                    <div className='flex  flex-col mt-10 space-y-3 mx-3 text-xl font-semibold '>
                        <div className='pl-6 py-1' onClick={() => { setMenuOption(1); setMenuOpen(!menuOpen) }} >Spaces</div>
                        <div className='border w-full'></div>
                        {/* <div className='pl-6 py-1' onClick={() => { setMenuOption(2); setMenuOpen(!menuOpen) }}>Templates</div> */}
                        {/* <div className='border w-full'></div> */}

                        <div className='pl-6 py-1' onClick={() => { setMenuOption(3); setMenuOpen(!menuOpen) }}>Web Templates</div>

                    </div>

                    <Settings settings={settings} username={userData?.username} name={userData?.profileName} url={userData?.profile} setSettings={setSettings} />
                    </div>
                    </div>
                <div className='h-screen w-full sm:p-8 p-3 sm:ml-[20%]' onClick={() => { setSettings(false);setMenuOpen(false) }}>
                    <div>
                        <div className=''>
                            <div className='sm:hidden font-bold text-3xl fixed ' onClick={(e) => { e.stopPropagation();setMenuOpen(!menuOpen) }}><IoIosMenu /></div>
                            <div className={`text-center text-xl mb-4 md:text-4xl  font-semibold`}>
                                Workspace
                            </div>
                            <div className='mb-3 text-[16px]'>
                                {!userData.profileName ? (
                                    <div className={`${theme==='light'?'bg-gray-700':'bg-gray-300'} h-7 animate-pulse w-48 rounded-full `}></div>
                                ) : (
                                    <div>Welcome <span className='font-bold'>{userData.profileName}</span>!</div>
                                )}
                            </div>
                        </div>
                        <div className='border w-full border-gray-400'></div>
                        {menuOption === 1 ? <Spaces theme={theme} userData={userData} setRenameNewSpace={setRenameNewSpace} setRenameSpace={setRenameSpace} setRenameMenu={setRenameMenu} renameMenu={renameMenu} renameSpace={renameSpace} setSpaceDeleteName={setSpaceDeleteName} spaceDeleteName={spaceDeleteName} spaceDeleteClick={spaceDeleteClick} setSpaceDeleteClick={setSpaceDeleteClick} spaces={spaces} setSpaceClick={setSpaceClick} spaceClick={spaceClick} /> : menuOption === 2 ? <Templates /> : <Webtemplate />}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace