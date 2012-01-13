function speak(text, args) {
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

  var wav = generateSpeech(text, args);

  document.getElementById("audio").innerHTML=("<audio id=\"player\" src=\"data:audio/x-wav;base64,"+encode64(wav)+"\">");
  document.getElementById("player").play();
}

