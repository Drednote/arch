#!/bin/bash

RED='\033[0;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

read -p "$(echo -e ${YELLOW}"After script execution you will be logout. Continue? (y,n) ${NC}")" ZSH
if [[ $ZSH == "Y" || $ZSH == "y" ]]; then
    python $SRC_DIR/bin/update-config.py --file $HOME/.config/plasma-org.kde.plasma.desktop-appletsrc

    sh source/bin/reload_kde

    qdbus org.kde.Shutdown /Shutdown org.kde.Shutdown.logout
fi