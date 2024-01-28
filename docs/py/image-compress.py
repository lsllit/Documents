#!/usr/bin/python3
# pip install Pillow

import os, glob, PIL, sys
from PIL import Image

print("note: this will only work if images are at the same level or below this script in the file tree.")

quality = int(input("what is compression quality? input a number from 1 to 100: "))

script_dir = os.path.dirname(os.path.abspath(__file__))

print(f"script directory is at {script_dir}")

input_dir = os.path.join(script_dir,input("directory where the images are, relative to script directory: "))
assert os.path.isdir(input_dir)

output_dir = os.path.join(script_dir,input("directory where to save the images, relative to script directory: "))
assert os.path.isdir(output_dir)

# for png files, transparent means black
transparent_fill_color = '#000000'

try:
  os.makedirs(dest_dir)
except: pass

for infile in os.listdir(input_dir):
  if os.path.splitext(infile)[1].lower() in ('.jpg', '.jpeg', '.png'):
    file, ext = os.path.splitext(infile)
    image = Image.open(infile)
    if image.mode in ('RGBA', 'LA'):
      background = Image.new(image.mode[:-1], image.size, fill_color)
      background.paste(image, image.split()[-1])
      image = background
    
    image.save(output_dir + '/' + file + ".jpg", "JPEG", optimize=True, quality=quality)
