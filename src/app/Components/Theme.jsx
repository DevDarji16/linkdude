// import React, { useState, memo } from 'react'
// import { IoMdClose } from 'react-icons/io';
// import Image from 'next/image'

// import { useContext } from "react";
// import { ThemeContext } from "@/context/ThemeContext";

// const Theme = ({ spacename, themeClick, setThemeClick, setUpdate, update }) => {
//     const [themeid, setThemeid] = useState(1)
//     const { theme, toggleTheme } = useContext(ThemeContext)

//     const handleChangeTheme = () => {
//         console.log(themeid)
//         fetch('https://lyncnest-a5aq.onrender.com/space/updatespace', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//             body: JSON.stringify({
//                 name: spacename,
//                 newName: spacename,
//                 newTemplateNo: themeid,
//             })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data)
//                 setThemeClick(false)
//                 setUpdate(!update)
//             })
//     }
//     return (
//         <div onClick={() => setThemeClick(!themeClick)} className={`${themeClick ? 'opacity-100' : ' opacity-0 pointer-events-none'} z-20 duration-300 ease-in-out flex inset-0 w-screen h-screen fixed justify-center bg-opacity-20 backdrop-blur-[2px]  items-center`}>
//             <div onClick={(event) => event.stopPropagation()} className='w-full relative overflow-hidden rounded-xl max-w-3xl '>

//                 <div className='p-2 absolute top-2 right-2'><IoMdClose size={20} onClick={() => setThemeClick(false)} className='cursor-pointer hover:bg-gray-100 rounded-lg ' /></div>

//                 <div className={`${theme === 'light' ? 'bg-black' : 'bg-white'} rounded-xl max-h-[80vh]  flex  overflow-y-auto`}>


//                     <div className={`w-full ${theme === 'light' ? 'bg-black' : 'bg-white'} `}>
//                         <div className={`${theme === 'dark' ? 'text-black' : 'text-white'} mt-8 text-2xl font-bold p-2`}>Simple Themes</div>
//                         <div className='flex  p-3 gap-5 flex-wrap'>
//                             {[1, 2, 3, 4, 5, 6,7].map((id, index) => {
//                                 return <div key={index} className={`${themeid === id ? 'border' : ''} p-2 cursor-pointer bg-gray-100 rounded-lg`} onClick={() => setThemeid(id)}>
//                                     <Image src={`/images/theme${id}.png`} alt={`Theme${id}`} width={150} height={250} />
//                                 </div>
//                             })}

                         
//                         </div>


//                     </div>

//                 </div>
//                 <button className='bg-blue-500  text-white w-full text-center font-semibold p-2 cursor-pointer' onClick={handleChangeTheme}>Change Theme</button>
//             </div>
//         </div>
//     )
// }

// export default memo(Theme)