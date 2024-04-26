#!/bin/bash

RED='\033[0;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

SRC_DIR=$(cd $(dirname $0) && pwd)
ROOT_UID=0
THEME_NAME=Drednote

alias knshandler="/usr/lib/kf6/kpackagehandlers/knshandler"

# Destination directory
if [ "$UID" -eq "$ROOT_UID" ]; then
  AURORAE_DIR="/usr/share/aurorae/themes"
  COLORSCHEMES_DIR="/usr/share/color-schemes"
  GLOBAL_DIR="/usr/share/plasma/look-and-feel"
  KONSOLE_DIR="/usr/share/konsole"
  PLASMA_DIR="/usr/share/plasma/desktoptheme"
  WALLPAPER_DIR="/usr/share/wallpapers"
else
  AURORAE_DIR="$HOME/.local/share/aurorae/themes"
  COLORSCHEMES_DIR="$HOME/.local/share/color-schemes"
  GLOBAL_DIR="$HOME/.local/share/plasma/look-and-feel"
  KONSOLE_DIR="$HOME/.local/share/konsole"
  PLASMA_DIR="$HOME/.local/share/plasma/desktoptheme"
  WALLPAPER_DIR="$HOME/.local/share/wallpapers"
fi

[[ ! -d ${AURORAE_DIR} ]] && mkdir -p ${AURORAE_DIR}
[[ ! -d ${COLORSCHEMES_DIR} ]] && mkdir -p ${COLORSCHEMES_DIR}
[[ ! -d ${GLOBAL_DIR} ]] && mkdir -p ${GLOBAL_DIR}
[[ ! -d ${KONSOLE_DIR} ]] && mkdir -p ${KONSOLE_DIR}
[[ ! -d ${PLASMA_DIR} ]] && mkdir -p ${PLASMA_DIR}
[[ ! -d ${WALLPAPER_DIR} ]] && mkdir -p ${WALLPAPER_DIR}

install() {
  local name=${1}

  cp -rf ${SRC_DIR}/aurorae/* ${AURORAE_DIR}
  cp -rf ${SRC_DIR}/color-scheme/* ${COLORSCHEMES_DIR}
  cp -rf ${SRC_DIR}/look-and-feel/* ${GLOBAL_DIR}
#  cp -rf ${SRC_DIR}/konsole/* ${KONSOLE_DIR}
  cp -rf ${SRC_DIR}/plasma/* ${PLASMA_DIR}
  cp -rf ${SRC_DIR}/wallpaper/* ${WALLPAPER_DIR}

  while IFS= read -r dependency; do
    echo "$dependency"
    knshandler "$dependency"
  done < <(cat ${SRC_DIR}/look-and-feel/$THEME_NAME/metadata.json | jq -r '.["X-KPackage-Dependencies"][]')

  ICONS_THEME=$(grep -oP '^Theme=.*$' $SRC_DIR/look-and-feel/$THEME_NAME/contents/defaults)
  arr=(${ICONS_THEME//=/ })
  NAME="${arr[1]}"

  if ! grep -q "Inherits=" "$HOME"/.local/share/icons/"$NAME"/index.theme; then
      sed -i '/\[Icon Theme\]/a Inherits=Cobalt,breeze,hicolor' "$HOME"/.local/share/icons/"$NAME"/index.theme
  fi
}

echo "Installing the ${THEME_NAME} theme for the Plasma Desktop..."

install "${name:-${THEME_NAME}}"

lookandfeeltool -a Drednote --resetLayout
sh source/bin/reload_kde

echo -e "${GREEN}==>${WHITE} Install finished... Now you will be logout to complete installation${NC}"
