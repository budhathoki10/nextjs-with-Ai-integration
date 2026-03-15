import {getServerSession} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/option"
import connectToDatabase from "../../../lib/dbconnect"
import userModel from "../../../model/user.model"
import {User} from "next-auth"
import { tr } from "zod/v4/locales"

export async function GET(req,res){
    await connectToDatabase()

// initially get the logged in user so for that we need getserversession

const session= await getServerSession(authOptions)

const user= session?.user
const UserID= user.id
if(!session || !session.user){
    return NextResponse.json(
            { message: "Not authenticated user " },
            { status: 401 }
          );
}



}