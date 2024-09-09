import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

// import React from 'react'
export default function HomePage() {
  const {user}=useAuthStore();
  return (
    <>
      {
        user ? <HomeScreen/> : <AuthScreen/>
      }
    </>
  )
}
