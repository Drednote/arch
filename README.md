# Arch linux + Hyprland

> This is my config of Hyprland, and it may not work for you

### Prerequisites

Before installation format partionions

- `fdisk -l` - show info about disks
- `lsblk` - show less info about disks
- `cfdisk` - util to work with disk
- `mkfs` - format disks (.fat -F32 or .ext4)

Install with `archinstall`

- minimal profile
- pipeware
- grub

### Rules

- Wallpaper must name wallpaper.png and located resources/. Script auto set image with this name to
  wallpapers
- You can add env variables in envs.env (located resources/), they will be added to environment

### Execution

For execution, you must call `source install.sh`

After reboot execute `after_install.sh` to complete installation