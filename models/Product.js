const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    photo: {type: String, required: true},
    likes: { type: Array, required: true }
})

const Product = mongoose.model(
    'products',
    productsSchema
)

module.exports = Product