

// this is just to catch module & module.exports being undefined when using within a browser
if (!module || !module.exports) {
	var module = {
		exports: {}
	};
}

var speak = module.exports = (function() {

  // eSpeak and other code here are under the GNU GPL.

  if (!this['print']) {
    print = console.log;
  }

  var Module = {
    noInitialRun: true
  };

