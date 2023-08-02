
import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse} from "next/server";



connect();

export async function GET(req: NextRequest){
    try {
       const userID =  await getTokenData(req);
       const user = await User.findOne({_id: userID}).select("-password")
       
       return NextResponse.json({
        message : "User Found",
        data: user

       });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status:400});
    }
}