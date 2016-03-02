var mongoose = require('mongoose'); 
var ad = require('./models').ads;  

exports.postAd = function(title, content, category, author_id, lng, lat, callback) {

    var date = new Date().getTime();
    var _id = new mongoose.Types.ObjectId;

    var newAd = new ad({    
            title: title,
            content : content,
            category : category,
            author_id : author_id,
            timePosted : date,
            lat : lat,
            lng : lng,
            _id : _id
        });

    newAd.save(function (err) {
        callback({
            'response': "Ad sucessfully posted",
            'success': true,
            '_id': _id
        });
    });
}

exports.getAd = function(q, callback) {
    var options = {
        "limit":10,
        "sort":"timePosted"
    };

    ad.find(q, callback);
}
