"use client"
import { useEffect, useRef, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { permanentRedirect, useRouter } from 'next/navigation'

import axios from 'axios'
import { comma } from "postcss/lib/list";
export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apikey,setapikey]=useState(""); 
  const [apikeyloggedin,setapikeyloggedin]=useState(false);
  const initalized = useRef(false);
  

  useEffect(()=>{

    if(isLoggedIn){
      router.push('/emailclass')
    }else{
      console.log("please enter openai api key")
    }
  },[isLoggedIn])

  // const handleLoginSuccess = (credentialResponse:any) => {
  //   setIsLoggedIn(true);
  //   console.log(credentialResponse)
  // };

  const googleauth= async()=>{
    const response = await axios.get('http://localhost:3000/api/v1/emailclassifier/getemails');
    window.location.assign(response.data);

  }

  const onFormSubmit=async ()=>{
    let code = window.location.href;
      let url = new URL(code);
      let queryParams = url.searchParams.get('code'); // This removes the leading "?"
      console.log(queryParams)
      if (queryParams) {
        try{
          const resp = await axios.get(`http://localhost:3000/api/v1/emailclassifier/newoauthcallbacknew?code=${queryParams}`,
            { withCredentials: true });
          localStorage.setItem('username',resp.data.name)
          localStorage.setItem('userpic',resp.data.picture)
          // initalized.current=true
          setIsLoggedIn(true);
        }catch(err){
          console.log(err)
        }
      } else {
        console.log("not yet")
      }
      localStorage.setItem("openaikey", apikey); 
      setapikey("") ;
    };
  

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
        onClick={onFormSubmit}
      >
        Log In
      </button>
    </div>
  );
  
}

