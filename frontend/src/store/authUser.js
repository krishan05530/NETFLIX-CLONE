// zustand is getting used here ,its gloabl state management library
// 3:34.00 time
import axios from 'axios';
import {create} from 'zustand';
import toast from 'react-hot-toast'
// basiclly creating hook  // creat its call back func return obj act as state
export const useAuthStore=create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn:false,

    signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("/api/v1/auth/signup", credentials);
            console.log("response");
            console.log(response);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},

    login: async (credentials)=>{
        try{
            set({isLoggingIn:true})
            const response=await axios.post("/api/v1/auth/login", credentials);
            set({user:response.data.user, isLoggingIn:false});
            toast.success("Login Succesfully");
        }
        catch(error)
        { set({isLoggingIn:false, user:null})
             toast.error(error.response.data.message ||"login failed");
            
        }
    },


    logout: async ()=>{
         set( {isLoggingOut:true});

        try{
    await  axios.post("/api/v1/auth/logout");
    set({user:null,isLoggingOut:false});
    toast.success("logged out succesfully")
        }
        catch(error)
        {
           set({isLoggingOut:false});
           toast.error(error.response.data.message ||"Logout failed");
        }
    },

    authCheck:async ()=>{
        set({isCheckingAuth:true});
        try{
 const response= await axios.get("/api/v1/auth/authCheck");
 set({user:response.data.user, isCheckingAuth:false})
        }
         catch(error)
        {
            set({isCheckingAuth:false,user:null})
            
            // toast.error(error.response.data.message || "an error occured")
        }
    },
}))




/// NOTe:-> 
// set({user:response.data.user})  // setting the user , as we receive the response  , use data me se user ki value ko use kar rhe he  

// if we signup succesfully we return user obje in signup controller
// user: {
//     ...newUser._doc,
//     password: ""  // returnig paasword as empty string
// },
