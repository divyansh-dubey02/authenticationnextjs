// Import necessary modules and functions
import { connect } from "@/dbconfig/dbConfig"  // Import the connect function to connect to the database
import User from "@/models/user.model"         // Import the User model for database operations
import { error } from "console"                // Import the error function from the console module
import { NextRequest, NextResponse } from 'next/server'  // Import Next.js request and response types
import bcryptjs from "bcryptjs"                // Import bcryptjs for password hashing
import { sendEmail } from "@/helpers/mailer"   // Import sendEmail function for sending emails

// Establish a connection to the database
connect()

// Define the POST function to handle user registration
export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get user details
    const reqBody = await request.json()
    const { username, email, password }: any = reqBody;

    // Log the request body for debugging
    console.log(reqBody);

    // Check if a user with the provided email already exists
    const user = await User.findOne({ email })
    if (user) {
      // If user exists, return an error response
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Generate a salt for hashing the password
    const salt = await bcryptjs.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user instance with the provided and hashed details
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    // Save the new user to the database
    const savedUser = await newUser.save();
    // Log the saved user for debugging
    console.log(savedUser);

    const userId =savedUser._id;

    // Send a verification email to the newly registered user
    await sendEmail({ email, emailType: 'VERIFY', userId: userId })

    // Return a success response with the saved user details
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser
    })

  } catch (error: any) {
    // If an error occurs, return an error response with the error message
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
