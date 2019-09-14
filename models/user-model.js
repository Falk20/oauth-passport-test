const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userName: String,
    googleID: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;