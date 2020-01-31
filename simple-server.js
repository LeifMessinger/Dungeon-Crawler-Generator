var fs = require('fs');
module.exports = {
	urlIntoDictionary: function(uniformResourceLocator){
		let dic = {};
		if(uniformResourceLocator.indexOf("?") >= 0){
			let definitions = uniformResourceLocator.split("?");
			definitions.shift();	//Exclude path
			for(definition in definitions){
				let parallel = definition.indexOf("=");
				if(parallel >=0){
				let key = definition.substring(0,parallel);
				let value = definition.substring(parallel+1);
				//console.log('%s = %s',key,value);
				dic[key] = value;
				}
				console.log(Object.entries(dic));
			}
			return dic;
		}
		return false;
	},
	http: async function(req, res){
		let path = ""+__dirname+req.url;
		// The filename is simple the local directory and tacks on the requested url
		// This line opens the file as a readable stream
		let readStream = fs.createReadStream("index.html");
		console.log(""+__dirname+req.url); //Acknowlage request
		let dic = module.exports.urlIntoDictionary(req.url);
		if(dic != false){
			req.url = req.url.substring(0,req.url.indexOf("?"));
		}
		if(req.url === '/') readStream = fs.createReadStream("index.html");
		else if (req.url.indexOf(".") >= 0){//if it is a file
			path = __dirname+ req.url;
			console.log("Trying to read " + path);
			readStream = fs.createReadStream(path);
		}
		else if(req.url.charAt(req.url.length-1) == "/"){ //if it is a path with an extra slash at the end
			path = __dirname + req.url + "index.html";
			console.log("Trying to read " + path);
			readStream = fs.createReadStream(path);
		}
		else{
			path = __dirname+ req.url + "/index.html"; //if it is a path
			console.log("Trying to read " + path);
			readStream = fs.createReadStream(path);
		}
		// This will wait until we know the readable stream is actually valid before piping
		readStream.on('open', function () {
		// This just pipes the read stream to the response object (which goes to the client)
			readStream.pipe(res);
		});
		// This catches any errors that happen while creating the readable stream (usually invalid names)
		readStream.on('error', function(err) {
			res.end(err);
		});
	}
}