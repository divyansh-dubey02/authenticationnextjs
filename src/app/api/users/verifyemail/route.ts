// Import necessary modules and functions
import { connect } from "@/dbconfig/dbConfig"  // Import the connect function to connect to the database
import User from "@/models/user.model"         // Import the User model for database operations
import { NextRequest, NextResponse } from 'next/server'  // Import Next.js request and response types

connect()

export async function POST(request:NextRequest) {
  
  try {
    const reqBody=await request.json()
    const {token}=reqBody
    console.log(token);

 const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

 if(!user){
  return NextResponse.json({error:"invalid token"},{status:400})
 
 }
console.log(user);


user.isVerified=true
user.verifyToken=undefined
user.verifyTokenExpiry=undefined

await user.save()

return NextResponse.json({message:"email verified successfully",success:true},
  {status:200}
)

  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}