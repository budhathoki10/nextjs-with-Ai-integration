
import {success, z} from 'zod'
import connectToDatabase from '../../../lib/dbconnect'
import userModel from '../../../model/user.model'
import validateUsername from "../../../Schema/signupSchema"

// import { useSearchParams } from 'next/navigation'

const userNameSchema=z.object({
    username:validateUsername
})
export async function GET(req,res){


//   const searchParams = useSearchParams()
 
//   const search = searchParams.get('username')


//   now doing validation with zod


try {

    console.log("hello")
    await connectToDatabase();
// for extract query parameters
const {searchParams}= new URL(req.url);
const queryparams= {
    username:searchParams.get("username")
}
const results= userNameSchema.safeParse(queryparams);
console.log(results)
if(!results.success){
    return Response.json({
        sucess:false,
        message:"failed to check the query params"},{
        status:400
    })
}


const userName= await userModel.findOne({username:queryparams.username,isVerified:true});
if(userName){
    return Response.json({
        sucess:false,
        message:"user name is already taken"},{
        status:400
    })
}
else{
        return Response.json({
        sucess:true,
        message:"user name is available"},{
        status:200
    })
}

    
} catch (error) {
    console.log("Error to check user name",error)
    return Response.json({
        message:error,
        success:false
    },{
        status:500
    })
}

}
