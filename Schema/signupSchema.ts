import {z} from 'zod'
export const validatUsername= 
z.string()
.min(2,"user name must have atleast 2 characters")
.max(2,"user name must not be more than 20 chars")
.regex(/^[A-Za-z0-9_]+$/,"User name must not contain special chars")

export const SignupSchema= 
// we have to check multiple value such as email pass so we are making password
z.object({

username:validatUsername,
email:z.string().email({message:"invalid email"}),
password:z.string().min(6, {message:"password must be atleast 6 chars"})







})



