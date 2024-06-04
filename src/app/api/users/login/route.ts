// Import necessary modules and functions
import { connect } from "@/dbconfig/dbConfig"  // Import the connect function to connect to the database
import User from "@/models/user.model"         // Import the User model for database operations
import { NextRequest, NextResponse } from 'next/server'  // Import Next.js request and response types
import bcryptjs from "bcryptjs"                // Import bcryptjs for password hashing
import jwt from "jsonwebtoken"
connect()

export async function POST(request:NextRequest){
  try {
    
    const reqBody = await request.json()
    const {email,password}= reqBody
    console.log(reqBody)

    //vaidation
    
    const user = await User.findOne({email})

    
    if(!user){
      return NextResponse.json({error:"user does not exists "},{status:400})
    }

      console.log("user exists");


  const validPassword =  await bcryptjs.compare(password,user.password)

  if(!validPassword){
    return NextResponse.json({error:"check your cridentials"},{status:400})
  }

    const tokenData ={
      id:user._id,
      username:user.username,
      email:user.email,
    }

   const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

   const response = NextResponse.json({message:"logged in successfully",success:true})

   response.cookies.set("token",token,{
    httpOnly:true
   })

   return response;

  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}