import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    searchHistory:{
        type:Array,
        default:[]
    }

})

// create a User collection that is based on userSchema
const User=mongoose.model('User',userSchema);  // i am passing the userSchema as User 
                         //U should be capital ,

    export default User;