var mongoose = require('mongoose'); 
var ad = require('./models').ads;  

exports.postAd = function(title, content, category, author_id, locLat, locLong, callback) {

    var date = new Date();
    var id = new mongoose.Types.ObjectId;

    var newAd = new ad({    
            title: title,
            content : content,
            category : category,
            author_id : author_id,
            timePosted : date,
            locLat : locLat,
            locLong : locLong,
            id : id   
        });

    newAd.save(function (err) {
        callback({
            'response': "Ad sucessfully posted",
            'success': true,
            'id': id
        });
    });
}

exports.getAd = function(ad_id, author, timePosted, callback) {
    var options = {
        "limit":10,
        "sort":"timePosted"
    };
    if(ad_id === undefined) {
        var q = ad.find({}, options);
    } else { 
        var q = ad.find({id: ad_id}, options);
    }
    q.exec('find', callback);
}