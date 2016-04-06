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
    title : String,
    loc : { 
        type: [Number],
        index: '2d'
    },
    content : String,
    category : String,
    author_id : String,
    timePosted : { type: Number, default: Date.getTime()},
    id : Schema.Types.ObjectId   
});

var reviewSchema = mongoose.Schema({
    stars : Number,
    content : String,
    reviewee_id : String,
    author_id : String,
    timePosted : { type: Number, default: Date.getTime()},
    id : Schema.Types.ObjectId
});

var messageSchema = mongoose.Schema({
    subject : String,
    content : String,
    author_id : String,
    recipient_id : String,
    timePosted : { type: Number, default: Date.getTime()},
    id : Schema.Types.ObjectId
});

mongoose.connect('mongodb://localhost:27017/greidan-server'); 
module.exports.users = mongoose.model('users', userSchema);
module.exports.ads = mongoose.model('ads', adSchema);
module.exports.reviews = mongoose.model('reviews', reviewSchema);
module.exports.messages = mongoose.model('messages', messageSchema);
