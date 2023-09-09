#!/bin/bash
cd
touch .hushlogin

#apt
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y git pypy byobu tree wget unzip

#pip
# pip install -U typing_extensions requests

#clean
sudo apt autoremove -y

#bashrc
wget https://sublimeclemency.github.io/Documents/rc/linux.bashrc && mv linux.bashrc .bashrc

#byobu
wget https://sublimeclemency.github.io/Documents/rc/byobu.zip && mv byobu.zip .byobu.zip && unzip -o .byobu.zip && rm .byobu.zip && byobu-enable

#clear history
cat /dev/null > ~/.bash_history && history -c