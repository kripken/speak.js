
  shouldRunNow = true;
  FS.ignorePermissions = true;

  FS.createPath('/', 'espeak/espeak-data', true, false);
  [['phontab', phontab], ['phonindex', phonindex], ['phondata', phondata], ['intonations', intonations], ['en_dict', en_dict] /*, ['fr_dict', fr_dict] */].forEach(function(pair) { // commented-out code here is needed for French
    var id = pair[0];
    var data = pair[1];
    FS.createDataFile('/espeak/espeak-data', id, data, true, false);
  });

  //FS.createPath('/', 'espeak/espeak-data/voices', true, false); // Needed for French
  //FS.createDataFile('/espeak/espeak-data/voices', 'fr', fr, true, false); // Needed for French

  FS.createPath('/', 'espeak/espeak-data/voices/en', true, false);
  FS.createDataFile('/espeak/espeak-data/voices/en', 'en-us', en_us, true, false);

  FS.root.write = true;

  FS.ignorePermissions = false;

  function unsignedStream(wav) {
    var i, l= wav.length; out=new Array(l);
    for (i = 0; i < l; i++) out[i] = unSign(wav[i], 8);
    return out;
  }

  var args = this['args'] || {};
  Module.arguments = [
    '-w', 'wav.wav',
    // options
    '-a', args['amplitude'] ? String(args['amplitude']) : '100',
    '-g', args['wordgap'] ? String(args['wordgap']) : '0', // XXX
    '-p', args['pitch'] ? String(args['pitch']) : '50',
    '-s', args['speed'] ? String(args['speed']) : '175',
    '-v', args['voice'] ? String(args['voice']) : 'en-us',
    // end options
    '--path=/espeak',
    this['text']
  ];

  run();

  this['ret'] = unsignedStream(FS.root.contents['wav.wav'].contents);

