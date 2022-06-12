const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Account = new mongoose.Schema({
    nameUser: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    course: {type: String},
},
{
    timestamps: true,
});

Account.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all', 
});

module.exports = mongoose.model('user', Account);