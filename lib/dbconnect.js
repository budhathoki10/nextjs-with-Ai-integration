import mongoose from "mongoose";

const Connectiondatabase= async ()=>{

    try {
       const db=  await mongoose.connect(process.env.MONGOURI).then(()=>{


console.log("Sucessfully connected to database");

       })
       .catch(()=>{
console.log("error in connect to db ")
       })
    //    console.log(db.connection[0].readyState)
    //     console.log("connection")
    } catch (error) {
        
    }
}
module.exports= Connectiondatabase