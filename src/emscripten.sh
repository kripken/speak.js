# Note: emmaken.py and other scripts mentioned here are part of Emscripten,
# available at https://github.com/kripken/emscripten
# (change the paths here to match where you set that up in your system).
echo "make"
make distclean
make clean
rm libespeak.*
rm speak speak.bc speak.o
RANLIB=/home/alon/Dev/emscripten/tools/emmaken.py AR=/home/alon/Dev/emscripten/tools/emmaken.py CXX=/home/alon/Dev/emscripten/tools/emmaken.py CC=/home/alon/Dev/emscripten/tools/emmaken.py CXXFLAGS="-DNEED_WCHAR_FUNCTIONS" make
echo "dis"
~/Dev/llvm/cbuild/bin/llvm-dis -show-annotations speak.bc -o=speak.ll
#echo "autodebug"
#mv speak.ll speak.orig.ll
#python ~/Dev/emscripten/tools/autodebugger.py speak.orig.ll speak.ll
#mv speak.bc speak.orig.bc
#~/Dev/llvm/cbuild/bin/llvm-as speak.ll -o=speak.bc
echo "emscripten"
python /home/alon/Dev/emscripten/emscripten.py -O -s SKIP_STACK_IN_SMALL=1 -s SAFE_HEAP=0 -s USE_TYPED_ARRAYS=2 -s ASSERTIONS=0 -s OPTIMIZE=1 -s RELOOP=1 speak.ll > espeak.raw.js
echo "bundling"
cat pre.js > ../speak.full.js
for filey in config phontab phonindex phondata intonations en_dict # fr_dict # Needed for French
do
  python ~/Dev/emscripten/tools/file2json.py ../espeak-data/$filey $filey >> ../speak.full.js
done
python ~/Dev/emscripten/tools/file2json.py ../espeak-data/voices/en/en-us en_us >> ../speak.full.js
#python ~/Dev/emscripten/tools/file2json.py ../espeak-data/voices/fr fr >> ../speak.full.js # Needed for French
cat espeak.raw.js >> ../speak.full.js
cat post.js >> ../speak.full.js


#~/Dev/mozilla-central/js/src/js -m speak.full.js -w wav.wav --path="/home/alon/Dev/espeak-1.45.04-source" "hello world"
#~/Dev/v8/d8 header.js speak.full.js footer.js
#gnome-sound-recorder wav.wav
#java -jar /home/alon/Dev/closure-compiler-read-only/build/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --variable_map_output_file speak.vars --js speak.full.js --js_output_file speak.js



# Test:
#
# ./speak-native --path=/home/alon/Dev/speak.js -v 'en/en-us' -w wav.wav "4 test"
# OR
# ~/Dev/llvm/cbuild/bin/lli speak.bc -v 'en/en-us' -w wav.wav --path="/home/alon/Dev/speak.js" "4 test"
#
# gnome-sound-recorder wav.wav
#
#                                       # --path="/home/alon/Dev/speak.js" ?
# ~/Dev/mozilla-central/js/src/fast/js -m -n speak.full.js > wav.new.js
# python ~/Dev/emscripten/tools/make_file.py wav.new.js wav
# gnome-sound-recorder wav.new.js.wav

