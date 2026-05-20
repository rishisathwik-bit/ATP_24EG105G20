import exp from 'express'
import {connect} from 'mongoose'
import{productApp} from "./APIs/productAPI.js";
const app=exp()
app.use(exp.json())
app.use('/product-api',productApp)

//connect to mongodb
async function connectDB(){
   try{
    await connect("mongodb://localhost:27017/Productdb");
    console.log("dB connection success");
    //start server
app.listen(4100,()=>console.log("Server on port 4100..."))
   }catch(err){
console.log("err in DB connection: ",err)
   }
}
connectDB()

app.use((err,req,res,next)=>{
   //Validation Error
   if(err.name=="ValidationError"){
      return res.status(400).json({message:"error occured",error:err.message})
   }
   // CastError
   if(err.name=="CastError"){
      return res.status(400).json({message:"error occured",error:err.message})
   }

   res.status(500).json({message:"error occured",error:err.message})
})
