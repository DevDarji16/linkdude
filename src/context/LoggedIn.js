'use client'
import { createContext,useEffect,useState } from "react"
export const LoggedIn=createContext()

  
export const CheckLogin=({children})=>{
    const [loggedInData,setLoggedInData]=useState()
    useEffect(() => {
        async function checkLoggedIn() {
          try {
            const res = await fetch('https://lyncnest-a5aq.onrender.com/auth/check', {
              cache: 'no-cache',
              credentials: 'include',
            });
            const data = await res.json();
            setLoggedInData(data.isLoggedIn);
          } catch (error) {
            console.error("Error checking login status:", error);
          }
        }
    
        checkLoggedIn();
      }, []); 
    
      
      return (
        <LoggedIn.Provider value={{ loggedInData }}>
          {children} 
        </LoggedIn.Provider>
      );
}