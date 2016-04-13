var mongoose = require('mongoose'); 
var category = require('./models').categories;

exports.getCategory = function(q, callback) {
    var options = {
        "limit":20,
        "sort":"timePosted"
    };

    category.find(q, callback);
}
