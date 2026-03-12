import resend from "@/lib/resend.js"
import VerificationEmail from "../Email/emailverification"
import React from "react"
export const sendVerificationEmail=async(email,username,verifycode)=>{
try {
    await resend.emails.send({
from:"budhathokikushal170@gmail.com",
to:email,
subject:"opt verification",
react:VerificationEmail({username,
    otp:verifycode
})






    })
    
} catch (error) {
    console.log(error)
}
}