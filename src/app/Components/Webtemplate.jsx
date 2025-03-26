import Link from 'next/link'
import React from 'react'

const Webtemplate = () => {
  return (
    <div>
      <div className=' flex flex-wrap m-3'>
      <Link href={'workspace/webtemplates/1'}><div className='bg-gray-200 rounded-xl text-xl cursor-pointer p-2'>Template1</div></Link>
      </div>
    </div>
  )
}

export default Webtemplate