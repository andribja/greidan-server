//Module dependencies
var express = require('express');
var connect = require('connect');
var multer = require('multer');
var uploadAdImg = multer({ dest: './public/ad_img' });
var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;

// Configuration 
app.use(express.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());

console.log(__dirname + '/public');
/*app.post('/upload', uploadAdImg.single('image'), function(req, res) {
	console.log(req.file);
	res.body = req.file;
	res.json({
				status: 204,
                message: "Upload successful",
				file: req.file,
            });
})
*/
//module.exports = router;
// Routes  
require('./routes/routes.js')(app);

app.listen(port);

console.log('The App runs on port ' + port);
