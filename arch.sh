#!/bin/bash

#### Check for yay ####
ISYAY=/sbin/yay
if [ -f "$ISYAY" ]; then
    echo -e "yay was located, moving on.\n"
else
    read -n1 -rep "yay was not located. Would you like to install it?\n" YAY
    if [[ $YAY == "Y" || $YAY == "y" ]]; then
        USER=$(ps -ax -o user='' -o tty='' | grep -v ' pts/' | sort -u | grep tty1 | awk '{print $1}')
        cd /opt/ || exit
        sudo git clone https://aur.archlinux.org/yay-git.git
        sudo chown -R "$USER":"$USER" yay-git/
        cd /opt/yay-git/ || exit
        makepkg -si --noconfirm
        echo -e "yay was installed\n"
    else
        exit
    fi
fi

echo -e "update yay\n"
yay -Suy --noconfirm
