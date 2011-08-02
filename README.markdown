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

 * Add a div with an audio element called 'audio' in your html body,

      `<div id="audio"></div>`

 * Call speak() to say stuff in JavaScript

      `speak('hello world!')`

See demo.html for an example use.

speak.js is the unminified version, speak.min.js is after being run through the Closure Compiler. You should probably use that one.


Building
--------

Run emscripten.sh inside src/. Note that you need to change the paths there.

