
import {connect} from "@/dbConfig/dbConfig"
import user from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mail";



connect()


export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        // check if username Exists
         const User = await user.findOne({email})
        if (User){
            return NextResponse.json({error: "User Already Exists"}, {status:400})
        }
        // Hash password
        const Salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, Salt)

        const newUser = new user({
            username,
            email,
            password: hashedPassword,
        })
       
       const savedUser = await newUser.save()
            console.log(savedUser)

            // Email Verification

        await sendEmail({email, emailType:"VERIFY",userId: savedUser._Id})


            return NextResponse.json({
                message : "User Created Successfully",
                success: true,
                savedUser

            })

            
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}