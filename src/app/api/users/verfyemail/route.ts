

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect();


export async function POST(req: NextRequest, ){
   
    try {
        const reqBody = await req.json();
        const {token} = reqBody
        console.log(token)
        
       const user = await User.findOne({ 
            verifyToken:token, 
            verifyTokenExpiry:{$gt:Date.now()}
        })
        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:500})
        }
        console.log(User);

        user.isVerfied = true,
        user.verfyToken = undefined,
        user.verfyTokenExpiry = undefined,
        await user.save()

        return NextResponse.json({
            message:"Email verified successfully",
            success:true,
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
        
    }
}
