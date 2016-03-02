var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    token: String,
    email: String,
    hashed_password: String,
    salt: String,
    temp_str: String
});

var adSchema = mongoose.Schema({
    title: String,
    content: String,
    category: String,
    author_id: String,
    timePosted: {
        type: Number,
        default: new Date().getTime()
    },
    lat: Number,
    lng: Number,
    id: Schema.Types.ObjectId
});

mongoose.connect('mongodb://localhost:27017/greidan-server');
module.exports.users = mongoose.model('users', userSchema);
module.exports.ads = mongoose.model('ads', adSchema);