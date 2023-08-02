import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username : {
        type : 'string', 
        required: [true, "Provide an username"],
        unique : true,
    },
    email : {
        type : 'string', 
        required: [true, "Provide an Email"],
        unique : true,
    },
    password : {
        type : 'string', 
        required: [true, "Provide a Password"],
    },
    isVerified : {
        type : 'boolean',
        default: false,
    },
    isAdmin : {
        type : 'boolean',
        default: false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verfyToken : String,
    verfyTokenExpiry : Date,

});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;