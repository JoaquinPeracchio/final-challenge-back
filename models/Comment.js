const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    comment: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    product: { type: mongoose.Types.ObjectId, ref: 'products' },
    date: { type: Number },
    // response: { type: String }
})

const Comment = mongoose.model(
    'comments',
    schema
)

module.exports = Comment