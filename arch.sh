#!/bin/bash

#### Check for yay ####
ISYAY=/sbin/yay
if [ -f "$ISYAY" ]; then
    echo -e "yay was located, moving on.\n"
else
    read -n1 -rep "yay was not located. Would you like to install it? (y,n)" YAY
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

### Install pacakges ####
read -n1 -rep 'Would you like to install the packages? (y,n)' INST
if [[ $INST == "Y" || $INST == "y" ]]; then
    yay -S --noconfirm hyprland kitty waybar \
    swaybg swaylock-effects wofi wlogout mako thunar \
    ttf-jetbrains-mono-nerd noto-fonts-emoji \
    polkit-gnome python-requests starship \
    swappy grim slurp pamixer brightnessctl gvfs \
    bluez bluez-utils lxappearance xfce4-settings \
    dracula-gtk-theme dracula-icons-git xdg-desktop-portal-hyprland

    # Start the bluetooth service
    echo -e "Starting the Bluetooth Service...\n"
    sudo systemctl enable --now bluetooth.service
    sleep 2
    
    # Clean out other portals
    echo -e "Cleaning out conflicting xdg portals...\n"
    yay -R --noconfirm xdg-desktop-portal-gnome xdg-desktop-portal-gtk
fi

### Script is done ###
echo -e "Script had completed.\n"
echo -e "You can start Hyprland by typing Hyprland (note the capital H).\n"
read -n1 -rep 'Would you like to start Hyprland now? (y,n)' HYP
if [[ $HYP == "Y" || $HYP == "y" ]]; then
    exec Hyprland
else
    exit
fi
