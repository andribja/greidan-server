var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var gravatar = require('gravatar');
var user = require('./models').users;

exports.login = function(username, password, callback) {

    user.find({
        username: username 
    }, function(err, users) {
        if (users.length != 0) {
            var temp = users[0].salt;
            var hash_db = users[0].hashed_password;
            var id = users[0].token;
            var newpass = temp + password;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
            var grav_url = gravatar.url(users[0].email, {
                s: '200',
                r: 'pg',
                d: '404'
            });
            if (hash_db == hashed_password) {
                callback({
                    'response': "Login Successful",
                    'success': true,
                    'token': id,
                    'grav': grav_url
                });
            } else {
                callback({
                    'response': "Invalid Password",
                    'success': false
                });
            }
        } else {
            callback({
                'response': "User not found",
                'success': false
            });
        }
    });
}
