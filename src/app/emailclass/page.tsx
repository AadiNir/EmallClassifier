"use client"
import axios from "axios";
import { useEffect } from "react";

export default function Emailclass() {
  async function login() {
    try {
      const response = await axios.get('http://localhost:3000/getemails', {
        withCredentials: true // Ensure cookies are included in the request if needed
      });
      console.log(response)
      // The server will redirect, so no further action is needed here
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
}
