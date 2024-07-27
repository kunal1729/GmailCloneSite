'use client'
import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Mails from '../components/Mails'
import { useState } from 'react'
import NewMail from '../components/NewMail'
import AppContext  from '../context.js'

const Emails = () => {

  const [compose, setCompose] = useState(false)
  
  const {menu, type, setType} = useContext(AppContext)
  const {smtpPass, smtpPort, smtpUser, host, message, setMessage, ImapPort} = useContext(AppContext);
    
  return (
    <div className='flex relative min-h-screen p-2 bg-gray-100 h-full w-full pb-2 '>
        {menu ? (
            <Sidebar type = {type} setType = {setType} setCompose={setCompose} compose = {compose}/>
          )
         : null}

        <Mails setMessage={setMessage} smtpPass = {smtpPass} ImapPort = {ImapPort} smtpUser = {smtpUser} host = {host} compose={compose} message = {message} type={type} />
        <NewMail smtpPass = {smtpPass} host = {host} smtpPort={smtpPort} smtpUser={smtpUser}  setCompose = {setCompose} compose = {compose} />
    </div>
  )
}

export default Emails;
