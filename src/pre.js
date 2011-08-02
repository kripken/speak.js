
var speak = (function() {

  // eSpeak and other code here are under the GNU GPL.

  var print = console.log;

  var Module = {
    arguments: ['-w', 'wav.wav', '-v', 'en/en-us', '--path=/espeak'],
    noInitialRun: true
  };

