"use client"
import axios from "axios";
import { useEffect } from "react";

export default function Emailclass() {
  async function login() {
    let code = localStorage.getItem('oauth-token')
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/emailclassifier/oauth2callback?code=${code}`)
      console.log(response)
      // The server will redirect, so no further action is needed here
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

//   useEffect(() => {
//     login();
//   }, []);
  return (
    <div>
      <h1>Logging in...</h1>
      <button onClick={login}>hoijsidwjiowi</button>
    </div>
  );
}
