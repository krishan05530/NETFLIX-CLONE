import { Navigate, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
function App() {

const {user,isCheckingAuth,authCheck}=useAuthStore();
console.log("auth user is here,user",user)

useEffect(()=>{
  authCheck();
},[authCheck]);

// if cheking for auth , return loader while checking it
if(isCheckingAuth){
  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center bg-black h-full'>
        <Loader className='animate-spin text-red-600 size-10 '/>
      </div>

    </div>
  )
}
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={!user ? <LoginPage/>:<Navigate to= {"/"}/>}/>
      {/* if user is authenticated take him to signup page , otherwise navigate to home */}
      <Route path='/signup' element={!user ? <SignUpPage/> : <Navigate to ={"/"} />}/>

    </Routes>
    <Footer/>
    <Toaster/>
    </>

  )
}

export default App
