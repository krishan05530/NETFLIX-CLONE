import { LogOut, Menu } from 'lucide-react'

import { Search } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  
   const{setContentType}= useContentStore();
//    console.log("contentType:",contentType);
    return (
        <header className='mx-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 '>
            <div className='flex items-center gap-10 z-50'>
                <Link to="/">
                    <img src='/netflix-logo.png' alt='Netflix logo' className='w-32 sm:w-40' />
                </Link>
                     {/* onClick={setContentType("movie")} */}
                    {/* sm mean smaller screen and above */}
                    {/* onClick={setContentType("tv")} */}
                {/* desktop navbar , hidden fro smaller screen , but smaller screen and above its visible */}
                <div className='hidden sm:flex gap-2 items-center'>
                    <Link to="/" className="hover:Underline" onClick={()=>setContentType("movie")} >Movies</Link>
                    <Link to="/" className = "hover:Underline" onClick={()=>setContentType("tv")} >Tv Shows</Link>
                    <Link to="/history" className = "hover:Underline">Search History</Link>
                </div>
            </div>

            <div className='flex flex-row gap-2 items-center z-50 '>
                <Link to={"/search"}>
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <img src={user.image} alt='Avatar ' className='h-8 rounded cursor-pointer' />
                    <LogOut className='size -6 cursor-pointer' onClick={logout} />
                    <div className='sm:hidden'>
                        <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
                    </div>
            </div>

            {/*mobile navabr  */}

            {/* for smaller screen its going to e hidden , and for lower its viisvle */}
            {/* if its true then show  */}
            {isMobileMenuOpen && (
                <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                    <Link to={"/"}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}>Movie</Link>

                    <Link to={"/"}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}>Tv shows</Link>

                    <Link to={"/history"}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}>search history</Link>


                </div>
            )}
        </header>
    )
}
