'use client'
import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ThemeContext } from "@/context/ThemeContext";
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';
import FailedToast from './FailedToast';

const GetUsername = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const [username, setUsername] = useState('')
  const [failedToastMessage, setFailedToastMessage] = useState('')
  const [showFailedToast, setShowFailedToast] = useState(false)
  const [loading, setLoading] = useState(false) // 🔹 For loading state

  const router = useRouter()

  async function handleClick() {
    if (username.trim() === '') {
      setFailedToastMessage('Username cannot be empty!')
      setShowFailedToast(true)
      setTimeout(() => setShowFailedToast(false), 2000)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('https://lyncnest-a5aq.onrender.com/setUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username })
      })

      const data = await response.json()

      if (data.success !== 'False') {
        router.replace('/')
      } else {
        setFailedToastMessage('Username already taken!')
        setShowFailedToast(true)
        setUsername('')
        setTimeout(() => setShowFailedToast(false), 2000)
      }
    } catch (error) {
      setFailedToastMessage('Something went wrong!')
      setShowFailedToast(true)
      setTimeout(() => setShowFailedToast(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='absolute top-4 right-6 sm:top-11 sm:right-20 cursor-pointer' onClick={toggleTheme}>
        {theme === 'light' ? <MdOutlineDarkMode size={27} className='text-white' /> : <MdLightMode size={27} />}
      </div>

      <FailedToast message={failedToastMessage} showToast={showFailedToast} close={() => setShowFailedToast(false)} />

      <Link href={'/'} className='absolute'>
        <div className={`${theme === 'light' ? 'text-white' : 'text-black'} sm:mt-8 mt-4 ml-4 sm:ml-8 text-xl font-semibold`}>
          Linkdude
        </div>
      </Link>

      <div className={`flex flex-col space-y-6 justify-center items-center px-2 h-screen ${theme === 'dark' ? 'bg-[#F3F3F1] text-black' : 'bg-[#181b1e] text-white'}`}>
        <div className='font-bold text-2xl sm:text-4xl text-center'>
          Don’t let your important links get lost<br />—nest them today!
        </div>

        <div className='bg-green-400 space-y-3 rounded-lg p-4'>
          <div className={`font-bold text-2xl sm:text-2xl text-center ${theme === 'light' ? 'text-black ' : 'text-white'}`}>
            Just one more step <br /> to get started!
          </div>

          <div className='flex justify-center'>
            <div className={`flex justify-center ${theme === 'dark' ? 'bg-[#F3F3F1] text-black' : 'bg-gray-800 text-white'} p-2 rounded-lg`}>
              <div className={`${theme === 'light' ? 'text-white' : 'text-black'} font-semibold`}>
                link.dude/<input
                  className='focus:outline-none'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type='text'
                  placeholder='username'
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleClick}
            className={`bg-black text-white px-4 py-2 rounded-lg w-full font-semibold hover:opacity-80 ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GetUsername
