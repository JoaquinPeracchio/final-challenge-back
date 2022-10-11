const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'users'},
    type: { type: String, required: true },
    variety: { type: String, required: true },
    quantitymin: { type: Number, required: true },
    currentState: { type: String, required: true },
    stock: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    likes: { type: Array, required: true }
})

const Product = mongoose.model(
    'products',
    productsSchema
)

module.exports = Product