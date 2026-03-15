import {getServerSession} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/option"
import connectToDatabase from "../../../lib/dbconnect"
import userModel from "../../../model/user.model"
import {User} from "next-auth"
import { tr } from "zod/v4/locales"

// logged in user can toggle if it have to turn on or off the messages

export async function POST(req,res){
try {
    await connectToDatabase()

// initially get the logged in user so for that we need getserversession

const session= await getServerSession(authOptions)
// console.log(session)
// console.log("hello")
const user= session?.user
const UserID= user.id
if(!session || !session.user){
    return NextResponse.json(
            { message: "Not authenticated user " },
            { status: 401 }
          );
}
  const {acceptingMessage}= await req.json()
  const usersfindandupdated= await userModel.findByIdAndUpdate(UserID,{isexceptingMessage:acceptingMessage},{new:true})
  if(!usersfindandupdated){
    return NextResponse.json(
            { message: "user not find and cannot update " },
            { status: 401 }
          );
          
  }


      return NextResponse.json(
            { message: "message acceptance is toggled sucessfully" },
            { status: 200 }
          );

} catch (message) {
    console.log(message)

       return NextResponse.json(
            { message: "server message" },
            { status: 500 }
          );
        

}

}

// just query from the database and send the status 
export async function GET(req,res){
    await connectToDatabase()

// initially get the logged in user so for that we need getserversession

const session= await getServerSession(authOptions)
// console.log(session)
// console.log("hello")
const user= session?.user
const UserID= user.id
if(!session || !session.user){
    return NextResponse.json(
            { message: "Not authenticated user " },
            { status: 401 }
          );
}

try {
    const foundUser= await userModel.findById(UserID)
    if(!foundUser){
        return NextResponse.json(
                { sucess:false,
                    message: "user not found " },
                { status: 401 }
              );
    }
    
     return NextResponse.json(
                { sucess:false,
                   isexceptingMessage:foundUser.isexceptingMessage
                 },
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