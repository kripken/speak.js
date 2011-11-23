var speak = require("./node-speak.js"),
	http  = require("http");


var audio = "";

speak("Hello, i was made using node dot J. S.", {	
		callback: function(src) {
			audio = src;
		}
	});

http.createServer(function (req, res) {

	res.writeHead(200, {'Content-Type': 'text/html'});
  	res.end("<!DOCTYPE html><html><head><title>Speak.js node module</title></head><body><audio id='generatedAudio' src='" + audio + "' /></body><script type='text/javascript'>document.getElementById('generatedAudio').play();</script></html>");
	
  
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');