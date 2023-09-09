import playsound
import subprocess
import os

mp3_files = [file for file in os.listdir('.') if file.endswith('.mp3')]

# List to store subprocess objects
subprocesses = []

# Launch subprocesses for each MP3 file
for mp3_file in mp3_files:
    cmd = ['python3', '-m', 'playsound', mp3_file]
    subprocesses.append(subprocess.Popen(cmd))

input()

# Stop all subprocesses simultaneously

subprocesses[0].terminate()

input()

# Stop all subprocesses simultaneously

subprocesses[1].terminate()