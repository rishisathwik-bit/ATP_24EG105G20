// create mini applications
import exp from 'express'
import {verifyToken} from '../middlewares/verifyToken.js'
import {ArticleModel} from '../models/ArticleModel.js'
import {UserModel} from '../models/UserModel.js'
export const adminApp = exp.Router()

// ROUTE TO READ ALL users

adminApp.get('/users',verifyToken("ADMIN"),async(req,res)=>{
    const usersList = await UserModel.find({ role: "USER" }).select("-password");
    if(!usersList){
        return res.status(404).json({message:"Users not found"});
    }
    res.status(200).json({message:"All users",payload:usersList})
})

adminApp.get('/authors',verifyToken("ADMIN"),async(req,res)=>{
    const authorsList = await UserModel.find({ role: "AUTHOR" }).select("-password");
    res.status(200).json({message:"All authors",payload:authorsList})
})

adminApp.get('/articles',verifyToken("ADMIN"),async(req,res)=>{
    const articlesList = await ArticleModel.find({})
        .populate("author", "firstName lastName email");
    res.status(200).json({message:"All articles",payload:articlesList})
})

// Bloack or activate the users

adminApp.patch('/users',verifyToken("ADMIN"),async(req,res)=>{
    // get the body from req
    let {userId,isUserActive} =  req.body;
    if(!userId || typeof isUserActive !== "boolean"){
        return res.status(400).json({message:"User ID and active status are required"});
    }
    // check for user present in db
    const user = await UserModel.findById(userId);
    if(!user){
        return res.status(404).json({message:"User/Author not found"});
    }
    user.isUserActive = isUserActive;
    await user.save();
    res.status(200).json({
        message: isUserActive ? "Activated the user" : "Blocked the user",
        payload: user
    });
})
