function base64_decode(base64str,file) {
   var bitmap = new Buffer(base64str,'base64');
   //writing into an image file
   fs.writeFile(file, bitmap);
   //write a text file
    console.log('File created from base64 encoded string');
}

function rawBody(req, res, next) {
    var chunks = [];

    req.on('data', function(chunk) {
        chunks.push(chunk);
    });

    req.on('end', function() {
        var buffer = Buffer.concat(chunks);

        req.bodyLength = buffer.length;
        req.rawBody = buffer;
        next();
    });

    req.on('error', function (err) {
        console.log(err);
        res.status(500);
    });
}
