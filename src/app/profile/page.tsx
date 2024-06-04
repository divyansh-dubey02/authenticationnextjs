'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function profilePage() {
  const router =useRouter()
  const [data,setData]=useState("nothing")

  const getUserDetails =async()=>{
   try {
    const res= await axios
    .post("/api/users/me")
    console.log(res.data)
    setData(res.data.data.username)
   } catch (error:any) {
    console.log(error.message)
    toast.error(error.message)
   }
  }
const logout =async()=>{
  try {
    
    await axios.get("/api/users/logout")
    toast.success("logout Successfully")
      router.push('/login')
  } catch (error:any) {
    console.log(error.message)
    toast.error(error.message)
  }
}
  return (
    <div className='min-h-screen flex items-center justify-center' >
      <div className='flex flex-col w-[290px] h-[500px] bg-gray-900  rounded-lg border-2 border-white items-center py-2'>
        <h1  className=' mt-3 mb-2 text-2xl text-[#f1ef65]'>User Profile</h1>
        <hr />
        <h2>
          {data ==="nothing"?"No user data":<Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
        <hr />
        <button className='border-2 border-white rounded-lg p-2 mt-5  bg-[#01f452] text-black focus:outline-none' onClick={getUserDetails}>Get User Details</button>
        <button className='border-2 border-white rounded-lg p-2 mt-5 w-[140px] bg-[#0162f4] text-[#f1ef65] focus:outline-none' onClick={logout}>Logout</button>
      </div>
      </div>
  )
}