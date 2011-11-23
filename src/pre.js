
var speak = (function() {

  // eSpeak and other code here are under the GNU GPL.

  if (!this['print']) {
    print = console.log;
  }

  var Module = {
    noInitialRun: true
  };

