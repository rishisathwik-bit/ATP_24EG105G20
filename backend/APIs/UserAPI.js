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
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    if(!user.isUserActive){
        return res.status(400).json({message:"You are blocked from entering further pages"})
    }
    // read articles
    const articlesList = await ArticleModel.find({isArticleActive:true}).populate("author", "firstName lastName email");
    //send res
    res.status(200).json({message:"All available Articles",payload:articlesList});
})

// read one article route
userApp.get('/articles/:id', verifyToken("USER", "AUTHOR"), async (req, res) => {
    const articleDoc = await ArticleModel.findOne({
        _id: req.params.id,
        $or: [
            { isArticleActive: true },
            { author: req.user.id }
        ]
    })
        .populate("author", "firstName lastName email")
        .populate("comments.user", "firstName lastName email");

    if (!articleDoc) {
        return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article found", payload: articleDoc });
})

// add a comment
userApp.put('/articles',verifyToken("USER"),async(req,res)=>{
    // get req body
    console.log(req.body);
    const {articleId,comment}=req.body
    if(!articleId || !comment?.trim()){
        return res.status(400).json({message:"Article ID and comment are required"})
    }
    // find the article
    
    const articleDoc = await ArticleModel.findOne({_id:articleId,isArticleActive:true})
                            .populate("comments.user");
    if(!articleDoc){
        return res.status(404).json({message:"Article not found"})
    }
    // find the user
    const userId = req.user?.id;
    
    //add the comment
    articleDoc.comments.push({user:userId,comment:comment});

    await articleDoc.save();
    await articleDoc.populate("comments.user", "firstName lastName email");
    // send res
    res.status(200).json({message:"Comment added",payload:articleDoc})
})
