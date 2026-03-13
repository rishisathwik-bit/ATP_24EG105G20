import jwt  from 'jsonwebtoken'
export function verifyToken(req,res,next){
    //token verification logic
    const token=req.cookies?.token;
     //if req from unauthorized user
     if(!token){
        return res.status(401).json({message:"Plz Login"})
     }
     // if token is existed
     try{
  const decodedToken= verify(token,'abcdef')    
   console.log(decodedToken)
   
   next(); 
}catch(err){
  res.status(401).json({message:"Session expired.plz relogin"})
 }

}