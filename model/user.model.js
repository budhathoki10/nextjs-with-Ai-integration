import mongoose, { Schema } from "mongoose";


const messageschmea= new Schema({
content:{
    type:String,
    required:true
},

username:{
    type:String,
    required:[true,"Username is required"],
    trim:true
},
email:{
    type:String,
    required:[true,"email is required"],
    trim:true,
    unique:true,
    match:[,"please use a valid email address"]
},
password:{
    type:String,
    required:[true,"password is required"],
},
verifyCode:{
    type:String,
    required:[true,"veryfy code is required"],
},
verifyCodeExpiry:{
    type:Date,
    required:[true,"veryfy code expiry is required"],
},
isVerified:{
    type:Boolean,
    default:false

},
isexceptingMessage:{
    type:Boolean,
    default:true
},
Message:[
   {
    type:String
   }
],

createdAt:{
    type:Date,
    required:true,
    default:Date.now

}
})
const userModel= mongoose.model("User",messageschmea)
export default userModel