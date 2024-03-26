 #!/bin/env sh
 
 export XDG_CURRENT_DESKTOP=weston
 export XDG_SESSION_DESKTOP=weston
 export XDG_SESSION_TYPE=wayland
 export WLR_NO_HARDWARE_CURSORS=1
 export WLR_RENDERER_ALLOW_SOFTWARE=1
 exec weston --shell=fullscreen-shell.so