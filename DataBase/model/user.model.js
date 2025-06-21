import mongoose from "mongoose";
let userSchema = mongoose.Schema({
    name:{
        type: String,
        // required: true,
        // minLength:[3,"Too Short Name"]
    },
    email:{
        type: String
    },
    password:{
        type: String,
        // required: true,
        // minLength:[8,"password must not be less than 8 letters"]
    },
    age:{
        type: Number,
        // min:[13,"Too young"],
        // max:[90,"Too old"],
        // required: true
    },
    // (verified)
    verified:{
        type: Boolean,
        default: false,
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{timestamps:true})

export let userModel = mongoose.model("user",userSchema)