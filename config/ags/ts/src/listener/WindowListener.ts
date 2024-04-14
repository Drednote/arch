import { Client } from 'types/service/hyprland'
import { bash } from '../utils/shell-utils'
import { WindowPositionHandler } from './handler/WindowPositionHandler'
import { WindowSizeHandler } from './handler/WindowSizeHandler'

const hyprland = await Service.import('hyprland')

function toAddress(str: string) {
  return str.startsWith('0x') ? str : '0x' + str
}

class WindowListener {
  constructor() {
    this.hypr_home = bash('echo $HYPR_CONFIG_HOME')
    this.windowPositionHandler = new WindowPositionHandler(
      `${this.hypr_home}/configs/window_positions.conf`,
    )
    this.windowSizeHandler = new WindowSizeHandler(
      `${this.hypr_home}/configs/window_sizes.conf`,
    )
  }

  readonly windowPositionHandler: WindowPositionHandler
  readonly windowSizeHandler: WindowSizeHandler

  readonly listenEvents = ['activewindowv2']

  readonly hypr_home: string

  private onChangeWindow(signal: string, data: string) {
    const client = this.getClient(data)
    if (client) {
      this.windowPositionHandler.upsertRule(client)
      this.windowSizeHandler.upsertRule(client)
    }
  }

  private onCloseWindow(data: string) {
    this.windowPositionHandler.deleteRule(toAddress(data))
    this.windowSizeHandler.deleteRule(toAddress(data))
  }

  // maybe rewrite on socket like Hyprland Service do
  private getClient(data: string) {
    return (JSON.parse(bash(`hyprctl clients -j`)) as Client[]).find(
      (cl) => cl.address === toAddress(data),
    )
  }

  toGtk() {
    return Widget.Window({
      name: 'WindowListener',
      monitor: 0,
      visible: false,
      exclusivity: 'ignore',
      focusable: false,
    }).hook(
      hyprland,
      (self, ...args) => {
        if (args && this.listenEvents.includes(args[0] as string)) {
          this.onChangeWindow(args[0] as string, args[1] as string)
        } else if (args && args[0] === 'closewindow') {
          this.onCloseWindow(args[1] as string)
        }
      },
      'event',
    )
  }
}

export const windowListener = new WindowListener().toGtk()
