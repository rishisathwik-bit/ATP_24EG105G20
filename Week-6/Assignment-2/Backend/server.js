import exp from 'express'
import { connect} from 'mongoose'
import cors from 'cors'


const app=exp();
//add cors middleware
app.use(cors({
    origin:["http://localhost:5173"],
}),
);
// body parser middleware
app.use(exp.json());
//emp api middleware


//db connection
const connectDB=async()=>{
    try{
        await connect("mongodb://localhost:27017/empdb");
       console.log("DB Connected Successfull");
       app.listen(4000,()=>console.log("Server listening on port 4000..."));
    }catch(err){
        console.log("err in db connection ",err.message);
    }

};

connectDB();

//error handling middleware
app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});