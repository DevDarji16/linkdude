import Link from 'next/link'
import React from 'react'

export const metadata={
  title:'Page not found | Lyncnest'
}

const Notfound = () => {
  return (
    <div >
           <Link href={'/'} className='absolute'>
          <div className='sm:mt-8 mt-4 ml-4 sm:ml-8 text-xl font-semibold'>
            Linknest
          </div>
        </Link>  
    <div className='flex justify-center items-center h-screen justify-center'>
        <div className='flex flex-col items-center'>

        <div className='font-semibold text-3xl text-center'>
        The page you are looking for <br/> does not exists <br/> anymore :(
        </div>
        <div className='flex gap-4 mt-5'>
           <Link href={'/'}><div className='text-white rounded-full bg-black p-2 px-3'> Home</div></Link> 
        </div>
        </div>
    </div>
    </div>
  )
}

export default Notfound