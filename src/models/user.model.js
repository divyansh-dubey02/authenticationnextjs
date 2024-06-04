// Import the mongoose module for database operations
import mongoose from "mongoose";

// Define the User schema with various fields and their validation requirements
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String, // The username field is of type String
      required: [true, "Please provide a username"], // It is a required field with a custom error message
      unique: true, // The username must be unique
    },
    email: {
      type: String, // The email field is of type String
      required: [true, "Please provide an email"], // It is a required field with a custom error message
      unique: true, // The email must be unique
    },
    password: {
      type: String, // The password field is of type String
      required: [true, "Please provide a password"], // It is a required field with a custom error message
    },
    isVerified: {
      type: Boolean, // The isVerified field is of type Boolean
      default: false, // The default value is false
    },
    isAdmin: {
      type: Boolean, // The isAdmin field is of type Boolean
      default: false, // The default value is false
    },
    forgotPasswordToken: String, // Field to store the forgot password token
    forgotPasswordTokenExpiry: Date, // Field to store the expiry date of the forgot password token
    verifyToken: String, // Field to store the email verification token
    verifyTokenExpiry: Date, // Field to store the expiry date of the email verification token
  },
  { timestamps: true }
); // Add timestamps to the schema to automatically manage createdAt and updatedAt fields

// Define the User model using the schema, or use an existing model if it already exists
const User = mongoose.models.users || mongoose.model("users", UserSchema);

// Export the User model for use in other parts of the application
export default User;
