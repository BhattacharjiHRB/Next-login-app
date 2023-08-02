

import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, username, password} = reqBody
        console.log(reqBody);

        // Check User exists
       const user = await User.findOne({username});
        if (!user){
            return NextResponse.json({error:"User not found"},{status: 400});
        }
        console.log("User already exists");

        const validEmail = await User.findOne({email});
        if (!validEmail) {
            return NextResponse.json({error:"User Cannot be found",status: 400});
        }
        console.log("Valid User");

        //  check password correct  
        const validPassword = await bcrypt.compare(password, reqBody.password) 
            if (!validPassword) {
                return NextResponse.json({error:"Password incorrect"},{status: 400});
            } 
            console.log(user)

        // create token data
        const tokenData = {
            id: user._id,
            username : user.username,
            // email: user.email
        }
        // Token Creation
        const token = jwt.sign(tokenData, process.env.TOKEN_SECTRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message : "Login successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500});
    }
}