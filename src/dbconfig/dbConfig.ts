// Import the mongoose module for database operations
import mongoose from "mongoose";

// Define the connect function to establish a connection to the MongoDB database
export async function connect() {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    // The exclamation mark ensures TypeScript that process.env.MONGO_URI will always have a value
    await mongoose.connect(process.env.MONGO_URI!);

    // Get the connection instance
    const connection = mongoose.connection;

    // Set up an event listener for the 'connected' event
    connection.on('connected', () => {
      console.log("MongoDB connected");
    });

    // Set up an event listener for the 'error' event
    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure the database is up and running: ' + err);
      // Exit the process if there's a connection error
      process.exit();
    });
  } catch (error) {
    // Log any errors that occur during the connection process
    console.log('Something went wrong in connecting to the database');
    console.log(error);
  }
}
