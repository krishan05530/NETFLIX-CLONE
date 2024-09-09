import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateTokenAndCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;  // to use this we have added   app.use(express.json());  in server.js , as it allow to parse req.body
        if (!email || !password || !username) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            })
        }


        //abc@xyz  we are using this regular expression to check if its valid email or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({     // 400 mean cant process this due to clint error
                success: false,
                message: "Invalid email"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be least 6 character"
            })
        }


        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "email already exisit" })
        }

        const existingUserUsername = await User.findOne({ username: username });
        if (existingUserUsername) {
            return res.status(400).json({ success: false, message: "username already exisit" })
        }

        // encrypt the password with this salt
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        /// user can select the image randomly 
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // const newUser=new User({
        //     email:email,
        //     password:password,
        //     username:username,
        //     image:image
        // })

        const newUser = new User({  // we can do this way also
            email,
            password: hashPassword,
            username,
            image
        });

        // now save it to db wiht generated token
        //now generate token and send it with cookies and add in db
        generateTokenAndCookie(newUser._id, res);  // here i am passing the id
        await newUser.save();
         


        // if we signup successfully we will return user obj
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,  // _doc is propert that return actual data lik email ,name , like mention in the schema
                password: ""  // returnig paasword as empty string
            },
        });





        // 201mean created somthing
        // remove password from response



    }
    catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })

        }

        const user=await User.findOne({email:email});
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"invalid credential",
            })
        }

        const isPasswordCorrect=await bcryptjs.compare(password,user.password);
        if(!isPasswordCorrect)
        {
            return res.status(400).json({
                success:false,
                message:"invalid credential",
            })
        }

        // if all field match then genreate tokken and send it to user broweser with cookies
        generateTokenAndCookie(user._id,res);
       
        return res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:""
            }
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            success:false,
            message:"Inernal Server Error"
        })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix"); // its usefull way to remove cookie from client browser , helpful for logginngout or clearing session data

        res.status(200).json({
            success: true,
            message: "Logged out succesfully"

        })
    }
    catch (error) {
        console.log("error in logout ", error.message);
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}


export async function authCheck(req,res) {
    try{
        console.log("req.user", req.user);
  res.status(200).json({
    success:true,user:req.user
  })
    }
    catch(error)
    {
        console.log("error in authcheck controler", error.message);
        res.status(500).json({success:false,message:"internal server error"});
    }
}


