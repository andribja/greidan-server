var mongoose = require('mongoose'); 
var ad = require('./models').ads;  
var user = require('./models').users;
var EARTH_RADIUS_KM = 6371;

exports.postAd = function(title, content, category, token, lng, lat, callback) {
    var date = new Date().getTime();
    var _id = new mongoose.Types.ObjectId;
    console.log(token);
    var author_id = user.findOne({'token': token}, function(err) {
        if(err) handleError(err);
    });
    console.log(author_id._id);
    /*var newAd = new ad({    
            title: title,
            content : content,
            category : category,
            author_id : author_id,
            timePosted : date,
            loc : [lng, lat],
            _id : _id
    });
    console.log(newAd);
    newAd.save(function(err) {
        if(err) console.error(err);
        callback({
            'response': "Ad sucessfully posted",
            'success': true,
            '_id': _id
        });
    });*/
};

exports.getAd = function(q, callback) {
    var coords = [q.lng, q.lat] || [0.0, 0.0];
    var maxDistance = (q.maxDistance || 30)/EARTH_RADIUS_KM;
	var limit = q.limit || 10;
	delete q.limit;
	delete q.lng;
	delete q.lat;
	delete q.maxDistance;
    var options = {
		"loc": {
			$near: coords,
			$maxDistance: maxDistance
		  },
        "limit": q.limit || 10,
        "sort":"timePosted"
    };

    ad.find(q).where('loc').near({
		center: coords,
		maxDistance: maxDistance 
	}).limit(limit).exec(callback);
}
