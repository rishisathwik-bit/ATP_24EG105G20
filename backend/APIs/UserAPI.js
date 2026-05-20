// create mini applications
import exp from 'express'
import {ArticleModel} from '../models/ArticleModel.js'
import {UserModel} from '../models/UserModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
export const userApp = exp.Router()

// read all article route
userApp.get('/articles',verifyToken("USER"),async(req,res)=>{
    // get id of the user
    const userId = req.user?.id;
    // find user
    const user = await UserModel.findById(userId);
    if(!user.isUserActive){
        return res.status(400).json({message:"You are blocked from entering further pages"})
    }
    // read articles
    const articlesList = await ArticleModel.find({isArticleActive:true});
    //send res
    res.status(200).json({message:"All available Articles",payload:articlesList});
})

// add a comment
userApp.put('/articles',verifyToken("USER"),async(req,res)=>{
    // get req body
    console.log(req.body);
    const {articleId,comment}=req.body
    // find the article
    
    const articleDoc = await ArticleModel.findOne({_id:articleId,isArticleActive:true})
                            .populate("comment.user");
    if(!articleDoc){
        return res.status(404).json({message:"Article not found"})
    }
    // find the user
    const userId = req.user?.id;
    
    //add the comment
    articleDoc.comment.push({user:userId,comment:comment});

    await articleDoc.save();
    // send res
    res.status(200).json({message:"Comment added",payload:articleDoc})
})