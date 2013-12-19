import os, sys
from subprocess import Popen, PIPE, STDOUT

def process(filename):
  base_dir = '..'
  file2json = '/home/logue/emscripten/tools/file2json.py'
  files = ''

  for filey in ['phontab', 'phonindex', 'phondata', 'intonations', 'en_dict']: # fr_dict # Needed for French
    f = Popen(['python', file2json, os.path.join(base_dir, 'espeak-data', filey), filey], stdout=PIPE).communicate()
    files += f[0]

  f = Popen(['python', file2json, os.path.join(base_dir, 'espeak-data/voices/en-us'), 'en_us'], stdout=PIPE).communicate()
  files += f[0]

  # Needed for French
  # f = Popen(['python', file2json, os.path.join(base_dir, 'espeak-data/voices/fr'), 'fr'], stdout=PIPE).communicate()
  # files += f[0]

  src = open(filename).read()
  pre = open('pre.js').read()
  post = open('post.js').read()

  out = open(filename, 'w')
  out.write(pre.replace('{{{ FILES }}}', files))
  out.write(src)
  out.write(post)
  out.close()

process(sys.argv[1])

