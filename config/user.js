var mongoose = require('mongoose'); 
var user = require('./models').users;

exports.getUserIdByToken = function(token, callback) {
    user.findOne({'token':token}, "_id", callback);
};
