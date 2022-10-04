const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
    date: { type: Number, required: true },
    // response: { type: String }
})

const Comment = mongoose.model(
    'comments',
    commentsSchema
)

module.exports = Comment