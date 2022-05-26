const mongoose = require('mongoose');

const Account = new mongoose.Schema({
    nameUser: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
},
{
    timestamps: true,
});

module.exports = mongoose.model('user', Account);