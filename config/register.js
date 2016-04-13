var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('./models').users;


exports.register = function(email, username, password, callback) {
    var x = email;
    if (!(x.indexOf("@") === x.length)) {
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 && password.match(/[0-9]/)) {

            var temp = rand(160, 36);
            var newpass = temp + password;
            var token = crypto.createHash('sha512').update(email + rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            var newuser = new user({
                token: token,
                email: email,
                username: username,
                hashed_password: hashed_password,
                salt: temp
            });

            user.find({
                email: email
            }, function(err, users_email) {
                var len = users_email.length;
                if(len > 0) { 
                    callback({
                        'response': "Email already Registered"
                    });
                } else {
                    user.find({
                        username: username 
                    }, function(err, users_name) {

                        var len = users_name.length;

                        if (len == 0) {
                            newuser.save(function(err) {
                                callback({
                                    'response': "Successfully Registered",
                                    'success': true,
                                    'token': token
                                });
                            });
                        } else {
                             callback({
                                'response': "Username already Registered"
                             });

                        }
                    });
                }
            });
        } else {
            callback({
                'response': "Password Weak"
            });

        }
    } else {
        callback({
            'response': "Email Not Valid"
        });
    }
}
