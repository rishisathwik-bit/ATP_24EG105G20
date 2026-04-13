import exp from 'express'
import { verifyToken } from '../middlewares/VerifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
export const userApp=exp.Router()


//Read articles of all authors 
userApp.get("/articles",verifyToken("USER"),async(req,res)=>{
//read articles
const articlesList = ArticleModel.find({isArticleActive:true})
//send res
res.status(200).json({message:""})
})


//Add comment to an article
userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get body from req
    const {articleId,comment}=req.body
    //check article
    const articleDocument=await ArticleModel.findOne({_id:articleId, isArticleActive:true})
    //if article not found
    if(!articleDocument){
        return res.status(404).json({message:'Article not found'})
    }
    //get user id
    const userId=req.user?.id;
    //add comments to commments array of articles Document
    articleDocument.comments.push({user:userId,comment:comment});
    //save
    await articleDocument.save();
    //send res
    res.status(200).json({message:"comment added Successfully",payload:articleDocument})
})