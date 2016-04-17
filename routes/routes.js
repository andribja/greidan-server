var chgpass = require('../config/chgpass');
var register = require('../config/register');
var login = require('../config/login');
var ad = require('../config/ad');
var message = require('../config/message');
var review = require('../config/review');
var user = require('../config/user');
var category = require('../config/category');
var multer = require('multer');
var uploadAdImg = multer({ dest: './public/ad_img' });
var uploadUserImg = multer({ dest: './public/user_img' });

module.exports = function registerRoutes(app) {
    app.post('/uploadUserImg', uploadUserImg.single('image'), function(req, res) {
        console.log(req.file);
        res.body = req.file;
        res.json({
                    status: 204,
                    response: "Upload successful",
                    file: req.file,
                });
    })
    

    app.post('/uploadAdImg', uploadAdImg.single('image'), function(req, res) {
        console.log(req.file);
        res.body = req.file;
        res.json({
                    status: 204,
                    response: "Upload successful",
                    file: req.file,
                });
    })

    app.get('/', function(req, res) {
        res.end("Node-greidan");
    });

    app.post('/login', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        login.login(username, password, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/register', function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;

        console.log("got", email, username, password);

        register.register(email, username, password, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.get('/ad', function(req, res) {
        ad.getAd(req.query, function(err, result) {
            if(result instanceof Array) result = {adlist: result};
            console.log(result);
            res.json(result);
        });
    });

    app.get('/user', function(req, res) {
        user.getUser(req.query, function(err, result) {
            console.log(result);
            res.json(result);
        });
    });

    app.post('/ad', function(req, res) {
        var token = req.body.token;
        delete req.body.token;
        user.getUserIdByToken(token, function(err, found_user) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                var title = req.body.title;
                var content = req.body.content;
                var category = req.body.category;
                var author_id = found_user._id;
                var locLat = req.body.lat;
                var locLong = req.body.lng;
                var author_name = found_user.username;
                var imgPath = req.body.imgPath;
                ad.postAd(title, content, category, author_id, author_name, locLong, locLat, imgPath, function(found) {
                    console.log(found);
                    res.json(found);
                });
            }
        });
    });

    app.get('/review', function(req, res) {
        review.getReview(req.query, function(err, result) {
            console.log(result);
            res.json(result);
        });
    });
    
    app.post('/review', function(req, res) {
        var token = req.body.token;
        user.getUserIdByToken(token, function(err, found_user) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                var author_id = found_user._id;
                var author_name = found_user.username;
                var stars = req.body.stars;
                var content = req.body.content;
                var reviewee_id = req.body.reviewee_id;
                review.postReview(stars, content, author_id, author_name, reviewee_id, function(found) {
                    console.log(found);
                    res.json(found);
                });
            }
        });
    });
    
    app.get('/message', function(req, res) {
        var token = req.body.token;
        user.getUserIdByToken(token, function(err, found_user) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                var query = req.query;
                query.recipient_id = found_user._id;
                message.getMessage(query, function(err, result) {
                    if(result instanceof Array) result = {messagelist: result};
                    console.log(result);
                    res.json(result);
                });
            }
        });
    });
    
    app.post('/message', function(req, res) {
        var token = req.body.token;
        user.getUserIdByToken(token, function(err, found_user) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                var author_id = found_user._id;
                var author_name = found_user.username;
                var subject = req.body.subject;
                var content = req.body.content;
                var recipient_id = req.body.recipient_id;
                message.sendMessage(subject, content, author_id, author_name, recipient_id, function(found) {
                    console.log(found);
                    res.json(found);
                });
            }
        });
    });

    app.get('/category', function(req, res) {
        category.getCategory(req.query, function(err, result) {
            console.log(result);
            res.json(result);
        });
    });

    app.post('/api/chgpass', function(req, res) {
        var id = req.body.id;
        var opass = req.body.oldpass;
        var npass = req.body.newpass;

        chgpass.cpass(id, opass, npass, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass', function(req, res) {

        var email = req.body.email;

        chgpass.respass_init(email, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass/chg', function(req, res) {
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;

        chgpass.respass_chg(email, code, npass, function(found) {
            console.log(found);
            res.json(found);
        });
    });
};
