import os, sys
from subprocess import Popen, PIPE, STDOUT

def process(filename):
  base_dir = '..'

  files = ''

  for filey in ['config', 'phontab', 'phonindex', 'phondata', 'intonations', 'en_dict']: # fr_dict # Needed for French
    f = Popen(['python', '/home/alon/Dev/emscripten/tools/file2json.py', os.path.join(base_dir, 'espeak-data', filey), filey], stdout=PIPE).communicate()
    files += f[0]

  f = Popen(['python', '/home/alon/Dev/emscripten/tools/file2json.py', os.path.join(base_dir, 'espeak-data/voices/en/en-us'), 'en_us'], stdout=PIPE).communicate()
  files += f[0]

  # Needed for French
  f = Popen(['python', '/home/alon/Dev/emscripten/tools/file2json.py', os.path.join(base_dir, 'espeak-data/voices/fr'), 'fr'], stdout=PIPE).communicate()
  files += f[0]

  src = open(filename).read()
  pre = open('pre.js').read()
  post = open('post.js').read()

  out = open(filename, 'w')
  out.write(pre.replace('{{{ FILES }}}', files))
  out.write(src)
  out.write(post)
  out.close()

process(sys.argv[1])

