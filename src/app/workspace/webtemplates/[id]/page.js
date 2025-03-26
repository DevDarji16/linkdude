'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Template1 from '@/app/TemplateComponents/Template1'
import Template2 from '@/app/TemplateComponents/Template2'

const WebTemplates = () => {
  const params=useParams()
  console.log(params.id)
  return (
    <div>
      {params.id==1&&<Template1/>}
      {params.id==2&&<Template2/>}
    </div>
  )
}

export default WebTemplates