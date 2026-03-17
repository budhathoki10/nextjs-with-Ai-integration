import {success, z} from 'zod'
import connectToDatabase from '../../../lib/dbconnect'
import userModel from '../../../model/user.model'
import validateUsername from "../../../Schema/signupSchema"
 
export async function POST(req,res){
try {
    await connectToDatabase();
    const {username,code}= await req.json()
    const decodeduserName= decodeURIComponent(username)

    // now we are checking if the otp code sucessfully corect or not 

    const user= await userModel.findOne({username:decodeduserName})
    if(!user){
        return Response.json({
        message:"user not founds",
        success:false
    },{
        status:400
    })
    }

    const isValidcode= user.verifyCode== code
    const isdateExpiryornot= new Date( user.verifyCodeExpiry )>new Date()



    if(isValidcode && isdateExpiryornot){
user.isVerified= true
await user.save();
 return Response.json({
        message:"user is verified sucessfully",
        success:true
    },{
        status:200
    })
    }
    else if(!isdateExpiryornot){
    return Response.json({
        message:"code is expired, please signup again",
        success:false
    },{
        status:400
    })
    }
    else if(!isValidcode){
         return Response.json({
        message:"incorrect OTP code try again!!!",
        success:false
    },{
        status:400
    })
    }
} catch (error) {
     return Response.json({
        message:error,
        success:false
    },{
        status:500
    })
}
}