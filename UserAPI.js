//create min-express app(seperate route)
import exp from 'express'
import {UserModel} from '../models/UserModel.js'
import { productModel } from '../models/productModel.js'
import{hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js'
const {sign}=jwt
export const userApp=exp.Router()
//define user rest api routes 

//user login
userApp.post('/auth',async(req,res)=>{
  const {email,password}=req.body;

  //verify email
  let user=await UserModel.findOne({email:email})
  //if email not existed
  if(user==null){
    return res.status(404).json({message:"Invaild Email"})
  }

  //compare passwords
  let result=await compare(password,user.password)

  //if password not matched
  if(result==false){
    return res.status(400).json({message:"Invaild Password"})
  }

  //if password are matched
  //create token (jsonwebtoken -jwt --jaat)
  const signedToken =sign({email:user.email},"abcedf",{expiresIn:"1h"})
  //send token as httponly cookie
  res.cookie("token",signedToken,{
    httpOnly:true,
    sameSite:"lax",
    secure:false
  })
  res.status(200).json({message:"Login Success",payload:user})
})



  //create new user
  userApp.post("/users",async(req,res)=>{
    //get new user obj from req
    const newUser=req.body;
    // hash the paasword
    const hashedPassword=await hash(newUser.password,10)
    //replace plain password with hashed password
    newUser.password=hashedPassword;
    //create new document
    const newUserDocument= new UserModel(newUser);
    //save
   const result= await newUserDocument.save()
    console.log("result:",result)
    //send ress
    res.status(201).json({message:"user created"});
  
  });
    //read all users from db
  userApp.get("/users",async (req, res) => {

  //read all users from db
  let usersList = await UserModel.find();
  //send res
  res.status(200).json({ message: "users", payload: usersList });
});

//read users
userApp.get("/user",verifyToken,async(req,res)=>{
    const emailOfUser=req.user?.email
    //find user by id
    const userObj=await UserModel.findOne({email:emailOfUser}).populate("cart.product")
    if(!userObj){
      return res.status(404).json({message:"User not found"})
    }
    //send res
    res.status(200).json({message:"user",payload:userObj})
})
//update A user by id
userApp.put("/users/:id",async(req,res)=>{
    //get modified user from req
    const modifiedUser=req.body;
    const uid=req.params.id;
     // hash the paasword
    const hashedPassword=await hash(modifiedUser.password,10)
    //replace plain password with hashed password
    modifiedUser.password=hashedPassword;
    //find user by id and update
    const updatedUser = await UserModel.findByIdAndUpdate(uid,
      {$set:{...modifiedUser}},
       {new:true, runValidators:true });
       //send res
       res.status(200).json({message:"user modified",payload:updatedUser})
    });
//delete user by id
userApp.delete("/users/:id",async(req,res)=>{
  //get id from req params
  let uid=req.params.id;
  //find and delete user by id
  let deletedUser=await UserModel.findByIdAndDelete(uid)
  if(!deletedUser){
    return res.status(404).json({message:"user not found"});
  }
  //send res
  res.status(200).json({message:"user removed",payload:deletedUser})

})


/*
//Add product to cart
userApp.put("/cart/product-id/:pid",verifyToken,async(req,res)=>{
  //get product id from url
  let productId=req.params.pid;
 //get current user details
 const emailOfUser=req.user?.email

 //add product to cart
 let result=await UserModel.findOneAndUpdate({email:emailOfUser},
  {$push:{cart:{product:productId}}})
 // if User invaild
 if(!result){
  return res.status(404).json({message:"User not found"})
 }
 res.status(200).json({message:"Product Added to cart"})
})
*/


userApp.put("/cart/product-id/:pid",verifyToken,async(req,res)=>{
  //get product id from url
  let productId=req.params.pid;
 //get current user details
 const emailOfUser=req.user?.email

//Before add,first it should check that product is already int the cart
// If the product is there then increment count by 1
// otherwise add the product to cart

if(cart.product.id==pid){
   cart.count++  }
   
 //add product to cart
 let result=await UserModel.findOneAndUpdate({email:emailOfUser},
  {$push:{cart:{product:productId}}})
 // if User invaild
 if(!result){
  return res.status(404).json({message:"User not found"})
 }
 res.status(200).json({message:"Product Added to cart"})
})
