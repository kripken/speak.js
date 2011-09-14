var speak = require("./node-speak.js");
speak("hello world",{
	callback: function(src) {
		console.log(src);
	}
})