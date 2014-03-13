espeak 1.48.04  06.04.2014

Corrections to languages en, nl, ta (rules, list, and dict files).
No other changes from version 1.48.03. No change to program, phoneme
data, or other languages.


espeak 1.48.03  04.04.2014

Fix bug, use of the command-line  "espeakedit --compile" produced phoneme data
in which vowels started at full amplitude instead of gradual increase.

Fix bug:  SSML <break time=""> with values greater than 23 seconds were ignored
due to arithmetic overflow.

Phoneme definition files:
Added new function:  ChangeNextPhoneme().

Language changes include: da, en, fa, gu, hu, it, nl, pt, ta

Started new language: eu (Basque).

*_rules files:
Allow $p_alt1, $p_alt2, etc in pre-conditions.  The rule matches if the
characters before the current point in the word occur as an entry in the
*_list file with the corresponding $alt attibute.

Added condition $list.  This is similar to $p_alt etc, but examines
all words in the *_list file which don't have the $only attribute.



espeak 1.48.01  02.02.2014

*_rules files:
Added rule attribute $noprefix.  The rule is not used if a prefix has been removed from the word.

Windows:
Program changes to enable audio output from Windows DLL.

Language options: 
Added attribute 'dictdialect' to specify en-us voice for words marked with _^_EN.

Superscripts and subscripts are spoken as single letters and numbers during normal speech, and with "superscript" and "subscript" also spoken when spelling.

API: Change function call espeak_TextToPhonemes().

Klatt synthesizer: Fix parallel formant parameters.


Language changes include:
af, an, da, en, fa, ga, gu, hu, hy, it, ml, nl, ta, ur, vi. 


espeak 1.47.10  30.04.2013
  Data change only.
  Revert 't' sound in Spanish to version 1.47.07.

espeak 1.47.09  29.04.2013
  Bug fix (lookup in *_list occasionally found the wrong word).

espeak 1.47.08  26.04.2013

Automatically generate character names for subscript and
superscript characters.

Use internal ctype data for character codes up to U+024F.

Add API function  espeak_TextToPhonemes().

Add test language az, Azerbaijani.


espeak 1.47.07  18.04.2013
Language data changes only.

espeak 1.47.06  15.04.2013
Bug fix for names of non-ascii digits.

RISC OS version:
  Fix for systems which have 44010Hz but not 22050Hz audio.
  Now runs OK in ARMv7 mode.


espeak 1.47.04  02.04.2013

Bug fixes.

Phoneme definitions: add conditions prev2PhW(), next3PhW().

Added language: ms (Malay)

Command line:
  --voices=<directory>  lists the voices in the specified subdirectory.


espeak 1.47.03  21.03.2013

Bug fixes.


espeak 1.47.01  18.03.2013

Added languages:
  an  Aragonese.
  fa  Farsi.
  ga  Irish.
  lt  Lithuanian.
  pa  Punjabi.

Many language improvements, including American English, Danish, Dutch, Portuguese, Tamil.

Command-line program.  Added -version option.

Command-line program.  Added optional value to --ipa option.
  --ipa=1 adds a 'tie' character to link letters in a multi-letter phoneme name.
  --ipa=2 adds a zero-width joiner to link letters in a multi-letter phoneme name.

Command-line program. -X option now lists the names of attributes from *_list files.

Speak the names of Braille Dot characters, U+2800 to U+28FF.

Speak names of characters in some non-native alphabets.

Automatic switch to a different language for text in non-native alphabets.

Improved speaking of text from a non-native alphabet after automatically switching
to a different language voice.

Break words with characters from different alphabets into separate words.

Ignore soft-hyphen (U+00AD) in text.

Klatt vioices, improved nasal vowels.

espeak-data can be compiled using a different sample rate than the default
22050Hz.  eSpeak will then generate speech at that sample rate.

Change the structure of the espeak-data/voices directory to use subdirectories
for europe, asia, and others.

*_rules files.
  Add suffix option 'm' to allow multiplr suffixes to be removed from a word.

*_list files.
  Allow $text attribute when a text translation is given in a different alphabet.

Phoneme definitions.
  Add NOT operator in conditions.
  Add prevVowel() and nextPh2W() 
  Ignore UTF8-BOM sequence at the start of phoneme definition files.

espeakedit application.
  Use wxWidgets 2.8 on Linux.
  Use wxNotebook for prosody and vowel pages.
  Add an option to compile the phoneme data at a specified sample rate (uses the 'sox'
    program for the conversion of WAV file data).


espeak 1.46.01  22.Nov.2011

Added runtime detection of pulseaudio, with fallback to portaudio if pulse is not running.  Use build option "AUDIO=runtime" in the makefile.

Fixed crash on re-initializing libespeak.

SSML.  Commands such as <mark> and <prosody> were ignored if they were inside a multiword group (defined in *_list). Fixed.

SSML. Don't omit <marker> event for words which are recognized as pairs (such as "of the").

SSML: Keep the original voice variant across SSML xml:lang changes.

SSML: Use the original language sub-type (eg. en-sc) when SSML xml:lang changes to a compatible language.

SSML <emphasis>, increase volume for "strong" and "x-strong".

SSML Fix bug where </emphasis> was ignored at end of clause.

SSML: Fix problem where speed can get set to minimum after a <mark> tag.

SSML: Fixed bug where SSML voice change didn't remember an initially specified Klatt variant.

Mbrola:  Add support for voices:  vz1, mx1, mx2.

Mbrola:  Amplitude changes now apply also to mbrola voices.

Mbrola:  "voicing" attribute in mbrola voice files can be sued to adjust the loudness of the mbrola voice.

*_list:  $combine.  Don't combine with the next word if it uses a different language translator.

*_list: $dot attribute was ignored for multi-word entries.

Phoneme definition files. Phoneme programs. Added condition "isTranslationGiven" to test whether a phoneme has been specified explicitly for a word in *_list.

Lang=Hindi:  Suppress some [@] vowels.

Lang=Spanish, fix missing "y" in numbers such as "21".

Lang=EN-US: Don't add 'intrusive r' between phoneme [i@] and a following vowel.
lang=EN-US, distinguish phonemes [aI@] and [aI3] (compare "diet", "tired").



espeak 1.45.04  25.Apr.2011

Added language Malayalam (ml).

lang=de, Fixed important pronunciation error "sage" etc.

Don't speak punctuation names faster at high speeds.

lang=ml, recognise "virama + U+200d" (zero-width joiner) to indicte 'chillu' characters.

Fix problem of punctuation character announcement repeated at the start of the next sentence after speaking is stopped.

Fixed crash due to large numbers of box-drawing characters in text input.

Fixed mbrola phoneme translation of 't' sounds for US-English voices.


espeak 1.45.03  22.Mar.2011

lang=Turkish, fix pronunciation of suffixes, fix suffixes after names.

Windows: command option --stdout caused spurious 0x0d bytes to be included in speech output (CR/LF problem).

Fixed crash which could occur when a clause starts with a hyphen.


espeak 1.45.02  15.Mar.2011

Only use "sonic" speedup above 450 wpm.

lang=Turkish, fix bug, letter uppercase-I-dot was not recognized on Windows.


espeak 1.45.01  14.Mar.2011

Added languages:  Kannada (kn), Georgian (ka)

Many fixes for various languages, including
Danish, Dutch, English, French, German, Hungarian, Russian, Tamil, 

lang=German.  Revert to previous pronunciation of 'r' sounds (from before 1.44).
lang=Esperanto.  Change prosody.


Added "sonic" code (by Bill Cox) to increase the speed of speech after it has been generated by eSpeak.  This removes eSpeak's 450 speed limit.

Command-line options.
Recognize --  which means don't treat following arguments as options.
--help  also gives the path of the espeak-data directory.

SSML
Allow single as well as double quotes around strings.
Fix bugs in SSML "prosody rate".

Mbrola.  Look for Mbrola voices also at /usr/share/mbrola/xx/xx

Fixed bug where double .. was ignored.

Fixed bug in reporting word event lengths in callbacks.

Fixed bug in reporting marker event positions in callbacks, when non-ascii text.

Phoneme definitions.
New keyword "prevoice": always add murmer before a voiced stop, not only after a vowel.
Fixed bug in nextVowel() condition that caused crash.
Fixed bug is condition "isRhotic".

espeakedit.
Try "aplay" and then "play" to play sound.
Improved the Tools->Lexicon functions, which generate **_listx data from a list of words and their pronunciations.



espeak 1.44.04

Fix error in big-endian data conversion program, producing bad data.

Make geminated voiced stops (eg. [bb] ) longer at fast speeds.

Provide conditional compilation of the mbrola interface, define macro INCLUDE_MBROLA in speech.h

Mbrola: also look for mbrola voices in /usr/share/mbrola/voices

Pad TUNES and frame_t structures to a multiple of 4 bytes.

lang=da, Don't weaken unvoiced stops before pause.
lang=el, Remove final unstressed [a] if the next word starts with [a].
lang=pt, Change final [U] to [w] if next word starts with a vowel.


espeak 1.44.03

Fixes:
Lang=el, mk.  Was speaking words as individual letters.
Lang=pl.  Fix prounciation of 'ć' and 'ci'.
Fix crash in big-endian data conversion program.
Fix problem where changing voices reduces the speaking rate, at fast rates.

speak_lib.h:  add macro definitions for minimum, maximum, and normal speaking rate values.



espeak 1.44.01

Fix crash with very long numbers.
Speak very long numbers as individual digits.


Unpronouncable word check:
  Rules for unpronouncable initial letter sequences can now be defined in *_rules files.

  The unpronouncable word check now stops when an apostrophe is found.


Phoneme definitions:
  Optional second parameter to FMT() statement specifies a percentage amplitude.

  Added "ipa" statement to specify the IPA name for a phoneme if the default translation is not correct.

  Add phoneme "equivalents" tables, so that words can be spoken with foreign (eg English) prounuciation rules, but using local phonemes.

  New attributes:  flag1, flag2, flag3

  New attribute: nopause. Prevents the insertion of a short pause when this phoneme starts a word which follows a vowel.

  New conditions: isFlag1, isFlag2, isFlag3, isSibilant.

  New statement: InsertPhoneme()


Phonemes: improve syllablic [m-] [n-] [N-]


Mbrola:
  Command-line espeak and the libespeak library now call the mbrola program directly, rather than producing phoneme text which must be piped into mbrola.

  Added --pho command-line option to generate mbrola phoneme information (.pho data).

Phoneme output:
  Add --ipa command-line option to produce phonemes names using the International Phonetic Alphabet.

  Indicate language changes during phoneme output with: (en)  (fr)  etc.


-X command-line option: Show the matching of multiple-word entries in *_list files.

Speak sequences of letters and dots as individual letters and don't speak 'dot' (eg. "u.s.a").

Don't speak punctuation characters inside <audio> ... <audio/>.

Don't speak "dot" if an ellipsis is followed by a dot.

Vowelcharts:  Show the positions for multiple FMT() statements in a vowel phoneme definition.


*_rules: add attributes  $p_alt $p_alt2 $p_alt3,  $w_alt $w_alt2 $w_alt3

*_list:  add attributes:  $sentence, $atstart


klatt synthesizer: implement echo (defined in voice files).


espeakedit:
  Prosody display: Show stressed and secondary-stress syllables.

  Remember window size and position.

  Change the frame-length field from Spin Control to Text Control to allow better access from screen-readers.


Intonation:
  New file, 'phsource/intonation' to define 'tunes' which can be used from voice files.

  espeakedit: add Compile -> Intonation data

  Intonation: change the internal pitch unit to give finer control, and align with the values displayed in the espeakedit Prosody window.


Speed: Increase range to 80 to 450, with default=175.
Improve speaking at high speeds.


Language options: add an option to the Regressive Voicing option to de-voice the final consonant of words.

lang=ta, hi.  Letter-names for combining vowel characters are distinguished from stand-alone vowel characters by adding an initial click sound.

lang=en: Reduce consecutive unstressed syllables to 'diminished' stress, only in unstressed words.

lang=de: Change 'r' phoneme.

lang=es: Improve the rules for reducing 'b', 'd', 'g' to approximants [B] {D] [Q].

Language improvements include: Danish, Dutch.


espeak 1.43.03  (bug fixes)

Fix crash when embedded control codes are followed by numbers of 5 or more digits.
Fix lang=hu,  First character of an abbreviation is missed after an ordinal number (eg."2. cd")
Fix XML tag not recognized after "..." when announce punctuation is enabled.
Fix lang=zh-yue, 'p' 't' 'k' after a vowel give a long pause.
Fix lang=ru, "o" missing in unstressed syllables.

espeak 1.43.02

Language improvements including Danish.

Fix: "  50000" with leading spaces was spoken as "50".

Don't consider multiple spaces as a thousands separator (eg. "2  000").

Fixed phoneme [n^] for klatt synthesizer.

Lang=Hungarian, don't allow dot as thousands separator.



espeak 1.43

New format for phoneme definitions, including conditional statements for more flexibility.

Added voice variants which use the Klatt synthesizer rather than the eSpeak synthesizer: klatt, klatt2, klatt3

Fixes to the Klatt synthesizer.
Updated phoneme data for use in the Klatt synthesizer.


Allow optional .txt filename suffix for *_rules and *_list files.

HTML tags should not insert a space when they are removed.  This could cause a break inside a word (eg. <b>, <font>).

Fixes to correctly recognise space as a thousands separator in some languages.


