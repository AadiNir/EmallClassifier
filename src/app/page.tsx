"use client"
import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { permanentRedirect, useRouter } from 'next/navigation'

import axios from 'axios'
export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apikey,setapikey]=useState(""); 

  useEffect(() => {
    let code = window.location.href;
    let url = new URL(code);
    let queryParams = url.searchParams.get('code') // This removes the leading "?"
    if(queryParams) {
      localStorage.setItem("oauth-token", queryParams);
      setIsLoggedIn(true);
    }else{
      localStorage.removeItem('oauth-token')
    }

  }, []);

  useEffect(()=>{

    if(isLoggedIn && localStorage.getItem("openaikey")){
      router.push('/emailclass')
    }else{
      console.log("please enter openai api key")
    }
  },[isLoggedIn,apikey])

  // const handleLoginSuccess = (credentialResponse:any) => {
  //   setIsLoggedIn(true);
  //   console.log(credentialResponse)
  // };

  const googleauth= async()=>{
    const response = await axios.get('http://localhost:3000/api/v1/emailclassifier/getemails');
    window.location.assign(response.data);

  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-mono">
      {!isLoggedIn ? (
        <button className=" p-5 border-4 border-gray-50 rounded-lg mb-4 hover:bg-white hover:text-slate-950 " onClick={googleauth}>Login with your Google account</button>
      ) : <button className=" p-5 border-4 border-gray-50 rounded-lg mb-4 hover:bg-white hover:text-slate-950 ">Logged In successfully</button>
    }
  
      <input 
        className=" text-gray-50 w-96 p-3 border-4 border-gray-50 bg-black mb-4 rounded m-3 " 
        placeholder="enter openAi Api key" 
        onChange={(e)=>{setapikey(e.target.value)}} 
        required 
      />
      <button 
        className=" bg-black text-white p-2 rounded w-36 hover:bg-white hover:text-slate-950 border-4 border-gray-50 m-3"
        onClick={()=>{localStorage.setItem("openaikey", apikey); setapikey("")}}
      >
        Log In
      </button>
    </div>
  );
  
}

