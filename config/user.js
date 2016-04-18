var mongoose = require('mongoose'); 
var user = require('./models').users;

exports.getUserIdByToken = function(token, callback) {
    user.findOne({'token':token}, "_id username", callback);
};

exports.getUser = function(q, callback) {
    user.find(q, "_id username email imgPath time_joined", callback);
}

exports.getUserIdByName = function(username, callback) {
	user.find({'username' : username}, "_id", callback);
}
