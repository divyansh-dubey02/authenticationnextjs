'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function loginPage() {
const router =useRouter()
  const [user,setUser]=useState({
    email:"",
    password:""
  })

  const [buttonDisabled,setButtonDisabled]=useState(false)

  const [loading,setLoading]=useState(false)

  const onlogin =async () =>{
    try {
      
     setLoading(true)
   const response= await axios.post("/api/users/login",user)

   console.log("login successfully",response.data)
   toast.success("login Successfully")
    router.push('/profile')
    } catch (error:any) {
      console.log("login failed")
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(user.email.length>0&&user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col w-[290px] h-[500px] bg-gray-900  rounded-lg border-2 border-white items-center py-2'>
        <h1 className=' mt-3 mb-2 text-2xl text-[#f1ef65]'>{loading ? "Processing" : "Log In"}</h1>
        <hr className='my-4 w-full' />
        
        <label htmlFor="email"className='mb-2 text-[#f1ef65]'>Email</label>
        <input
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          id='email'
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='Enter email'
        />
        
        <label htmlFor="password" className='mb-2 text-[#f1ef65]'>Password</label>
        <input
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          id='password'
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='Enter password'
        />
        <button onClick={onlogin} className='border-2 border-white rounded-lg p-2 mt-4 w-[140px] bg-[#0162f4] text-[#f1ef65] focus:outline-none'>
          {buttonDisabled? "No login":"Log In" }
        </button>
        <Link href="/signup" className="mt-[22px] text-[#f1ef65]">Visit SignUp Page ?</Link>

      </div>
    </div>
  );
    
}










