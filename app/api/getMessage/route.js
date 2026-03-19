import {getServerSession} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/option"
import connectToDatabase from "../../../lib/dbconnect"
import userModel from "../../../model/user.model"
import {User} from "next-auth"
import { tr } from "zod/v4/locales"
import mongoose from "mongoose"
import { success } from "zod"
import { NextResponse } from "next/server"


export async function GET(req,res){
    await connectToDatabase()

// initially get the logged in user so for that we need getserversession

const session= await getServerSession(authOptions)

const user= session?.user
// console.log("userrrrrrrrrrrrrrrrrrrrrrrrr",user)

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
const user = await userModel.aggregate([
  { $match: { _id: UserID } },              // find the user
  { $unwind: "$Message" },                  // explode the Message array into individual docs
  { $sort: { "Message.createdAt": -1 } },             // sort those individual messages
  { $group: { _id: "$_id", Message: { $push: "$Message" } } } // rebuild array in sorted order
])
console.log("userrrrrrrrrrrrrrrrrrrrrrrrr",user)

if(!user){
  return NextResponse.json(
    {success:false,
      message: "user not found from mongo db pipeline" },
      { status: 400 }
    );
  }
  
  console.log("user.message is this is",user[0].Message)
  // note aggregation always return an array
  return NextResponse.json(
    
    
    { message: user[0].Message },
    { status: 200 }
  );

    
} catch (error) {
        return NextResponse.json(
            { message: "internal server error " },
            { status: 403 }
          );
}



}