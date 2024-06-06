"use client"
import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();
  const clientId = "279123070487-9ndn9g3m26p7lfu94655ifmnn8e7p141.apps.googleusercontent.com";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apikey,setapikey]=useState(""); 

  useEffect(() => {
    const token = localStorage.getItem("oauth-token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(()=>{
    if(isLoggedIn && localStorage.getItem("openaikey")){
      router.push('/emailclass')
    }else{
      console.log("please enter openai api key")
    }
  },[isLoggedIn,apikey])

  const handleLoginSuccess = (credentialResponse:any) => {
    localStorage.setItem("oauth-token", credentialResponse.credential);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("oauth-token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <div>
          <h1>My Application</h1>
          {!isLoggedIn ? (
            <>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            </>
          ) : (
            <button onClick={handleLogout}>Logging out</button>
          )}
        </div>
      </GoogleOAuthProvider>
      <input className="text-slate-950" placeholder="enter openAi Api key" onChange={(e)=>{setapikey(e.target.value)}} required/>
        <button onClick={()=>{localStorage.setItem("openaikey",apikey); setapikey("")}}>Enter</button>
   </div>
  )
}

