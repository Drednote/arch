#!/bin/bash

sudo pacman -Syu --noconfirm nvidia nvidia-utils nvidia-settings opencl-nvidia xorg-server-devel

#In this step, we are creating and configuring the 10-nvidia-drm-outputclass.conf file in the /etc/X11/xorg.conf.d/ directory. 
#This file is essential for defining Xorg output settings for Intel and NVIDIA GPUs. 
# It uses the "OutputClass" sections to associate the modesetting driver with the Intel GPU and the nvidia driver with the NVIDIA GPU.

mkdir -p /etc/X11/xorg.conf.d
cat >> /etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf<<EOF
Section "OutputClass"
    Identifier "intel"
    MatchDriver "i915"
    Driver "modesetting"
EndSection

Section "OutputClass"
    Identifier "nvidia"
    MatchDriver "nvidia-drm"
    Driver "nvidia"
    Option "AllowEmptyInitialConfiguration"
    Option "PrimaryGPU" "yes"
    ModulePath "/usr/lib/nvidia/xorg"
    ModulePath "/usr/lib/xorg/modules"
EndSection
EOF

# Here, we are creating two .desktop files to integrate Optimus optimization with GDM. 
# GDM is configured to automatically run the xrandr script 
# to allocate video outputs correctly between Intel and NVIDIA GPUs during the graphical server startup.

mkdir -p /usr/share/gdm/greeter/autostart
mkdir -p /etc/xdg/autostart

cat >> /usr/share/gdm/greeter/autostart/optimus.desktop<<EOF
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
EOF

cat >> /etc/xdg/autostart/optimus.desktop<<EOF
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
EOF

# This step configures Modprobe for the NVIDIA driver, specifically for nvidia-drm. 
# We are adding an option to the nvidia-drm-nomodeset.conf file to enable the modeset mode, 
# which is essential for smooth integration of the NVIDIA driver with the graphical environment.

mkdir -p /etc/modprobe.d

cat >> /etc/modprobe.d/nvidia-drm-nomodeset.conf<<EOF
options nvidia-drm modeset=1
EOF

# Rebuild Initramfs to ensure the changes are applied:
sudo mkinitcpio -P

# The nvidia-xconfig command is used to generate a specific Xorg configuration file for the NVIDIA driver. 
# This helps ensure that the necessary settings are present and optimized for the installed NVIDIA GPU.

sudo nvidia-xconfig
