'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function verifypage() {

// const router =useRouter()
 const [token,settoken]= useState("")
const [verified,setverified]= useState(false)
const [error,seterror]=useState(false)

const verifyUseremail =async ()=>{
 try {
   await axios.post("/api/users//verifyemail",{token});
   setverified(true);
   seterror(false)
 } catch (error:any) {
    seterror(true)
    console.log(error.response.data);
 }
}

useEffect(()=>{
  seterror(false)
 const urltoken= window.location.search.split("=")[1]
 settoken(urltoken||"")

//  const {query}=router;
// const urltokentwo= query.token

},[])

useEffect(()=>{
  seterror(false)
if (token.length>0) {
  verifyUseremail()
}
},[token])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col w-[700px] h-[300px] bg-gray-900  rounded-lg border-2 border-white items-center py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-3 bg-orange-500 text-black'>{token? `${token}`:"No Token"}</h2>
        {verified&& (
          <div>
            <h2>Verified</h2>
            <Link href="/login"></Link>
          </div>
        )}

      {error&& (
          <div>
            <h2>Error</h2>
          </div>
        )}

      </div>
    </div>
  )
}
