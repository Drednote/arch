#!/bin/bash

#### Check for yay ####
ISYAY=/sbin/yay
if [ -f "$ISYAY" ]; then
    echo -e "yay was located, moving on.\n"
else
    read -n1 -rep "yay was not located. Would you like to install it?\n" YAY
    if [[ $YAY == "Y" || $YAY == "y" ]]; then
        USER=$(ps -ax -o user='' -o tty='' | grep -v ' pts/' | sort -u | grep tty1 | awk '{print $1}')
        cd /opt/ || echo "cannot find /opt/" | exit
        sudo git clone https://aur.archlinux/yay-git.git
        sudo chown -R "$USER":"$USER" yay-git/
        cd /yay-git/ || echo "cannot find /opt/yay-git" | exit
        makepkg -si --noconfirm
    else
        exit
    fi
fi

yay -Suy --noconfirm

