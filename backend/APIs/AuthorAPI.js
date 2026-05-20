import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const authorApp = exp.Router()

// WRITE ARTICLE
authorApp.post('/articles', verifyToken("AUTHOR"), async (req, res) => {
    try {
        const token = req.user

        const articleObj = {
            ...req.body,
            author: token.id
        }

        const articleDocument = new ArticleModel(articleObj)

        await articleDocument.save()

        res.status(201).json({
            message: "Article published",
            payload: articleDocument
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


// READ OWN ARTICLES
authorApp.get('/articles', verifyToken("AUTHOR"), async (req, res) => {
    try {
        const { id } = req.user

        const articlesList = await ArticleModel.find({ author: id })

        res.status(200).json({
            message: "Your articles",
            payload: articlesList
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


// EDIT ARTICLE
authorApp.put('/articles', verifyToken("AUTHOR"), async (req, res) => {
    try {
        const id = req.user.id

        const { articleId, title, category, content } = req.body

        const article = await ArticleModel.findById(articleId)

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            })
        }

        if (article.author.toString() !== id) {
            return res.status(403).json({
                message: "Unauthorized"
            })
        }

        article.title = title
        article.category = category
        article.content = content

        await article.save()

        res.status(200).json({
            message: "Article updated",
            payload: article
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


// SOFT DELETE / RECOVER
authorApp.patch('/articles', verifyToken("AUTHOR"), async (req, res) => {
    try {
        const id = req.user.id

        const { articleId, isArticleActive } = req.body

        const article = await ArticleModel.findOne({
            _id: articleId,
            author: id
        })

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            })
        }

        if (article.isArticleActive === isArticleActive) {
            return res.status(200).json({
                message: "Already in same state"
            })
        }

        article.isArticleActive = isArticleActive

        await article.save()

        res.status(200).json({
            message: isArticleActive
                ? "Article recovered"
                : "Article deleted"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
