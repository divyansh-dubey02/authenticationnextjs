// Import necessary modules
import nodemailer from "nodemailer"; // Import nodemailer for sending emails
import bcryptjs from "bcryptjs"; // Import bcryptjs for hashing tokens
import User from "@/models/user.model"; // Import the User model for database operations

// Define the sendEmail function to handle sending emails for verification or password reset
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Hash the user ID to create a unique token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log("MAIL",userId);
    
    console.log("MAIL type",emailType);

    console.log(typeof emailType);

    // Update the user document in the database with the appropriate token and expiry time
    if (emailType === "VERIFY") {
      // If the email type is VERIFY, update the verifyToken and its expiry time

      await User.findByIdAndUpdate(userId, {
      $set: { verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // Token expires in 1 hour
       }
      });
    } else if (emailType === "RESET") {
      // If the email type is RESET, update the forgotPasswordToken and its expiry time
      await User.findByIdAndUpdate(userId, {

        $set:{forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,} // Token expires in 1 hour
      });
    }

    // Configure the email transport using nodemailer
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP server
      port: 2525, // Port for Mailtrap
      auth: {
        user: "cbd8e9898c6422", // Mailtrap user
        pass: "57f69cd08549f7", // Mailtrap password
      },
    });

    // Define the email options
    const mailOptions = {
      from: "divyanshdubey", // Sender address
      to: email, // Recipient email address
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // Subject line based on email type
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.<br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`, // Email body with a link to verify or reset password
    };

    // Send the email and return the response
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    // If an error occurs, throw a new error with the error message
    throw new Error(error.message);
  }
};
