// Import necessary modules and functions
import { connect } from "@/dbconfig/dbConfig"  // Import the connect function to connect to the database
import { NextRequest, NextResponse } from 'next/server'  // Import Next.js request and response types

connect()

export async function GET(request:NextRequest) {
  try {
    
      const response=NextResponse.json({message:"logout successfully",
        success:true
      })

      response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0)
      })

      return response;


  } catch (error:any) {
   return NextResponse.json({error:error.message},{status:500})
  }
}