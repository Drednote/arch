#!/bin/bash

# You need to run this script after first installation reboot

Theme=Drednote

read -p "$(echo -e ${WHITE}"Configure Plasma Theme '$Theme'? (y,n) ${NC}")" TH
if [[ $TH == "Y" || $TH == "y" ]]; then
    sh themes/"$Theme"/install.sh
fi