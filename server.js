console.log('Starting...');
var http = require('http');
var sauce = require(__dirname + '/simple-server');
var server = http.createServer(sauce.http);
const port = process.env.PORT || 8000;
server.listen(port);
console.log('Started...');
/*var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime-types');
var ext = /[\w\d_-]+\.[\w\d]+$/;

http.createServer(function(req, res){
	console.log(""+__dirname+req.url);
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('index.html').pipe(res);
    }/* else if (ext.test(req.url)) {
        fs.exists(path.join(__dirname, req.url), function (exists) {
            if (exists) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream(req.url+'/'+'index.html').pipe(res);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                //fs.createReadStream('404.html').pipe(res);
				res.write("<html>"+__dirname+req.url+"</html>");
        }});
		} else {
			//  add a RESTful service
		}
	}).listen(8000);*/
	/*else if(mime.lookup(req.url.substring(1)) == false){
		console.log("404");
		res.writeHead(404, {'Content-Type': 'text/html'});
        //fs.createReadStream('404.html').pipe(res);
		//res.write("<html>"+__dirname+req.url+"</html>");
	}else{
		console.log(mime.lookup(req.url.substring(1)));
		//res.write("<html>"+__dirname+req.url+"</html>");
		fs.createReadStream(req.url.substring).pipe(res);
	}
}).listen(8000);*/