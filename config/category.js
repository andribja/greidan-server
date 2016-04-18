var mongoose = require('mongoose'); 
var category = require('./models').categories;
var categories = [
    {_id : new mongoose.Types.ObjectId, category_name: "Handverk"},
    {_id : new mongoose.Types.ObjectId, category_name: "Skutl"},
    {_id : new mongoose.Types.ObjectId, category_name: "Lán á tólum"},
    {_id : new mongoose.Types.ObjectId, category_name: "Forritun"},
    {_id : new mongoose.Types.ObjectId, category_name: "Ljósmyndun"},
    {_id : new mongoose.Types.ObjectId, category_name: "Annað"}
]

exports.getCategory = function(q, callback) {
    category.find(q, callback);
}

exports.loadCategories = function(q, callback) {
    mongoose.connection.db.dropCollection('categories', function(err, result) {
        if(err) console.log(err);
    });
    category.collection.insert(categories, function(err){
        if(err) console.log(err);
        category.find({}, callback);
    });
}

