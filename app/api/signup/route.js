import Connectiondatabase from "../../../lib/dbconnect"
import userModel from "../../../model/user.model"
import bcrypt from "bcryptjs"
import sendVerificationEmail from "../../../helpers/sendVerificationemail"

export async function POST(request){

await Connectiondatabase();
try {
 const {username,email,password}=   await request.json();

} catch (error) {
    console.log(error)
    
}




}