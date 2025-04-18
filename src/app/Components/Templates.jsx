import Image from 'next/image'
import React, { useState } from 'react'

import Toast from './Toast';
const Templates = ({spacename}) => {
  const [themeid, setThemeid] = useState(1)
  const [isLoading,setIsLoading]=useState(false)
  const [showToast,setShowToast]=useState(false)

  const handleChangeTheme = () => {
    setIsLoading(true)
    fetch('https://lyncnest-a5aq.onrender.com/space/updatespace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: spacename,
        newName: spacename,
        newTemplateNo: themeid,
      })
    })
      .then(response => response.json())
      .then(data => {
        setShowToast(true)
        setTimeout(()=>{
          setShowToast(false)
        },2000)
      })
      .finally(()=>{
        setIsLoading(false)

      })
  }
  return (
    <div>
      <div className='mt-8 text-2xl font-bold  p-2'>Simple Themes</div>
      <div className='flex justify-center p-3 gap-5 flex-wrap'>
        {[1, 2, 3, 4, 5, 6,7].map((id, index) => {
          return <div key={index} className={`${themeid === id  ? 'border border-blue-500 border-4' : ''} p-2 cursor-pointer bg-gray-100 rounded-lg`} onClick={() => setThemeid(id)}>
            <Image src={`/images/theme${id}.png`} alt={`Theme${id}`} width={200} height={250} className='w-[120px] h-[200px] sm:w-[200px] sm:h-[350px]' />
          </div>
        })}


      </div>
      <div className='mt-8 text-2xl font-bold  p-2'>Background Themes</div>
      <div className='flex justify-center p-3 gap-5 flex-wrap'>
        {[20,21,22,23,24].map((id, index) => {
          return <div key={index} className={`${themeid === id  ? 'border border-blue-500 border-4' : ''} p-2 cursor-pointer bg-gray-100 rounded-lg`} onClick={() => setThemeid(id)}>
            <Image src={`/images/theme${id}.png`} alt={`Theme${id}`} width={200} height={250} className='w-[120px] h-[200px] sm:w-[200px] sm:h-[350px]' />
          </div>
        })}


      </div>
      <div className='px fixed bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-[250px] sm:max-w-[400px]'>

        <button onClick={handleChangeTheme} className='hover:bg-blue-500 font-semibold fixed cursor-pointer bg-blue-400 p-2 text-white rounded-lg w-full max-w-xl'>
        
        {isLoading?<div className='animate-pulse cursor-not-allowed'>Changing..</div>:<div>Change Template</div>}
        

          </button>
      </div>
      <Toast message={'Template Changed Successfully'} showToast={showToast} close={()=>setShowToast(false)}/>
      
      
    </div>
  )
}

export default Templates