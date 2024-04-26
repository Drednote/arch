# Arch linux

> This is my config of Arch linux, and it may not work for you

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

- You can add env variables in envs.env (located resources/), they will be added to environment

### Execution

For execution, you should execute `install.sh`

After reboot execute `install_theme.sh` to install custom Theme

If you click on System Tray and you see popup with zero height, you need to
execute `fix_zero_popup.sh`. **You must execute this script after seeing zero systray popup** 