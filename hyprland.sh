#!/bin/bash

sudo pacman -Syu --noconfirm

### Install pacakges ####

yay -S --noconfirm hyprland kitty waybar \
swaybg swaylock-effects wofi wlogout mako thunar \
ttf-jetbrains-mono-nerd noto-fonts-emoji \
polkit-gnome python-requests starship \
swappy grim slurp pamixer brightnessctl gvfs \
bluez bluez-utils lxappearance xfce4-settings \
dracula-gtk-theme dracula-icons-git xdg-desktop-portal-hyprland

# Clean out other portals
echo -e "Cleaning out conflicting xdg portals...\n"
yay -R --noconfirm xdg-desktop-portal-gnome xdg-desktop-portal-gtk

cp -R config/kitty ~/.config/
cp -R config/hypr ~/.config/
cp -R source ~/.config/

chmod +x ~/.config/startWeston.sh
chmod +x ~/.config/startHyprland.sh

sudo pacman -S --noconfirm weston
sudo mkdir -p /etc/sddm.conf.d
sudo cp /usr/lib/sddm/sddm.conf.d/default.conf /etc/sddm.conf.d
sudo sed -i 's/^DisplayServer=.*/DisplayServer=wayland/g' /etc/sddm.conf.d/default.conf
sudo sed -i 's/^CompositorCommand=.*/CompositorCommand=~/.config/startWeston.sh/g' /etc/sddm.conf.d/default.conf
sudo sed -i 's/^Name=Hyprland/Name=Hyprland Wayland/g' /usr/share/wayland-sessions
sudo sed -i 's/^Exec=Hyprland/Exec=~/.config/startHyprland.sh/g' /usr/share/wayland-sessions

### Script is done ###
echo -e "Script had completed.\n"
echo -e "You can start Hyprland by typing Hyprland (note the capital H).\n"
read -rep 'Would you like to start Hyprland now? (y,n) ' HYP
if [[ $HYP == "Y" || $HYP == "y" ]]; then
    exec Hyprland
else
    exit
fi
