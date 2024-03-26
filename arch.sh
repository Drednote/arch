#!/bin/bash

sudo pacman -Syu --noconfirm wget vim

#### Dual boot ####
read -rep "Configure dualboot? (y,n) " DUAL
if [[ $DUAL == "Y" || $DUAL == "y" ]]; then
    sudo pacman -S --noconfirm grub efibootmgr dosfstools mtools os-prober
    sudo grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    sudo sed -i 's/#GRUB_DISABLE_OS_PROBER=false/GRUB_DISABLE_OS_PROBER=false/g' /etc/default/grub
    sudo grub-mkconfig -o /boot/grub/grub.cfg
fi

read -rep "Install nvidia drivers? (y,n) " NVIDIA
# see https://github.com/korvahannu/arch-nvidia-drivers-installation-guide?tab=readme-ov-file
if [[ $NVIDIA == "Y" || $NVIDIA == "y" ]]; then
    sudo pacman -S nvidia nvidia-utils lib32-nvidia-utils
    
    sudo sed -i '/^GRUB_CMDLINE_LINUX_DEFAULT=".*/ s/.$//' /etc/default/grub
    sudo sed -i '/^GRUB_CMDLINE_LINUX_DEFAULT=".*/ s/$/ nvidia-drm.modeset=1"/' /etc/default/grub
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    
    sudo sed -i '/^MODULES=(.*/ s/.$//' /etc/mkinitcpio.conf
    sudo sed -i '/^MODULES=(.*/ s/$/ nvidia nvidia_modeset nvidia_uvm nvidia_drm)/' /etc/mkinitcpio.conf
    sudo sed -i '/^HOOKS=(.*kms.*/ s/kms//' /etc/mkinitcpio.conf
    sudo mkinitcpio -P
    
    wget https://raw.githubusercontent.com/korvahannu/arch-nvidia-drivers-installation-guide/main/nvidia.hook
    sudo mkdir -p /etc/pacman.d/hooks
    sudo mv ./nvidia.hook /etc/pacman.d/hooks/
fi

#### Check for yay ####
ISYAY=/sbin/yay
if [ -f "$ISYAY" ]; then
    echo -e "yay was located, moving on.\n"
else
    read -rep "yay was not located. Would you like to install it? (y,n) " YAY
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

# Start the bluetooth service
echo -e "Starting the Bluetooth Service...\n"
sudo systemctl enable --now bluetooth.service
sleep 2