"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Emailclass() {
    const[count,setcount]=useState(0);
  async function login() {
    let code = localStorage.getItem('oauth-token')
    try {
        if(count ==0){
            await axios.get('http://localhost:3000/newoauthcallbacknew', {
                withCredentials: true // Include credentials (cookies) in the request
              })
        }
    //   const response = await axios.get(`http://localhost:3000/api/v1/emailclassifier/oauth2callback?code=${code}`)
    //   console.log(response)
      // The server will redirect, so no further action is needed here
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  async function fetchemail(val:number){
    const resp = await axios.get(`http://localhost:3000/api/v1/emailclassifier/oauth2callback?count=${val}`, {
        withCredentials: true // Include credentials (cookies) in the request
      });
    console.log(resp)
  }

//   useEffect(() => {
//     login();
//   }, []);
  return (
    <div>
      <h1>Logging in...</h1>
      <button onClick={login}>hoijsidwjiowi</button>
      <button onClick={()=>fetchemail(20)}>Get me the subject</button>
    </div>
  );
}
