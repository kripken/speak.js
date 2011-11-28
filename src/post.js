
  FS.createPath('/', 'espeak/espeak-data', true, false);
  [['config', config], ['phontab', phontab], ['phonindex', phonindex], ['phondata', phondata], ['intonations', intonations], ['en_dict', en_dict] /*, ['fr_dict', fr_dict] */].forEach(function(pair) { // commented-out code here is needed for French
    var id = pair[0];
    var data = pair[1];
    FS.createDataFile('/espeak/espeak-data', id, data, true, false);
  });

  //FS.createPath('/', 'espeak/espeak-data/voices', true, false); // Needed for French
  //FS.createDataFile('/espeak/espeak-data/voices', 'fr', fr, true, false); // Needed for French

  FS.createPath('/', 'espeak/espeak-data/voices/en', true, false);
  FS.createDataFile('/espeak/espeak-data/voices/en', 'en-us', en_us, true, false);

  FS.root.write = true;

  function speak(text, args) {
    args = args || {};

    // assign callback either the default action, or a custom callback if specified by the user
    // e.g. speak("hello world", {callback: function(src){ console.log("Custom handling of returned 'src'", src ); }})
    callback = args.callback || function (src) {
        document.getElementById("audio").innerHTML=("<audio id=\"player\" src=\""+src+"\">");
        document.getElementById("player").play();
    }
    Module.arguments = [
      '-w', 'wav.wav',
      // options
      '-a', args.amplitude ? String(args.amplitude) : '100',
      '-g', args.wordgap ? String(args.wordgap) : '0', // XXX
      '-p', args.pitch ? String(args.pitch) : '50',
      '-s', args.speed ? String(args.speed) : '175',
      '-v', args.voice ? String(args.voice) : 'en/en-us',
      // end options
      '--path=/espeak',
      text
    ];

    run();
    Module.arguments.pop();

    var wav = FS.root.contents['wav.wav'].contents;

    function encode64(data) {
      var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      var PAD = '=';
      var ret = '';
      var leftchar = 0;
      var leftbits = 0;
      for (var i = 0; i < data.length; i++) {
        leftchar = (leftchar << 8) | data[i];
        leftbits += 8;
        while (leftbits >= 6) {
          var curr = (leftchar >> (leftbits-6)) & 0x3f;
          leftbits -= 6;
          ret += BASE[curr];
        }
      }
      if (leftbits == 2) {
        ret += BASE[(leftchar&3) << 4];
        ret += PAD + PAD;
      } else if (leftbits == 4) {
        ret += BASE[(leftchar&0xf) << 2];
        ret += PAD;
      }
      return ret;
    }

    for (var i = 0; i < wav.length; i++)
      wav[i] = unSign(wav[i], 8);
    
    // call either the original actions or a custom callback if specified by the user
    callback("data:audio/x-wav;base64," + encode64(wav));
  }

  return speak;
})();