# imac
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
alias df='df -h --total'

alias apt='apt'

alias mov='mv -f'
alias move='rsync --remove-source-files -P -h -r'

alias cop='cp -r'
alias copy='rsync -P -h -r'

alias tre='tree --dirsfirst -F -L 1'
alias tree='tree --dirsfirst -F -L 3'

alias mkdir='mkdir -p -v'
alias largest='du -h -x -s -- * | sort -r -h'

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

PS1='\001\033[0;96m\002\u\001\033[0;35m\002@\h\001\033[0;93m\002\w\001\033[0;96m\002$ '

trap 'printf "\001\033[00m\002"' DEBUG;