import Dock from './components/dock/Dock'
import Bar from './components/bar/Bar'
import { windowListener } from './listener/WindowListener'

const css = `/tmp/ags/my-style.css`

App.config({
  // onConfigParsed: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  style: css,
  windows: [
    // applauncher,
    windowListener,
    Dock(),
    Bar(),
  ],
})
