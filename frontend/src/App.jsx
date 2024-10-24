import { Navigate, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import WatchPage from './pages/WatchPage'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/404'
function App() {

const {user,isCheckingAuth,authCheck}=useAuthStore();
// console.log("auth user is here,user",user)

useEffect(()=>{
  authCheck();
},[authCheck]);

// if cheking for auth , return loader while checking it
if(isCheckingAuth){
  return (
    <div className='h-screen'>
    <div className='flex justify-center items-center bg-black h-full'>
      <Loader className='animate-spin text-red-600 size-10' />
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
      <Route path='/watch/:id' element={user ? <WatchPage/> : <Navigate to ={"/login"} />}/>
      <Route path='/search' element={user ? <SearchPage/> : <Navigate to ={"/login"} />}/>
      <Route path='/history' element={user ? <SearchHistoryPage/> : <Navigate to ={"/login"} />}/>
      <Route path='/*' element={<NotFoundPage/>}/>
      {/* if no any route match */}
    </Routes>
    <Footer/>
    <Toaster/>
    </>

  )
}

export default App


// go to frontend and then run in terminal
// npm run build  :-> it will give us a dist folder , in frontend folder
// npm run start  ;->to see it in dev mode and see chnages in live 