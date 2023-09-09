#!/bin/bash
n=1
while read -r line; do
  filename=$(basename -- "$line")
  extension="${filename##*.}"
  filename="${filename%.*}"
  files=($(ls -p | grep -v / | sed -n 'p'))
  filename=${files##*/}
  mv "$(ls -1 | sed -n "${n}p")" "$line.mkv"
  n=$((n+1))
done < filenames.txt