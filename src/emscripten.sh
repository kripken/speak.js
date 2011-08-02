echo "make"
RANLIB=/home/alon/Dev/emscripten/tools/emmaken.py AR=/home/alon/Dev/emscripten/tools/emmaken.py CXX=/home/alon/Dev/emscripten/tools/emmaken.py CC=/home/alon/Dev/emscripten/tools/emmaken.py make
echo "dis"
~/Dev/llvm-2.9/cbuild/bin/llvm-dis -show-annotations speak -o=speak.ll
echo "emscripten"
python /home/alon/Dev/emscripten/emscripten.py -O -s USE_TYPED_ARRAYS=2 -s ASSERTIONS=0 -s OPTIMIZE=1 -s RELOOP=0 speak.ll > espeak.raw.js
echo "bundling"
cat pre.js > ../speak.js
for filey in phontab phonindex phondata intonations en_dict
do
  python ~/Dev/emscripten/tools/file2json.py ../espeak-data/$filey $filey >> ../speak.js
done
python ~/Dev/emscripten/tools/file2json.py ../espeak-data/voices/en/en-us en_us >> ../speak.js
cat espeak.raw.js >> ../speak.js
cat post.js >> ../speak.js
#~/Dev/mozilla-central/js/src/js -m speak.js -w wav.wav --path="/home/alon/Dev/espeak-1.45.04-source" "hello world"
#~/Dev/v8/d8 header.js speak.js footer.js
#gnome-sound-recorder wav.wav

