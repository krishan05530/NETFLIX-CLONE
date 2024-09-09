
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"]
        if (!token) {
            // 401 -> unauthorize
             return res.status(401).json({    success: false, message: "unauthorize/no token provide "})
        }
        // console.log(token);
        // this decoded is object containig the payload (userID, expiration time, roles)

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) { return res.status(401).json({success: false, message: "unauthorized -invalid token"})}
        // console.log(decoded);
        // remove the password
        const user = await User.findById(decoded.userId).select("-password"); // userId was sent   to while creating token

        if (!user) { return res.status(400).json({success: false,   message: "user Not Found"})}

        //  adding the user to req ki body, now we wont we needing to fetch data from DB , we can directlty from user  like ->,user.searhcHistory ,
        req.user = user
        next();

    }
    catch (error) {
        console.log("error in protectRoute middleware", error.message)
        res.status(501).json({ success: false, message: " internal server error" })}
}


