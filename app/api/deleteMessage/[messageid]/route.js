import {getServerSession} from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/option"
import connectToDatabase from "../../../../lib/dbconnect"
import userModel from "../../../../model/user.model"
import {User} from "next-auth"
import { tr } from "zod/v4/locales"
import mongoose from "mongoose"
import { success } from "zod"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export async function DELETE(req,res){
    await connectToDatabase()

// initially get the logged in user so for that we need getserversession
const params= useParams()
const session= await getServerSession(authOptions)

const user= session?.user
const messageId= params.messageId

// our id is string and to make perform a  mongo db pipeline we need a id so to match we have to convert into mongodb object
// so we cant pass the string id 
// const UserID= user._id
const UserID= new mongoose.Types.ObjectId(user._id);

if(!session || !session.user){
    return NextResponse.json(
            { message: "Not authenticated user " },
            { status: 401 }
          );
}

try {
   const updateResult=  await userModel.updateOne({
_id:user._id
      
    },
{$pull:{Message:{_id:messageId}}})

if(updateResult.modifiedCount==0){
    return NextResponse.json(
            { sucess:false,
            message: "message not found or cannot updated" },
            { status: 404 }
          );
}

   return NextResponse.json(
            { sucess:true,
            message: "deleted" },
            { status: 200 }
          );

} catch (error) {
       return NextResponse.json(
            { sucess:false,
            message: "internal server error" },
            { status: 500 }
          );
}



}