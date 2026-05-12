// create mini applications
import exp from 'express'
import {UserModel} from '../models/UserModel.js'
import {ArticleModel} from '../models/ArticleModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
export const authorApp = exp.Router()

// write article
authorApp.post('/article',verifyToken("AUTHOR"),async(req,res)=>{
    // get token 
    const token = req.user;
    // get the article object
    const articleObj= req.body;
    // check author
    let author = await UserModel.findById(articleObj.author);
    if(!author){
        return res.status(404).json({message:"Invalid author..."})
    }
    if((author.email!==token.email)){
        return res.status(403).json({message:"you are unauthorized..."})
    }
    // create atricle document
    const articleDocument = new ArticleModel(articleObj);
    // save the doc
    await articleDocument.save()
    // send res
    res.status(201).json({message:"Article published"});


})
// read own articles
authorApp.get('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    // get the token
    const {id,email,role}= req.user;
    
    // list of areticle published by him
    const articlesList = await ArticleModel.find({author:id})
    res.status(200).json({message:"Ur articles",payload:articlesList});

})

// Edit article
authorApp.put('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    const id = req.user?.id;
    // get req body
    let {articleId,title,category,content} =req.body;
    // find article
    let article = await ArticleModel.findOneAndUpdate({_id:articleId,author:id},
        {$set:{title,category,content}},
        {new:true})
    if(!article){
        return res.status(403).json({message:"you are unauthorized to edit this article..."})
    }
    res.status(200).json({message:"Ur article is modified",payload:article});
})

// delete an article(SOFT DELETE)
authorApp.patch('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    // get author id from token
    const id=req.user?.id;
    //get modified article from req
    const {articleId,isArticleActive}= req.body;
    // find the article
    const article = await ArticleModel.findOne({_id:articleId,author:id});
    // check for the existing active status
    if(article.isArticleActive===isArticleActive){
        return res.status(200).json("Already in same state")
    }

    article.isArticleActive=isArticleActive;
    await article.save();
    if(!isArticleActive)return res.status(200).json({message:"deleted the article"})
    res.status(200).json({message:"recovered the article"});
})