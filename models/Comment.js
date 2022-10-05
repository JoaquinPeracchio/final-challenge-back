const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    comment: { type: String },
    seller: { type: mongoose.Types.ObjectId, ref: 'users' },
    response: { type: String },
    product: { type: mongoose.Types.ObjectId, ref: 'products' },
    date: { type: Number },
    // response: { type: String }
})

const Comment = mongoose.model(
    'comments',
    commentsSchema
)

module.exports = Comment