// import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser"

const SignUpPage = () => {

  // new URL create the new URL obj from  string representing the current page's URL. 
  const {searchParams} =new URL(document.location)  // this document.location refres to current URL of webpage
  const emailValue=searchParams.get("email")


  const [email, setEmail] = useState(emailValue || " ");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

// useAuthStore to get signup function in this file
 const {signup}= useAuthStore();   // now call this fnc with credentil



  const handlerSignup=(e)=>{
    e.preventDefault();
    // console.log(email,username,password)
    // calling this signup function with credential
    signup({email,username,password});

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
            Sign Up
          </h1>

          <form className="space-y-4 " onSubmit={handlerSignup}>

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
              <label htmlFor="username" className="text-sm font-medium text-gray-300 block ">
                userName
              </label>

              <input type="text"
               className="w-full PX-3 PY-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
               focus:outline-none focus:ring"
                 placeholder="krishan "
                  id="username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}>
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
            sign up
           </button>

            

          </form>

          <div className="text-center text-gray-400 ">
            Already a member ? {" "}
            <Link to ={"/login"} className="text-red-500 hover:underline">sign in</Link>
          </div>
        </div>
      </div>



    </div>
  )
}

export default SignUpPage
