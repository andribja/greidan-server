var mongoose = require('mongoose'); 
var ad = require('./models').ads;  

exports.postAd = function(title, content, category, author, callback) {

    var date = new Date();
    var id = new mongoose.Types.ObjectId;

    var newAd = new ad({    
            title: title,
            content : content,
            category : category,
            author : author,
            timePosted : date,
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
