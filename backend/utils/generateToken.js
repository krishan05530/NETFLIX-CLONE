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