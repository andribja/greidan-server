var mongoose = require('mongoose'); 
var user = require('./models').users;

exports.getUserIdByToken = function(token, callback) {
    user.findOne({'token':token}, "_id username", callback);
};

exports.getUser = function(q, callback) {
    ad.find(q, "_id username email imgPath", callback);
}
