// Import necessary modules and functions
import { connect } from "@/dbconfig/dbConfig"  // Import the connect function to connect to the database
import User from "@/models/user.model"         // Import the User model for database operations
import { NextRequest, NextResponse } from 'next/server'  // Import Next.js request and response types
import { getDatafromToken } from "@/helpers/getdatafromtoken"



connect()

export  async function POST(request:NextRequest) {
  // extract data from token 
  const userId=  await getDatafromToken(request)
 const user= await User.findOne({_id:userId}).select("-password")

//check if there is invlid user 

return NextResponse.json({
  message:"user  found",
  data:user
})
}