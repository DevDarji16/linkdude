'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoMdClose } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import Settings from '@/app/Components/Settings';
import UserLinks from '@/app/Components/UserLinks';
import Templates from '@/app/Components/Templates';
import PageNotfound from '@/app/Components/PageNotfound';

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';
import Profile from '@/app/Components/Profile';
import FailedToast from '@/app/Components/FailedToast';
import Toast from '@/app/Components/Toast';
import { FaCamera } from "react-icons/fa";
import LoadingScreen from '@/app/Components/Loading';
const SpaceLink = () => {

    const { theme, toggleTheme } = useContext(ThemeContext)

    const params = useParams()
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuOption, setMenuOption] = useState(1)
    const [settings, setSettings] = useState(false)
    const [userData, setUserData] = useState()
    const [linksadded, setlinksadded] = useState(false)
    const [linkContainer, setLinkContainer] = useState([])
    const [socialContainer, setSocialContainer] = useState([])
    const [bio, setBio] = useState('')
    const [error, setError] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [userDetails, setUserDetails] = useState({
        username: '',
        name: '',
        profile: null,
        profileFile: null
    })
    const [failedToastMessage, setFailedToastMessage] = useState('')
    const [showFailedToast, setShowFailedToast] = useState(false)
    const [edited, setEdited] = useState(false)
    const router = useRouter()
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [editLoading,setEditLoading]=useState(false)
    const [imgChanged,setImgChanged]=useState(false)

    useEffect(() => {
        fetch('https://lyncnest-a5aq.onrender.com/auth/currentUser', { cache: 'no-cache', credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                if(data?.message){
                    setError(true)
                }
                setUserData(data)
                setUserDetails({ username: data.username, name: data.profileName, profile: data.profile,profileFile:data.profile })
            }
            )

    }, [])

    useEffect(() => {

        fetch(`https://lyncnest-a5aq.onrender.com/${params.username}/${params.spacename}`,
            {
                cache: 'no-cache'
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data?.error) {
                    setError(true)
                }
                else {
                    setBio(data?.spaceBio)
                }
            })
    }, [])



    useEffect(() => {
        fetch('https://lyncnest-a5aq.onrender.com/links/getlinks', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ spaceName: params.spacename })
        })
            .then(response => response.json())
            .then(data => {
                if (data?.error) {
                    setError(true)
                }
                else {
                    setLinkContainer(data.links)
                    setSocialContainer(data.socialMediaLinks)
                }
            }
            )

    }, [linksadded])

    const handleEditProfile = () => {
        setEditLoading(true)
        
        const formData = new FormData()
        formData.append('oldUserName', userData.username)

        if (userData.username !== userDetails.username) {
            formData.append('newUserName', userDetails.username)
        }
        if (userData.profileName !== userDetails.name) {
            formData.append('newProfileName', userDetails.name)
        }
        if (imgChanged) {
            formData.append('profile', userDetails.profile)
        }

        if (userDetails.username.length > 0 && userDetails.name.length > 0) {
            fetch('https://lyncnest-a5aq.onrender.com/user/updateuser', {
                credentials: 'include',
                method: 'POST',

                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    setEdited(!edited)
                    setShowProfile(false)
                    setToastMessage('Profile edited successfully')
                    setShowToast(true)
                    setImgChanged(false)
                    setTimeout(() => {
                        setShowToast(false)
                        setEditLoading(false)
                    }, 2000)
                    router.replace('/workspace')
                })
        }
        else {
            setFailedToastMessage('Add required field')
            setShowFailedToast(true)
            setTimeout(() => {
                setShowFailedToast(false)
            }, 2000)
        }
    }



    if (error) return <PageNotfound />
    return (
        <div onClick={() => setSettings(false)} className={`${theme === 'dark' ? 'bg-[#F3F3F1] text-black' : 'bg-[#181b1e] text-white'} relative h-screen  overflow-x-hidden`}>
            <LoadingScreen/>
            <div className='absolute top-4 right-6 sm:top-11 sm:right-20 cursor-pointer' onClick={toggleTheme}>{theme === 'dark' ? <MdOutlineDarkMode size={27} /> : <MdLightMode size={27} />}</div>
            <FailedToast message={failedToastMessage} showToast={showFailedToast} close={() => setShowFailedToast(false)} />
            <Toast message={toastMessage} showToast={showToast} close={() => setShowToast(false)} />


            <div onClick={() => setShowProfile(false)} className={`${showProfile ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
                <div onClick={(e) => e.stopPropagation()} className={`${theme === 'light' ? 'bg-black' : 'bg-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
                    <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Edit Profile</div><IoMdClose onClick={() => setShowProfile(false)} className={`${theme === 'dark' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} cursor-pointer  m-3 mt-4 rounded-lg absolute right-0`} size={25} /></div>
                    <div className='p-2  w-full'>
                        <div onClick={() => document.getElementById('profileImage').click()} className='rounded-full overflow-hidden relative h-16 flex w-full justify-center w-16'>
                            <img src={userDetails?.profileFile} className='rounded-full cursor-pointer w-[70px] h-[70px] object-cover' />
                            <div className={`${theme==='light'?'bg-black':'bg-white'} absolute w-full h-full rounded-full  opacity-40`}></div>
                            <FaCamera className='absolute top-[45%] cursor-pointer' size={20} />
                           <div className='flex'>

                            <input id='profileImage' type="file" accept='image/*' className="p-2 hidden border border-gray-400 rounded-lg  my-1" onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setImgChanged(true);
                                    setUserDetails({
                                        ...userDetails,
                                        profileFile: URL.createObjectURL(file), 
                                        profile: file, 
                                    });
                                }
                            }} />
                           </div>


                        </div>

                        <div className='ml-1 text-[13px] mt-4'>Username</div>
                        <input type="text" placeholder='Username' className='p-2 border border-gray-400 rounded-lg w-full my-1 ' value={userDetails.username} onChange={e => { setUserDetails({ ...userDetails, username: e.target.value }) }} />
                        <div className='ml-1 text-[13px] mt-1'>Full name</div>

                        <input type="text" placeholder='Full name' className='p-2 border border-gray-400 rounded-lg w-full my-1 ' value={userDetails.name} onChange={e => { setUserDetails({ ...userDetails, name: e.target.value }) }} />

                        <div className='flex mt-2 gap-1'>

                            <button onClick={handleEditProfile} className={`${editLoading?'cursor-not-allowed animate-pulse':'cursor-pointer'} text-white bg-blue-500  p-2 rounded-lg  w-full transition`} >{editLoading?'Updating...':'Update profile'}</button>
                        </div>
                    </div>


                </div>
            </div>



            <div className='flex'>
                <div className={`hidden  sm:flex sm:flex-col fixed justify-between pr-6 shadow-lg h-screen w-1/5 ${theme === 'dark' ? 'bg-[#F3F3F1] text-black' : 'bg-[#0c0e0f] text-white'}`}>
                    <div className='space-y-6 flex-grow'>
                        <div className={`md:mt-7 md:ml-5  ml-4 mt-4 md:text-4xl font-semibold ${theme === 'dark' ? ' text-black' : ' text-gray-100'} select-none font-myfont`}>
                        Linkdude
                        </div>

                        <div className={`md:ml-6 ml-3 mt-7 flex gap-2 ${theme === 'light' ? 'text-gray-100' : 'text-gray-500'}  flex-col`}>
                            <div className={`${menuOption === 1 ? 'bg-black text-white' : 'hover:bg-gray-600'} w-full transition-all duration-300  hover:text-white p-2 cursor-pointer pl-4 rounded-lg `} onClick={() => { setMenuOption(1); setSettings(false) }}>
                                Links
                            </div>
                            <div className='border border-gray-400 w-full'></div>
                            <div className={`${menuOption === 2 ? 'bg-black text-white' : 'hover:bg-gray-600'} w-full transition-all duration-300 cursor-pointer hover:text-white p-2 pl-4 rounded-lg`} onClick={() => { setMenuOption(2); setSettings(false) }}>
                                Templates
                            </div>
                            <div className='border border-gray-400 w-full'></div>


                        </div>

                    </div>
                    <div>

                        <Settings settings={settings} username={userData?.username} name={userData?.profileName} url={userData?.profile} setSettings={setSettings} />
                        <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
                    </div>
                </div>
                
                <div className={`${theme === 'light' ? 'bg-[#0c0e0f]' : 'bg-white'} z-20 fixed h-screen space-y-5 w-3/4 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col justify-between duration-300 ease-in-out`}>

                    <div className='flex justify-end  pt-5 pr-7 text-3xl' onClick={() => setMenuOpen(!menuOpen)}><IoMdClose /></div>
                    <div className='flex flex-col justify-between flex-grow'>
                        <div className={`flex  flex-col mt-10 space-y-3 mx-3 text-xl font-semibold ${theme === 'light' ? 'text-gray-100' : 'text-gray-500'}`}>
                        <div className='pl-6 py-1' onClick={() => { setMenuOption(1); setMenuOpen(!menuOpen) }} >Links</div>
                        <div className='border w-full '></div>
                        <div className='pl-6 py-1' onClick={() => { setMenuOption(2); setMenuOpen(!menuOpen) }}>Templates</div>
                        <div className='border w-full'></div>
                    </div>
                    <div >
                    <Settings settings={settings} username={userData?.username} name={userData?.profileName} url={userData?.profile} setSettings={setSettings} />
                    <div onClick={()=>{setMenuOpen(!menuOpen)}} >

                    <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
                    </div>

                    </div>
                    </div>
                    

                </div>
                <div className='h-screen w-full  sm:p-8 p-3 sm:ml-[20%]  '  onClick={() => { setSettings(false);setMenuOpen(false) }}>
                    <div>
                        <div className=''>
                            <div className={`${theme === 'light' ? 'text-white' : 'text-black'} sm:hidden font-bold text-3xl fixed `} onClick={(e) => {e.stopPropagation(); setMenuOpen(!menuOpen) }}><IoIosMenu /></div>
                            <div className={`text-center text-xl mb-4  ${theme === 'dark' ? ' text-black' : ' text-gray-100'}font-semibold`}>
                                Workspace
                            </div>
                            <div className={`p-2 ${theme === 'dark' ? 'bg-gray-300' : 'bg-gray-800'}  rounded-lg inline-block mb-3 text-[14px]`}>Your Nest is now live : <Link href={`/${params?.username}/${params?.spacename}`} target='_blank' className='text-blue-400 underline hover:text-blue-500 cursor-pointer'>{params?.username}/{params?.spacename}</Link></div>
                        </div>
                        <div className='border w-full border-gray-400'></div>
                        {menuOption === 1 ? <UserLinks setMenuOption={setMenuOption} socialContainer={socialContainer} setSocialContainer={setSocialContainer} setLinkContainer={setLinkContainer} linkContainer={linkContainer} linksadded={linksadded} setlinksadded={setlinksadded} bio={bio} setBio={setBio} spacename={params.spacename} userData={userData} /> : <Templates spacename={params.spacename} />}

                    </div>
                </div>
            </div>
        </div>

    )
}

export default SpaceLink