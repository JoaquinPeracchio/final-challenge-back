const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String },
    password: [{ type: String, required: true }],
    adress: { type: String, required: true },
    phone: { type: Number, required: true },
    sells: { type: Number },
    buys: { type: mongoose.Types.ObjectId, ref: 'products'},
    popularity: [{ type: Number }],
    comment: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
    from: [{ type: String, required: true }],
    verified: { type: Boolean, required: true },
    code: { type: String, required: true },
    logged: { type: Boolean, required: true }
});

const User = mongoose.model('users', userSchema);

module.exports = User;