#
# ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗
# ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔════╝
# ██████╔╝███████║███████╗███████║██████╔╝██║
# ██╔══██╗██╔══██║╚════██║██╔══██║██╔══██╗██║
# ██████╔╝██║  ██║███████║██║  ██║██║  ██║╚██████╗
# ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝


HISTTIMEFORMAT="%F %T "

HISTCONTROL=ignoredups

HISTSIZE=333

HISTFILESIZE=999

shopt -s dotglob
shopt -s extglob
shopt -s cdspell
shopt -s dirspell
shopt -s histappend
shopt -s checkwinsize

alias ..='cd ..'

alias ...='cd ../..'

alias ....='cd ../../..'

alias ls='ls --color=auto'
alias lsa='ls -a'
alias list='ls -Sgh'

alias c='clear'
alias cc='cat /dev/null > ~/.bash_history && history -c'

alias d='cd ~/Desktop'

alias up='sudo apt update && sudo apt upgrade'

alias df='df -h --total'

alias apt='apt'

alias mov='mv -f'
alias move='rsync --remove-source-files -P -h -r'

alias cop='cp -r'
alias copy='rsync -P -h -r'

alias view='nano -v'
alias nano='nano -S'

alias rem='rm'
alias del='rm -r'
alias remove='sudo rm -r'
alias delete='sudo rm -r'

alias down='shutdown -h now'

alias tre='tree --dirsfirst -F -L 1'
alias tree='tree --dirsfirst -F -L 3'

alias mark='bash -c "sudo umount -f -q $HOME/Desktop/mark; sudo mount.cifs //192.168.0.6/mark $HOME/Desktop/mark/ -o username=mark,password=mark123"'

alias mkdir='mkdir -p -v'

alias server='cd /var/www/html'

alias whisperen='whisper --model tiny.en'
alias whisperenglish='whisper --model base.en'

alias largest='du -h -x -s -- * | sort -r -h'

alias fm='sudo $HOME/fm_transmitter/fm_transmitter -f 88'

alias mp3_wav='for i in *.mp3; do sox "$i" -c 2 -b 16 "./$(basename -s .mp3 "$i").wav" -V; done'
alias flac_wav='for i in *.flac; do sox "$i" -c 2 -b 16 "./$(basename -s .flac "$i").wav" -V; done'

function p() {
    if [ "$1" -eq 0 ] 2>/dev/null; then
        selected=$(ls -1 | tail -n1)
    elif [ "$1" -gt 0 ] 2>/dev/null; then
        selected=$(ls -1 | sed -n "${1}p")
    elif [ "$1" -lt 0 ] 2>/dev/null; then
        selected=$(ls -1 | tail -n "$((-$1))" | head -n1)
    else
        selected=$1
    fi
    echo "$selected"
}

function q() {
    selected=$(p "$1")
    if [ -d "$selected" ]; then
        tre "$selected"
    else
        more "$selected"
    fi
}

function w() {
    selected=$(p "$1")
    if [ -d "$selected" ]; then
        cd "$selected"
    else
        nano "$selected"
    fi
}

function qq() {
    selected=$(p "$1")
    if [ -d "$selected" ]; then
        rm -fr "$selected"
    else
        rm -f "$selected"
    fi
}

function backup() {
    echo Backup starting. Sit back and relax for 1 hour!
    echo Seriously. Would you just wait for ONE FULL HOUR.
    echo Never mind any errors! It usually works fine.
    sudo umount -f -q $HOME/Desktop/mark
    sudo rm -r /var/log/journal/*
    sudo "image-shrink" "$HOME/backup.img" $((1024*1024))
    sudo "milliways-image-backup" "$HOME/backup.img"
    sudo "image-shrink" "$HOME/backup.img" 0
    echo Complete. backup.img should be in home directory.
}

function info() {
    printf "\n"
    printf "%s\n" "IP ADDR: $(curl -s ifconfig.me)"
    printf "%s\n" "USER: $(whoami)"
    printf "%s\n" "DATE: $(date)"
    printf "%s\n" "CPU: $(sudo cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq)"
    printf "%s\n" "TEMP: $(sudo vcgencmd measure_temp)"
    printf "%s\n" "UPTIME: $(uptime -p)"
    printf "%s\n" "HOSTNAME: $(hostname -f)"
    printf "\n"
}

PS1='\001\033[0;96m\002\u\001\033[0;35m\002@\h\001\033[0;93m\002\w\001\033[0;96m\002$ '

trap 'printf "\001\033[00m\002"' DEBUG;

export PATH="$HOME/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games"