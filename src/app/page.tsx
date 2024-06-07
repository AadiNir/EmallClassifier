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
    <div>
    {!isLoggedIn ? (
  <button onClick={googleauth}>Login with your Google account</button>
) : <h1>Logged in successfully</h1>}

      <input className="text-slate-950" placeholder="enter openAi Api key" onChange={(e)=>{setapikey(e.target.value)}} required/>
        <button onClick={()=>{localStorage.setItem("openaikey",apikey); setapikey("")}}>Enter</button>
   </div>
  )
}

