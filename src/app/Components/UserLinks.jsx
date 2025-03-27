'use client'

import React, { useEffect, useState, memo } from 'react'
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io';

import SingleLink from './SingleLink';
import { DndContext} from "@dnd-kit/core";
import { arrayMove, SortableContext  } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

import Theme from './Theme';
import LivePreview from './LivePreview';
import { MdOutlineEdit } from 'react-icons/md';
import Toast from './Toast';

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import FailedToast from './FailedToast';

const UserLinks = (params) => {
    const {theme,toggleTheme}=useContext(ThemeContext)

  const sensors = useSensors(
    useSensor(MouseSensor), 
    useSensor(TouchSensor)
  );

  const [linkMenu, setLinkMenu] = useState(false)
  const [deleteMenu, setDeleteMenu] = useState(false)
  const [url, setURL] = useState('')
  const [title, setTitle] = useState('')
  const [deleteID, setDeleteID] = useState()
  const [socailId, setSocialId] = useState()
  const [bioClick,setBioCLick]=useState(false)
  const [socialmediaurl,setSocialMediaURL]=useState('')
  const [update,setUpdate]=useState(false)
  const [socialClick,setSocialClick]=useState(false)
  const [socialPositionClick,setSocialPositionClick]=useState(false)
  const [removeSocialMediaMenu,setRemoveSocialMediaMenu]=useState(false)
  const [failedToastMessage,setFailedToastMessage]=useState('')
  const [showFailedToast,setShowFailedToast]=useState(false)
  const [toastMessage,setToastMessage]=useState('')
  const [showToast,setShowToast]=useState(false)
  const [socialposition,setsocialposition]=useState('up')
  const [loadingMenu,setLoadingMenu]=useState({
    removeLink:false,
    removeSocialLink:false,
    addBlock:false,
    addBio:false,
    addSocial:false,
    addSocialPosition:false
  })



  const handleAddBlock = () => {
    setLoadingMenu({...loadingMenu,addBlock:true})

    fetch('https://lyncnest-a5aq.onrender.com/links/addlink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      credentials: 'include',
      body: JSON.stringify({ spaceName: params.spacename, name: title, url: url })
    })
      .then(response => response.json())
      .then(data => {
        console.log('data',data)
        if(data?.Error){
          setURL('')
          setTitle('')  
          setLinkMenu(false)
          setShowFailedToast(true)

          setFailedToastMessage('Add Required Data')
          setTimeout(()=>{
            setShowFailedToast(false)
            setLoadingMenu({...loadingMenu,addBlock:false})

          },2000)
        }
        else{
        setURL('')
        setTitle('')
        params.setlinksadded(!params.linksadded)
        setLinkMenu(false)
        setUpdate(!update)
        setToastMessage('Link Added Successfully')
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
        setLoadingMenu({...loadingMenu,addBlock:false})

      },2000)
        }
       
      })
  }

  const handleRemoveLink = () => {
    setLoadingMenu({...loadingMenu,removeLink:true})
    fetch('https://lyncnest-a5aq.onrender.com/links/deletelink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: 'no-cache',
      body: JSON.stringify({ spaceName: params.spacename, id: deleteID })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        params.setlinksadded(!params.linksadded)
        setDeleteMenu(false)
        setUpdate(!update)
        setToastMessage('Link removed successfully')
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
        setLoadingMenu({...loadingMenu,removeLink:false})

      },2000)
      })
  }

  const updateLinksArray = (sortedIds) => {
    console.log('Sorted IDs', sortedIds)
    fetch('https://lyncnest-a5aq.onrender.com/space/draganddrop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: 'no-cache',
      body: JSON.stringify({ spaceName: params.spacename, linkIds: sortedIds })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUpdate(!update)
      })
  }



  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over && active.id !== over.id) {

      params.setLinkContainer(links => {
        console.log('links', links)
        const oldIndex = links.findIndex(link => link._id === active.id)
        const newIndex = links.findIndex(link => link._id === over.id)
        const updatedLinks = arrayMove(links, oldIndex, newIndex)
        const sortedIds = updatedLinks.map(link => link._id)
        updateLinksArray(sortedIds)
        return updatedLinks
      })
    }
  }


  const handleAddBio=()=>{
    
    setLoadingMenu({...loadingMenu,addBio:true})

    if(params.bio.length>0){
      fetch('https://lyncnest-a5aq.onrender.com/space/updatespace',{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name: params.spacename,
          newName:  params.spacename,
          newBio:params.bio
        })
      })
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        
        setBioCLick(false)
        setUpdate(!update)
        setToastMessage('Bio updated successfully!')
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
        setLoadingMenu({...loadingMenu,addBio:false})

      },2000)
      })
    }
  }


  const handleSocial=()=>{
    setLoadingMenu({...loadingMenu,addSocial:true})

      fetch('https://lyncnest-a5aq.onrender.com/links/socialmedia/addlink',{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          link: socialmediaurl,
          spaceName:params.spacename,
        })
      })
      .then(response=>response.json())
      .then(data=>{
        if(data?.Error){
          setSocialMediaURL('')
          setSocialClick(false)
          setShowFailedToast(true)

          setFailedToastMessage('Add Required Data')
          setTimeout(()=>{
            setShowFailedToast(false)
            setLoadingMenu({...loadingMenu,addSocial:false})

          },2000)
        }
        else{
          console.log('url thing',data)
        params.setlinksadded(!params.linksadded)
        setSocialMediaURL('')
        setSocialClick(false)
        setUpdate(!update)
        setToastMessage('Social media link added successfully')
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
        setLoadingMenu({...loadingMenu,addSocial:false})

      },2000)
        }
        

      })
    
    
  }

  const handleRemoveSocialLink=()=>{
    setLoadingMenu({...loadingMenu,removeSocialLink:true})

    fetch('https://lyncnest-a5aq.onrender.com/links/socialmedia/deletelink',{
      method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          linkId: socailId,
          spaceName:params.spacename,
        })
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      setRemoveSocialMediaMenu(false)
      params.setlinksadded(!params.linksadded)
      setUpdate(!update)
      setToastMessage('Social media link removed successfully')
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
        setLoadingMenu({...loadingMenu,removeLink:false})

      },2000)

    })
  }


  const handleSocialPosition=()=>{
    setLoadingMenu({...loadingMenu,addSocialPosition:true})
    fetch('https://lyncnest-a5aq.onrender.com/space/updateposition',{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        position: socialposition,
        spaceName:params.spacename,
      })
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      setUpdate(!update)
      setToastMessage('SM Postion Changed!')
      setShowToast(true)
      setSocialPositionClick(false)
      setTimeout(()=>{
        setShowToast(false)
        setLoadingMenu({...loadingMenu,addSocialPosition:false})

      },2000)
    })
  }
  return (
    <div className='flex flex-wrap sm:flex-nowrap '>
            <Toast message={toastMessage} showToast={showToast} close={()=>setShowToast(false)}/>
            <FailedToast message={failedToastMessage} showToast={showFailedToast} close={()=>setShowFailedToast(false)}/>

         <div className='my-4 sm:ml-4 w-full'>
      <div onClick={() => setDeleteMenu(false)} className={`${deleteMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
        <div onClick={(e) => e.stopPropagation()} className={`${theme==='light'?'bg-black':'bg-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
          <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Delete Link</div><IoMdClose onClick={() => setDeleteMenu(false)} className={`${theme==='dark'?'hover:bg-gray-100':'hover:bg-gray-800'} cursor-pointer  m-3 mt-4 rounded-lg absolute right-0`} size={25} /></div>
          <div className='p-2  w-full'>
            <div className='mt-2 text-center'>Are you sure you want to delete these link?</div>
            <div className='flex mt-2 gap-1'>

              <button className={`w-full ${theme==='dark'?'bg-gray-200 hover:bg-gray-300':'bg-gray-700 hover:bg-gray-600  text-white'} rounded-lg cursor-pointer`} onClick={() => setDeleteMenu(false)}>No</button>
              <button className={`${loadingMenu.removeLink?'animate-pulse cursor-not-allowed bg-red-400':'hover:bg-red-600 cursor-pointer '} bg-red-500 p-2 rounded-lg  w-full transition`} onClick={handleRemoveLink}>{loadingMenu.removeLink?'Deleting...':'Delete'}</button>
            </div>
          </div>


        </div>
      </div>

      <div onClick={() => setRemoveSocialMediaMenu(false)} className={`${removeSocialMediaMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
        <div onClick={(e) => e.stopPropagation()} className={`${theme==='light'?'bg-black':'bg-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
          <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Remove Social Media</div><IoMdClose onClick={() => setRemoveSocialMediaMenu(false)} className={`${theme==='dark'?'hover:bg-gray-100':'hover:bg-gray-800'} cursor-pointer  m-3 mt-4 rounded-lg absolute right-0`} size={25} /></div>
          <div className='p-2  w-full'>
            <div className='mt-2 text-center'>Are you sure you want to remove these social media link?</div>
            <div className='flex mt-2 gap-1'>

              <button className={`${theme==='dark'?'bg-gray-200 hover:bg-gray-300':'bg-gray-700 hover:bg-gray-600  text-white'} w-full  rounded-lg cursor-pointer`} onClick={() => setRemoveSocialMediaMenu(false)}>No</button>
              <button className={`${loadingMenu.removeSocialLink?'animate-pulse cursor-not-allowed bg-red-400':'hover:bg-red-600 cursor-pointer '} bg-red-500 p-2 rounded-lg  w-full transition`} onClick={handleRemoveSocialLink}>{loadingMenu.removeSocialLink?'Removing...':'Remove'}</button>
            </div>
          </div>


        </div>
      </div>




      <div onClick={() => setLinkMenu(false)} className={`${linkMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
        <div onClick={(e) => e.stopPropagation()} className={`${theme==='light'?'bg-black':'bg-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
          <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Add link</div><IoMdClose onClick={() => setLinkMenu(false)} className={`${theme==='dark'?'hover:bg-gray-100':'hover:bg-gray-800'} cursor-pointer  m-3 mt-4 rounded-lg absolute right-0`} size={25} /></div>
          <div className='p-2 mt-4 w-full'>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' className='p-2 text-[14px] mb-2 border rounded-lg w-full ' />
            <input type="text" value={url} onChange={e => setURL(e.target.value)} placeholder='URL' className='p-2 text-[14px] border rounded-lg w-full ' />

          </div>
          <button onClick={handleAddBlock} className={`w-full bg-sky-400 ${loadingMenu.addBlock?'animate-pulse cursor-not-allowed':'hover:bg-sky-500 cursor-pointer'} font-bold mb-2  p-2 rounded text-white `}>{loadingMenu.addBlock?'Adding...':'Add block'}</button>

        </div>
      </div>

      <div onClick={() => setBioCLick(false)} className={`${bioClick ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
        <div onClick={(e) => e.stopPropagation()} className={`${theme==='light'?'bg-black':'bg-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
          <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Add Bio</div><IoMdClose onClick={() => setBioCLick(false)} className={`${theme==='dark'?'hover:bg-gray-100':'hover:bg-gray-800'} cursor-pointer  m-3 mt-4 rounded-lg absolute right-0`} size={25} /></div>
          <div className='p-2 mt-4 w-full'>
            <textarea value={params.bio} onChange={(e)=>params.setBio(e.target.value)} placeholder='Add your bio here' className='h-20 w-full border p-2 rounded-lg' ></textarea>
          </div>
          <button onClick={handleAddBio} className={`w-full bg-sky-400 ${loadingMenu.addBio?'animate-pulse cursor-not-allowed':'hover:bg-sky-500 cursor-pointer'} font-bold mb-2  p-2 rounded text-white `}>{loadingMenu.addBio?'Adding...':'Add bio'}</button>

        </div>
      </div>

      <div onClick={() => setSocialClick(false)} className={`${socialClick ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
        <div onClick={(e) => e.stopPropagation()} className={`${theme==='light'?'bg-black':'bg-white'} shadow-xl max-w-[300px]  px-2 rounded-xl w-full`}>
          <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Add Your Socials</div><IoMdClose onClick={() => setSocialClick(false)} className={`${theme==='dark'?'hover:bg-gray-100':'hover:bg-gray-800'} cursor-pointer  m-3 mt-4 rounded-lg absolute right-0`} size={25} /></div>
          <div className='p-2 mt-4 w-full'>
            <input type="text" value={socialmediaurl} onChange={e => setSocialMediaURL(e.target.value)} placeholder='Your social media URL' className='p-2 text-[14px] mb-2 border rounded-lg w-full ' />

          </div>
          <button onClick={handleSocial} className={`w-full bg-sky-400 ${loadingMenu.addSocial?'animate-pulse cursor-not-allowed':'hover:bg-sky-500 cursor-pointer'} font-bold mb-2  p-2 rounded text-white `}>{loadingMenu.addSocial?'Adding...':'Add Social media'}</button>

        </div>
      </div>

      <div onClick={() => setSocialPositionClick(false)} className={`${socialPositionClick ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out fixed inset-0 flex justify-center items-center mx-2  z-10  backdrop-blur-[3px]`}>
        <div onClick={(e) => e.stopPropagation()} className={`${theme==='light'?'bg-black':'bg-white'} shadow-xl max-w-[600px]  px-2 rounded-xl w-full`}>
          <div className='flex items-center mt-4  relative'> <div className='text-center w-full  text-[17px] font-bold'>Change SM position</div><IoMdClose onClick={() => setSocialPositionClick(false)} className={`${theme==='dark'?'hover:bg-gray-100':'hover:bg-gray-800'} cursor-pointer  m-3 mt-4 rounded-lg absolute right-0`} size={25} /></div>
          <div className='p-2 flex justify-center gap-5 mt-4 w-full'>
           <div onClick={()=>setsocialposition('up')} className={`p-2 flex flex-col-reverse text-center gap-2 border rounded-xl cursor-pointer ${socialposition==='up'?'border-blue-500':''} `}>Up
            <div><img src={'/images/up.png'} alt="" className='h-56 w-36 sm:h-68 sm:w-42' /></div>
           </div>
           <div onClick={()=>setsocialposition('down')} className={`p-2 border flex flex-col-reverse gap-2 text-center rounded-xl cursor-pointer ${socialposition==='down'?'border-blue-500':''} `}>Down
           <div><img src={'/images/down.png'} className='h-56 w-36 sm:h-68 sm:w-42' alt="" /></div></div>
          
          </div>
          <button onClick={handleSocialPosition} className={`w-full bg-sky-400 ${loadingMenu.addSocialPosition?'animate-pulse cursor-not-allowed':'hover:bg-sky-500 cursor-pointer'} font-bold mb-2  p-2 rounded text-white `}>{loadingMenu.addSocialPosition?'Changing...':'Change Position'}</button>

        </div>
      </div>


      <div className='flex justify-between items-start max-w-xl'>

        <div className='flex gap-2 items-center'>

          <img src={params.userData?.profile} width={70} height={70} className='rounded-full objext-cover w-[70px] h-[70px]' />
          <div className='font-semibold'>
            <div>@{params.userData?.username}</div>
            <div className='text-[14px] text-gray-500 my-1 ml-1'>{params?.bio}</div>
            <div className={`${theme==='light'?'text-gray-400':'text-gray-600'} hover:underline text-[13px] cursor-pointer flex`} onClick={()=>setBioCLick(!bioClick)}><MdOutlineEdit size={18}/>Add/Update bio</div>
            <div className='flex gap-5 flex-wrap my-5 '>
              
              {
                params.socialContainer.map((eachSocialMediaLink,index)=>{
                  return <div className='relative' key={index}>
                    <div className='cursor-pointer absolute top-[-11px] right-[-13px] rounded-full  ' onClick={()=>{setSocialId(eachSocialMediaLink._id);setRemoveSocialMediaMenu(!removeSocialMediaMenu)}}><IoMdClose size={14}/></div>
                   <img src={eachSocialMediaLink.logo} className='h-5' alt="" /> 
                  </div>
                })
              }
            </div>
            <div className='flex gap-4'>

            <div className={`${theme==='light'?'text-gray-400':'text-gray-600'} hover:underline text-[13px] cursor-pointer`} onClick={()=>setSocialClick(!socialClick)}>Add Social media(SM)</div>
            <div className={`${theme==='light'?'text-gray-400':'text-gray-600'} hover:underline text-[13px]  cursor-pointer`} onClick={()=>setSocialPositionClick(!socialPositionClick)}>Change SM position</div>
            </div>
          </div>
        </div>
        <div className='text-blue-500 underline cursor-pointer inline-block p-2 text-[14px]' onClick={()=>params.setMenuOption(2)}>Change theme</div>
      </div>
      <div onClick={() => { setLinkMenu(!linkMenu) }} className='flex mt-3 max-w-xl justify-center p-2 rounded-lg cursor-pointer hover:bg-black hover:text-white duration-400 ease-in-out items-center gap-1 font-semibold border'><FaPlus size={12} />Add</div>
      <div className='my-6  space-y-3   max-w-xl '>

        <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
          <SortableContext items={params.linkContainer.map(link => link._id)} >
            {params.linkContainer.map((link, index) => {

              return <SingleLink key={link._id} id={link._id} deleteMenu={deleteMenu} setDeleteMenu={setDeleteMenu} setDeleteID={setDeleteID} name={link.name} url={link.url} />
            })}
          </SortableContext>
        </DndContext>

        <div className='h-12'></div>
      </div>
    </div>
    <LivePreview update={update}/>
    
    </div>
   
  )
}

export default memo(UserLinks)