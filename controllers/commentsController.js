const Comment = require('../models/Comment')

const commentsController = {
    createComment: async (req, res) => {
        try {
            await new Comment(req.body).save()
            res.status(201).json({
                message: "A new comment was created.",
                success: true
            })
        }
        catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Could not create a new comment.",
                success: false
            })
        }
    },
    createResponse: async (req, res) => {
        const { id } = req.params
        const makeChanges = req.body
        try {
            let city = await Comment.updateOne({ _id: id }, makeChanges, { new: true })
            if (city) {
                res.status(201).json({
                    message: "The answer was successfully added.",
                    success: true
                })
            }
            else {
                res.status(404).json({
                    message: "Comment not found.",
                    success: false
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Error adding response.",
                success: false
            })
        }
    },
    readComment: async (req, res) => {
        const { id } = req.params
        try {
            let comment = await Comment.find({ product: id })
                // .populate('user', { name: 1, photo: 1, role: 1 })
                // .populate('seller', { name: 1, photo: 1, role: 1 })
                .populate('product', { name: 1 })
            // .populate('response', { name: 1, user: 1, product: 1, response: 1 })
            if (comment) {
                res.status(200).json({
                    menssagge: "You get a comment.",
                    response: comment,
                    success: true
                })
            } else {
                res.status(404).json({
                    menssagge: "Could not get a comment.",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error",
                success: false
            })
        }
    },
    readCommentByID: async (req, res) => {
        const { id } = req.params
        try {
            let comment = await Comment.findOne({ _id: id })
                // .populate('user', { name: 1, photo: 1, role: 1 })
                // .populate('seller', { name: 1, photo: 1, role: 1 })
                .populate('product', { name: 1 })
            // .populate('response', { name: 1, user: 1, product: 1, response: 1 })
            if (comment) {
                res.status(200).json({
                    menssagge: "You get a comment.",
                    response: comment,
                    success: true
                })
            } else {
                res.status(404).json({
                    menssagge: "Could not get a comment.",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error",
                success: false
            })
        }
    },
    deleteComment: async (req, res) => {
        const { id } = req.params
        try {
            let comment = await Comment.deleteOne({ _id: id })
            if (comment) {
                res.status(200).json({
                    menssagge: "Comment was successfully deleted.",
                    success: true
                })
            } else {
                res.status(404).json({
                    menssagge: "Comment not found.",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error in delete this comment.",
                success: false
            })
        }
    }
}

module.exports = commentsController