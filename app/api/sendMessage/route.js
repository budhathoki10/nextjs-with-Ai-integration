import connectToDatabase from "../../../lib/dbconnect";
import userModel from "../../../model/user.model";

export async function POST(req,res){
await connectToDatabase();
const {username,content}= await req.json();

try {
    const user= await userModel.findOne({username:username})
    if(!user){
    return Response.json(
            { 
                sucess:false,
                message: 'user not found' },
            { status: 400 }
          );
    }
   if(!user.isexceptingMessage){
  return Response.json(
            { 
                sucess:false,
                message: 'user is not accepting the messages' },
            { status: 500 }
          );
   }

   const newMessage= {content,createdAt:new Date()}
   user.Message.push(newMessage);
   await  user.save();

     return Response.json(
            { 
                sucess:true,
                message: 'Message send sucessfully' },
            { status: 200 }
          );

} catch (error) {
         return Response.json(
            { 
                sucess:false,
                message: 'internal server error',
                error:error
             },
            { status: 500 }
          ); 
}
}