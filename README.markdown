speak.js
========

A port of the eSpeak speech synthesizer from C++ to JavaScript using Emscripten.

Enables text-to-speech on the web using only JavaScript and HTML5.

**Online demo**: http://syntensity.com/static/espeak.html


Usage
-----

Very simple! Do this:

 * Include the script in your html header,

      `<script src="speakClient.js"></script>`

   (and make sure you have speakClient.js available, as well as
   speakWorker.js and speakGenerator.js)

 * Add a div with an audio element called 'audio' in your html body,

      `<div id="audio"></div>`

 * Call speak.play() to say stuff in JavaScript

      `speak.play('hello world!');`

See helloworld.html for a simple 'hello world', and demo.html for
a more detailed example.


Options
-------

You can also specify some options with calling speak(), by doing

      `speak.play('hello world', { option1: value1, option2: value2 .. }, onended)`

available options are:

 * amplitude: How loud the voice will be (default: 100)
 * pitch: The voice pitch (default: 50)
 * speed: The speed at which to talk (words per minute) (default: 175)
 * voice: Which voice to use (for a non-default voice, requires you to
          build speak.js to include the proper data. See Language Support
          below) (default: en/en-us)
 * wordgap: Additional gap between words in 10 ms units (default: 0)
 * noWorker: Do not use a web worker (see below in 'Architecture')

In addition, you can pass a callback function which will be called at the end of speech.

For example

      `speak.play('hello world', { pitch: 100 }, function(){console.log('completed!');});`

will talk in a very high-pitched voice and output 'completed!' on the console at the completion.

Audio Control
-------------
Once speech has started, you can pause it by

      `speak.pause();`

You can resume paused speech by

      `speak.resume();`

Architecture
------------

speakClient.js is the file that you interact with. It defines speak(), and
will load speakWorker.js in a web worker. speakWorker wraps around
speakGenerator.js, which does the actual work of converting a string into
a WAV file. The WAV data is returned to speak(), which then plays it in
an HTML Audio element.

You can also use speak.js without a web worker. In that case, you don't
need speakWorker.js, but you do need to load speakGenerator.js along
with speakClient.js in your HTML page. speak(), if called with noWorker
set to true in the options object, will directly call the WAV generation
code in speakGenerator.js instead of forwarding the call to a worker
which would have done the same.


Building
--------

A prebuilt version is already included. But if you want to tinker with the
source code though, you might want to build it yourself. To do so, run
emscripten.sh inside src/. Note that you need to change the paths there.


Language Support
----------------

eSpeak supports multiple languages so speak.js can too. To do this, you
need to build a custom version of speak.js:

 * Bundle the proper language files. For french, you need fr_dict and voices/fr.
   See commented-out code in emscripten.sh and bundle.py
 * Expose those files to the emulated filesystem, in post.js. See commented-out
   code in there as well.
 * Run emscripten.sh to build.

You then need to call speak() with the `voice` option that tells it to use the
right voice for your language. For example, for French this should work:

      `speak.play('boulanger', { voice: 'fr' });`

