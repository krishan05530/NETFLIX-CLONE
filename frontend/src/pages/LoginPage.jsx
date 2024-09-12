
// import React from 'react'
import { Link } from "react-router-dom"
import { useState } from "react";
import { useAuthStore } from "../store/authUser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const {login}=useAuthStore();

  const handleLogin=(e)=>{
    e.preventDefault();
    // console.log(email,password);
    login({email,password});
  }

  return (
    <div className="h-screen w-full hero-bg">
    <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}>
					<img src='/netflix-logo.png' alt='logo' className='w-52' />
				</Link>
			</header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md ">
          <h1 className="text-center text-white text2xl font-bold mb-4">
            Login
          </h1>

          <form className="space-y-4 " onSubmit={handleLogin}>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block ">
                Email
              </label>

              <input type="email"
               className="w-full PX-3 PY-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
               focus:outline-none focus:ring"
                 placeholder="krish@000.com"
                  id="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}>
              </input>

            </div>


            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block ">
                password
              </label>

              <input type="password"
               className="w-full PX-3 PY-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
               focus:outline-none focus:ring"
                 placeholder="******"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}>
              </input>

            </div>
           
           <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md">
            Login 
           </button>

            

          </form>

          <div className="text-center text-gray-400 ">
            Dont have an account ? {" "}
            <Link to ={"/signup"} className="text-red-500 hover:underline">sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}