var mongoose = require('mongoose'); 
var message = require('./models').messages;  
var user = require('./models').users;

exports.sendMessage = function(subject, content, author_id, recipient_id, callback) {

    var date = new Date().getTime();
    var _id = new mongoose.Types.ObjectId;

    var newMessage = new message({    
            subject: subject,
            content : content,
            recipient_id : recipient_id,
            author_id : author_id,
            timePosted : date,
            _id : _id
        });

    newMessage.save(function (err) {
        callback({
            'response': "Message sent",
            'success': true,
            '_id': _id
        });
    });
}

exports.getMessage = function(q, callback) {
    var options = {
        "limit":10,
        "sort":"timePosted"
    };

    ad.find(q, callback);
}
