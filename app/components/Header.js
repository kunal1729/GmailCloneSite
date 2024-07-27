'use client'
import React, { useContext } from 'react'
import { Tooltip } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import  AppContext from '../context'
import { BsMailbox2 } from "react-icons/bs";


const Header = () => {

  const [isActive, setIsActive] = useState(false)
  const {setMenu, type} = useContext(AppContext);
  const [tab, setTab] = useState("Login")
  
//   const [status, setStatus] = useState(second)

  const handleMenu = () =>
  {
    setMenu((prev) => !prev)
  }

  const handleSearch = () =>
  {
    setIsActive((prev) => !prev)
  }

  return (
    <div className='h-16 p-2 lg:pl-8 pr-8 w-full shadow-lg flex justify-between' >
        
        <div className='space-x-8 ml-2 flex'>
            {tab === "Emails" ?
            <button onClick={handleMenu}>
                <Tooltip title = "Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                </Tooltip>
            </button> : null}
            {!isActive ?
            <Link href = '/' className=' hover space-x-2 items-center flex'>
                <BsMailbox2 className='w-8 h-8' />
                <span className='font-semibold text-xl hidden md:inline text-gray-500'>Fintract WebMail</span>
            </Link>
            : null}
            
        </div>
        
        {/* <div className='items-center md:inline hidden p-2 bg-[#eaf1fb] rounded-full relative'>
            <button className='absolute top-4'>
                <Tooltip title = 'Search'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </Tooltip>
            </button>
            <input className='ml-8 p-1  focus:outline-none bg-[#eaf1fb] ' type='text' placeholder='Search mail' />
            
        </div> */}
        {/* <div>
            {isActive ?
            <input className='ml-8 p-2  focus:outline-none bg-[#eaf1fb] ' type='text' placeholder='Search mail' />
            : null}
            <button onClick={handleSearch} className=' md:hidden bg-slate-200 rounded-full p-4 inline'>
                <Tooltip title = 'Search'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </Tooltip>
            </button>
        </div> */}
        
        <div className='space-x-6 flex items-center'>
            <Link className={`${tab === "Login" ? "text-blue-600 font-semibold" : null}`} onClick={() => setTab("Login")} href = '/'>
                Login
            </Link>
            <Link className={`${tab === "Emails" ? "text-blue-600 font-semibold" : null}`} onClick={() => setTab("Emails")} href = '/ReceivedEmails'>
                Emails
            </Link>
        </div>
        
    </div>
  )
}

export default Header
