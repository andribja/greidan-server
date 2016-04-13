var mongoose = require('mongoose'); 
var review = require('./models').reviews;  
var user = require('./models').users;

exports.postReview = function(stars, content, author_id, reviewee_id, callback) {

    var date = new Date().getTime();
    var _id = new mongoose.Types.ObjectId;

    var newReview = new review({    
            stars : stars,
            content : content,
            author_id : author_id,
            reviewee_id : reviewee_id,
            timePosted : date,
            _id : _id
        });

    newReview.save(function (err) {
        callback({
            'response': "Message sent",
            'success': true,
            '_id': _id
        });
    });
}

exports.getReview = function(q, callback) {
    var options = {
        "limit":10,
        "sort":"timePosted"
    };

    ad.find(q, callback);
}
