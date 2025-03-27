'use client'
import React, {  useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PageNotfound from '@/app/Components/PageNotfound'
const Global = ({update}) => {
    const params = useParams()
    const [data, setData] = useState({links:[]})
    const [error,setError]=useState(false)
    const [smPosition,setSMPosition]=useState('up')
    const [template,setTemplate]=useState({})
    const templates=[
      {
        id:0,
        bgColor:'#F3F3F1',
        text:'#030709',
        username:'#4A5A6A',
        linkbg:'#F4F4F5',
        linktext:'black'
      },
      {
        id:1,
        bgColor:'#F3F3F1',
        text:'#030709',
        username:'#4A5A6A',
        linkbg:'#F4F4F5',
        linktext:'black'
      },
      {
        id:2,
        bgColor:'#ECB980',
        text:'#030709',
        username:'#4A5A6A',
        linkbg:'#F4F4F5',
        linktext:'black'
      },
      {
        id:3,
        bgColor:'#E2F0FA',
        text:'#030709',
        username:'#4A5A6A',
        linkbg:'#F4F4F5',
        linktext:'black'
      },
      {
        id:4,
        bgColor:'#F3D5AF',
        text:'#030709',
        username:'#4A5A6A',
        linkbg:'#F4F4F5',
        linktext:'black'
      },
      {
        id:5,
        bgColor:'#EFD258',
        text:'#030709',
        username:'#4A5A6A',
        linkbg:'#F4F4F5',
        linktext:'black'
      },
      {
        id:6,
        bgColor:'#F2A6AA',
        text:'#030709',
        username:'#4A5A6A',
        linkbg:'#F4F4F5',
        linktext:'black'
      },
      {
        id:7,
        bgColor:'#061422',
        text:'white',
        username:'#4A5A6A',
        linkbg:'#213040',
        linktext:'white'
      },
     
     
      {
        id:20,
        bgImage:'https://res.cloudinary.com/dmebvno0m/image/upload/v1742798131/wau0uwjmzseewqwleb0c.jpg',
        bgColor:'#071422',
        text:'white',
        username:'white',
        linkbg:'#111A2D',
        linktext:'white'
      },
      {
        id:21,
        bgImage:'https://res.cloudinary.com/dmebvno0m/image/upload/v1742800057/cotpfgo7plhdjvb568mw.jpg',
        bgColor:'#071422',
        text:'white',
        username:'white',
        linkbg:'#4B5E66',
        linktext:'white'
      },
      {
        id:22,
        bgImage:'https://res.cloudinary.com/dmebvno0m/image/upload/v1742800371/w5ginrgrs4x5fwh0ljn9.jpg',
        bgColor:'#071422',
        text:'white',
        username:'white',
        linkbg:'#A29B2D',
        linktext:'white'
      },
      {
        id:23,
        bgImage:'https://res.cloudinary.com/dmebvno0m/image/upload/v1742800704/grhekjq9lmudbwrwnzoh.jpg',
        bgColor:'#071422',
        text:'white',
        username:'white',
        linkbg:'#BF8E56',
        linktext:'white'
      },
      {
        id:24,
        bgImage:'https://res.cloudinary.com/dmebvno0m/image/upload/v1742800849/ydrfuxa5vcog1jeztan4.jpg',
        bgColor:'#071422',
        text:'white',
        username:'white',
        linkbg:'#363D44',
        linktext:'white'
      },
    ]
    
    useEffect(() => {
      fetch(`https://lyncnest-a5aq.onrender.com/${params.username}/${params.spacename}`, {
        cache: 'no-cache'
      })
        .then(response => response.json())
        .then(data => {
          console.log('data',data)
          if(data?.error){
            setError(true)
          }
          else{
            const selectedTemplate=templates.find((t)=>t.id===data.templateNo) 
            console.log('Selected Template',selectedTemplate)
            setTemplate(selectedTemplate)
            setData(data)
            setSMPosition(data.socialMediaPosition)
            
          }
        })
        .catch(error=>{
          console.log(error)
        })
    }, [params,update])

    const handleURL=(url)=>{
      if(!url.startsWith('https') || !url.startsWith('http')){
        return `https://${url}`
      }
      return url
    }

    if(error) return <PageNotfound/>
    return (
      <div style={{ background: template.bgImage ? `url(${template.bgImage}) center/cover no-repeat` : template.bgColor, color: template.text 
      }}  className="min-h-screen  flex flex-col items-center p-4">
      <div className="flex flex-col items-center mt-16">
        <img src={data?.profilePic} height={70} width={70} className="rounded-full w-[70px] h-[70px] object-cover" />
        <div style={{color:template.username}} className="font-semibold ">@{data?.username}</div>
        <div className="text-2xl text-center font-semibold">{data?.space}</div>
        <div className="mt-4 font-bold text-center ">{data?.spaceBio}</div>
        
      </div>
      
      <div  className={`w-full flex  ${smPosition === 'down' ? 'flex-col-reverse' : 'flex-col'}  items-center`}>
      <div className="my-4 font-semibold flex gap-4 flex-wrap text-center">
          {
            data?.socialMediaLinks?.map((eachSocialMediaLink,index)=>{
              return <div key={index}>
                <a href={handleURL(eachSocialMediaLink?.url)} target='_blank'>
                <img src={eachSocialMediaLink?.logo} alt="" className='h-6 w-6' />

                </a>
              </div>
            })
          }
        </div>
        <div className='w-full mt-4 flex flex-col items-center'>

        {data?.links.map((link, index) => (
          <a key={index} href={handleURL(link.url)} style={{backgroundColor:template.linkbg}} className=" flex relative border border-2 hover:bg-transparent! justify-center w-full my-1 cursor-pointer items-center text-[15px]  p-4 font-semibold max-w-sm rounded-lg  duration-300 ease-in-out" target="_blank">
            <div className='absolute left-4 '><img src={link?.logo} alt=""  className='h-8 '/></div>
            <div style={{ color: template.linktext }}>{link.name}</div>

          </a>
        ))}
        </div>
      </div>
    </div>
    )
}

export default Global