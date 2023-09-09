#!/bin/bash
cd
touch .hushlogin

#apt
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y git pypy wget byobu tree


pip install magic-wormhole


#pip
pip install -U typing_extensions requests

#clean
sudo apt autoremove -y

#bashrc
wget https://sublimeclemency.github.io/Documents/rc/linux.bashrc && mv linux.bashrc .bashrc

#byobu
wget https://sublimeclemency.github.io/Documents/rc/byobu.zip && mv byobu.zip .byobu.zip && unzip -o .byobu.zip && rm .byobu.zip && byobu-enable

#clear history
cat /dev/null > ~/.bash_history && history -c


#backup tools
wget -O - https://raw.githubusercontent.com/Botspot/Pi-Power-Tools/master/update | bash
sudo mv $HOME/Pi-Power-Tools/functions/image-shrink $HOME/Pi-Power-Tools/functions/milliways-image-backup /bin
sudo rm -r $HOME/Pi-Power-Tools


#aliases
#for additional things that might want to be installed
#example: if "pi-apps" was entered after this script terminates, pi-apps would be installed
alias pi-apps='wget -qO- https://raw.githubusercontent.com/Botspot/pi-apps/master/install | bash'