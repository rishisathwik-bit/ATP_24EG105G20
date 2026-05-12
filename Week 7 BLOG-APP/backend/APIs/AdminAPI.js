// create mini applications
import exp from 'express'
import {verifyToken} from '../middlewares/verifyToken.js'
import {ArticleModel} from '../models/ArticleModel.js'
import {UserModel} from '../models/UserModel.js'
export const adminApp = exp.Router()

// ROUTE TO READ ALL users

adminApp.get('/users',verifyToken("ADMIN"),async(req,res)=>{
    const usersList = await UserModel.find({});
    if(!usersList){
        return res.status(404).json({message:"Users not found"});
    }
    res.status(200).json({message:"All users",payload:usersList})
})

// Bloack or activate the users

adminApp.patch('/users',verifyToken("ADMIN"),async(req,res)=>{
    // get the body from req
    let {userId,isUserActive} =  req.body;
    // check for user present in db
    const user = await UserModel.findById(userId);
    if(!user){
        return res.json({message:"USer/Author not found"});
    }
    user.isUserActive = isUserActive;
    await user.save();
    if(!isUserActive)return res.json({message:"Blocked the user"})
        res.status(200).json({message:"Activated the user"});
})