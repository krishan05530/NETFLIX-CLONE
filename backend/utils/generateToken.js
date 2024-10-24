import jwt from "jsonwebtoken"

import { ENV_VARS } from "../config/envVars.js"

export const generateTokenAndCookie=(userId,res)=>{
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"});// 15 days
              
              // its name of cookie
    res.cookie("jwt-netflix",token,{
        maxAge:15*24*60*60*1000, // this is in miiilisecon
        httpOnly:true,  // this make sure this cookies is only accesbly via browser , it prevent  xss attack// make it not be accesible by js
        sameSite:"strict",
        secure:ENV_VARS.NODE_ENV!=="development"   // secure true when its in development , deployed

        //only in https(devlopment) its gonna be true but in localhost(http) its false 
    });
    return token;
};

// use hsa256 algo
//SHA-256: A cryptographic hash function that produces a fixed 256-bit (32-byte) hash value from any input data.
// The input data is often called the message, and the hash value is often called the message digest or simply the digest.

/*
A JWT typically consists of three parts:
Header: Contains metadata about the token, including the type of token (JWT) and the signing algorithm (e.g., HS256).
Payload: Contains the claims (the data you want to transmit, such as user ID and other information).
Signature: The result of signing the header and payload using the specified algorithm and a secret key.
The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.
*/
