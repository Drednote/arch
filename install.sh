#!/bin/bash

RED='\033[0;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

UTILS="vim htop nvtop"

sudo pacman -Syu --noconfirm

#read -p "$(echo -e ${WHITE}"Install $UTILS? (y,n) ${NC}")" UT
#if [[ $UT == "Y" || $UT == "y" ]]; then
#    sudo pacman -S --noconfirm $UTILS
#fi

read -p "$(echo -e ${WHITE}"Configure Zsh? (y,n) ${NC}")" ZSH
if [[ $ZSH == "Y" || $ZSH == "y" ]]; then
    source source/bin/zsh/init
fi

read -p "$(echo -e ${WHITE}"Configure RUS language? (y,n) ${NC}")" LANG
if [[ $LANG == "Y" || $LANG == "y" ]]; then
    source source/bin/lang
fi

#### Dual boot ####
read -p "$(echo -e ${WHITE}"Configure dualboot? (y,n) ${NC}")" DUAL
if [[ $DUAL == "Y" || $DUAL == "y" ]]; then
  source source/bin/dualboot
fi

read -p "$(echo -e ${WHITE}"Configure nvidia drivers? (y,n) ${NC}")" NVIDIA
# see https://github.com/korvahannu/arch-nvidia-drivers-installation-guide?tab=readme-ov-file
# https://wiki.hyprland.org/Nvidia/
if [[ $NVIDIA == "Y" || $NVIDIA == "y" ]]; then
    source source/bin/nvidia
fi

source source/bin/install/yay

read -p "$(echo -e ${WHITE}"Configure Plasma? (y,n) ${NC}")" PLASMA
if [[ $PLASMA == "Y" || $PLASMA == "y" ]]; then
    source source/plasma
fi

### Script is done ###
echo -e "${GREEN}==>${WHITE} Script had completed. Now you can reboot to apply all settings${NC}"
echo -e "${GREEN}==>${WHITE} After reboot execute 'after_install.sh' to complete installation${NC}"