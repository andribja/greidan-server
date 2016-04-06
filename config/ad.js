<<<<<<< HEAD
var mongoose = require('mongoose'); 
var ad = require('./models').ads;  
var EARTH_RADIUS_KM = 6371;
=======
var mongoose = require('mongoose');
var ad = require('./models').ads;
>>>>>>> 5bf0a932d424f980039dcce0c985b50a95233379

exports.postAd = function(title, content, category, author_id, lng, lat, callback) {
    var date = new Date().getTime();
    var _id = new mongoose.Types.ObjectId;

    var newAd = new ad({    
            title: title,
            content : content,
            category : category,
            author_id : author_id,
            timePosted : date,
            loc : [lng, lat],
            _id : _id
    });

    newAd.save(function(err) {
        callback({
            'response': "Ad sucessfully posted",
            'success': true,
            '_id': _id
        });
    });
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
		  }
        "limit": q.limit || 10,
        "sort":"timePosted"
    };

    ad.find(q, callback).where('loc').near({
		center: loc,
		maxDistance: maxDistance 
	}).limit(limit);
}
