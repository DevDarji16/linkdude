'use client'

import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";



export default  function Home() {
  
  const {theme,toggleTheme}=useContext(ThemeContext)
  const router=useRouter()
  useEffect(()=>{
    async function checkLoggedIn(){
      const res=await fetch('https://lyncnest-a5aq.onrender.com/auth/check',{cache:'no-cache',credentials:'include'})
      const data=await res.json()
      const newres=await fetch('https://lyncnest-a5aq.onrender.com/auth/currentUser', { credentials: 'include' })
      const data2=await newres.json()
      console.log(data)
      console.log(data2)
      if(data.isLoggedIn ){
        if(data2.username.length>0){

          router.replace('/workspace')
        }
        else{
          router.replace('/get-username')
        }
      }
      else{

      }
    
    }
    checkLoggedIn()
  },[])
  return (
    <div className="h-screen">
      <Navbar/>
      <Homepage/>   
     
     
     
    </div>
  );
}
