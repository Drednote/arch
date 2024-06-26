import Language from './Language'

const hyprland = await Service.import('hyprland')
const notifications = await Service.import('notifications')
const audio = await Service.import('audio')

const date = Variable('', {
  poll: [1000, 'date "+%H:%M:%S %b %e."'],
})

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it

function Workspaces() {
  const activeId = hyprland.active.workspace.bind('id')
  const workspaces = hyprland.bind('workspaces').as((ws) =>
    ws.map(({ id }) =>
      Widget.Button({
        on_clicked: () =>
          void hyprland.messageAsync(`dispatch workspace ${id}`),
        child: Widget.Label(`${id}`),
        class_name: activeId.as((i) => `${i === id ? 'focused' : ''}`),
      }),
    ),
  )

  return Widget.Box({
    class_name: 'workspaces',
    children: workspaces,
  })
}

function ClientTitle() {
  return Widget.Label({
    class_name: 'client-title',
    label: hyprland.active.client.bind('title'),
  })
}

function Clock() {
  return Widget.Label({
    class_name: 'clock',
    label: date.bind(),
  })
}

// we don't need dunst or any other notification daemon
// because the Notifications module is a notification daemon itself
function Notification() {
  const popups = notifications.bind('popups')
  return Widget.Box({
    class_name: 'notification',
    visible: popups.as((p) => p.length > 0),
    children: [
      Widget.Icon({
        icon: 'preferences-system-notifications-symbolic',
      }),
      Widget.Label({
        label: popups.as((p) => p[0]?.summary || ''),
      }),
    ],
  })
}

function Volume() {
  const icons = {
    101: 'overamplified',
    67: 'high',
    34: 'medium',
    1: 'low',
    0: 'muted',
  }

  function getIcon() {
    const icon = audio.speaker.is_muted
      ? 0
      : [101, 67, 34, 1, 0].find(
          (threshold) => threshold <= audio.speaker.volume * 100,
        )

    return `audio-volume-${icons[icon]}-symbolic`
  }

  const icon = Widget.Icon({
    icon: Utils.watch(getIcon(), audio.speaker, getIcon),
  })

  const slider = Widget.Slider({
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => (audio.speaker.volume = value),
    setup: (self) =>
      self.hook(audio.speaker, () => {
        self.value = audio.speaker.volume || 0
      }),
  })

  return Widget.Box({
    class_name: 'volume',
    css: 'min-width: 180px',
    children: [icon, slider],
  })
}

// layout of the bar
function Left() {
  return Widget.Box({
    spacing: 8,
    children: [Workspaces(), ClientTitle()],
  })
}

function Center() {
  return Widget.Box({
    spacing: 8,
    children: [Notification()],
  })
}

function Right() {
  return Widget.Box({
    hpack: 'end',
    spacing: 8,
    children: [Language(), Volume(), Clock()],
  })
}

function Bar(monitor = 0) {
  return Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: 'bar',
    monitor,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  })
}

export default Bar
