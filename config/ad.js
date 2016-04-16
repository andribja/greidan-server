var mongoose = require('mongoose'); 
var ad = require('./models').ads;  
var user = require('./models').users;
var EARTH_RADIUS_KM = 6371;

exports.postAd = function(title, content, category, author_id, author_name, lng, lat, imgPath, callback) {
    var date = new Date().getTime();
    var _id = new mongoose.Types.ObjectId;
    var newAd = new ad({    
            title: title,
            content : content,
            category : category,
            author_id : author_id,
            author_name : author_name,
            timePosted : date,
            loc : [lng, lat],
            imgPath : imgPath,
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
    });
};

exports.getAd = function(q, callback) {
    var coords;
    if(q.lng === undefined || q.lat === undefined) coords = [0.0, 0.0];
    else coords = [q.lng, q.lat];
    var maxDistance = (q.maxDistance || 30)/EARTH_RADIUS_KM;
	var limit = q.limit || 10;
	delete q.limit;
	delete q.lng;
	delete q.lat;
	delete q.maxDistance;
    console.log(q, coords, maxDistance);

    ad.find(q).where('loc').near({
		center: coords,
		maxDistance: maxDistance 
	}).limit(limit).exec(callback);
}
