const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String },
    mail: { type: String, required: true },
    password: [{ type: String, required: true }],
    adress: { type: String, required: true },
    phone: { type: Number, required: true },
    popularity: { type: Number },
    sell:[{type:Object , required:true}],
    buy:[{type:Object , required:true}],
    from: [{ type: String, required: true }],
    verification: { type: Boolean, required: true },
    uniqueString: { type: String, required: true },
    logged: { type: Boolean, required: true },
    role: { type: String, required: true }
});

const User = mongoose.model('users', userSchema);

module.exports = User;