import { Application } from 'types/service/applications'

const hyprland = await Service.import('hyprland')
const applications = await Service.import('applications')

function AppItem(app: Application | undefined) {
  return Widget.Button({
    // on_clicked: () => {
    //   App.closeWindow(WINDOW_NAME)
    //   app.launch()
    // },
    attribute: { app },
    child: Widget.Icon({
      icon: app?.icon_name || '',
      size: 36,
    }),
  })
}

function DockWidget() {
  const apps = hyprland.bind('clients').as((cl) => {
    return cl
      .map((client) => applications.list.find((app) => app.match(client.class)))
      .filter((cl) => cl !== undefined)
      .map(AppItem)
  })

  return Widget.Box({
    vertical: true,
    className: 'dock-widget',
    children: apps,
  })
}

function MockLabel() {
  return Widget.Label({
    label: '',
  })
}

function getCenterWidget() {
  return Widget.Box({
    spacing: 8,
    vertical: false, // this must be false, otherwise no layout will be displayed
    children: [MockLabel(), DockWidget(), MockLabel()],
  })
}

function Dock(monitor = 0) {
  return Widget.Window({
    monitor,
    name: `dock-${monitor}`, // name has to be unique
    anchor: ['top', 'left', 'bottom'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
      vertical: true,
      centerWidget: getCenterWidget(),
    }),
    className: 'dock',
  })
}

export default Dock
