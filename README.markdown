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

See demo.html for an example use.


Building
--------

Run emscripten.sh inside src/. Note that you need to change the paths there.

That will generate speak.full.js, which is the unminified version. It is
recommended to minify that (for example, using the closure compiler). speak.js
in this repo is minified.

demo.full.html is the same as demo.html but uses speak.full.js. It is useful
for testing.

