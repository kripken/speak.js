speak.js
========

A port of the eSpeak speech synthesizer from C++ to JavaScript using Emscripten.

Enables text-to-speech on the web using only JavaScript and HTML5.

**Online demo**: http://syntensity.com/static/espeak.html


Usage
-----

Very simple! Do this:

 * Include the script in your html header,

      `<script src="speak.js"></script>`

   (and make sure you have speak.js where it will be found)

 * Add a div with an audio element called 'audio' in your html body,

      `<div id="audio"></div>`

 * Call speak() to say stuff in JavaScript

      `speak('hello world!')`

See helloworld.html for a simple 'hello world', and demo.html for
a more detailed example.


Options
-------

You can also specify some options with calling speak(), by doing

      `speak('hello world', { option1: value1, option2: value2 .. })`

available options are:

 * amplitude: How loud the voice will be (default: 100)
 * pitch: The voice pitch (default: 50)
 * speed: The speed at which to talk (words per minute) (default: 175)
 * voice: Which voice to use (for a non-default voice, requires you to
          build speak.js to include the proper data. See Language Support
          below) (default: en/en-us)
 * wordgap: Additional gap between words in 10 ms units (default: 0)
 * callback: You can define a custom callback that will get passed the outputted base64 encoded audio data uri, see **Custom Callbacks** below.

For example

      `speak('hello world', { pitch: 100 })`

will talk in a very high-pitched voice.

**Custom Callbacks**

if you would like to define your own response to the generated audio data, you can define a custom callback, by setting the `callback` in the options, like so:

      `speak('hello world', { callback: function (src) {
         // do whatever you want with the returned data: "src" 
      }})`




Building
--------

A prebuilt version is already included, in the file speak.js. But if you want
to tinker with the source code though, you might want to build it yourself.
To do so, run emscripten.sh inside src/. Note that you need to change the paths
there.

That will generate speak.full.js, which is the unminified version. It is
recommended to minify that (for example, using the closure compiler). speak.js
in this repo is minified.

demo.html uses speak.js (the minified version) while helloworld.js
uses speak.full.js (the unminified version - useful during development).


Language Support
----------------

eSpeak supports multiple languages so speak.js can too. To do this, you
need to build a custom version of speak.js:

 * Bundle the proper language files. For french, you need fr_dict and voices/fr.
   See commented-out code in emscripten.sh.
 * Expose those files to the emulated filesystem, in post.js. See commented-out
   code in there as well.
 * Run emscripten.sh to build.

You then need to call speak() with the `voice` option that tells it to use the
right voice for your language. For example, for French this should work:

      `speak('boulanger', { voice: 'fr' })`

