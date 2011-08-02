echo "make"
RANLIB=/home/alon/Dev/emscripten/tools/emmaken.py AR=/home/alon/Dev/emscripten/tools/emmaken.py CXX=/home/alon/Dev/emscripten/tools/emmaken.py CC=/home/alon/Dev/emscripten/tools/emmaken.py make
echo "dis"
~/Dev/llvm-2.9/cbuild/bin/llvm-dis -show-annotations speak -o=speak.ll
echo "emscripten"
python /home/alon/Dev/emscripten/emscripten.py -O -s USE_TYPED_ARRAYS=2 -s ASSERTIONS=0 -s OPTIMIZE=1 -s RELOOP=1 speak.ll > espeak.raw.js
echo "bundling"
cat pre.js > ../speak.full.js
for filey in phontab phonindex phondata intonations en_dict
do
  python ~/Dev/emscripten/tools/file2json.py ../espeak-data/$filey $filey >> ../speak.full.js
done
python ~/Dev/emscripten/tools/file2json.py ../espeak-data/voices/en/en-us en_us >> ../speak.full.js
cat espeak.raw.js >> ../speak.full.js
cat post.js >> ../speak.full.js
#~/Dev/mozilla-central/js/src/js -m speak.full.js -w wav.wav --path="/home/alon/Dev/espeak-1.45.04-source" "hello world"
#~/Dev/v8/d8 header.js speak.full.js footer.js
#gnome-sound-recorder wav.wav
#java -jar /home/alon/Dev/closure-compiler-read-only/build/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --variable_map_output_file speak.vars --js speak.full.js --js_output_file speak.js

