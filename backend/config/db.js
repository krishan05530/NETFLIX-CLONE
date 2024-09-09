// now we are going to connect to our mongoDB database
import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const connectDB= async()=>{
try{
   const conn= await mongoose.connect(ENV_VARS.MONGO_URI);
   console.log("MONGO DB connected:"+conn.connection.host);   // here connection c is small
} 
catch(error)
{
    console.error("Error Connecting to MONGODB :"+error.message);
 process.exit(1);// 1 mean there was an error
}
}