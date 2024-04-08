#!/bin/bash

# You need to run this script after first installation reboot

read -p "$(echo -e ${WHITE}"Configure Hyprland plugins? (y,n) ${NC}")" HYPR_PLUG
if [[ $HYPR_PLUG == "Y" || $HYPR_PLUG == "y" ]]; then
  hyprpm update
  hyprpm add https://github.com/hyprwm/hyprland-plugins.git
fi