import Dock from './components/dock/Dock'
import { applauncher } from './components/Example'
import Bar from './components/bar/Bar'

const css = `/tmp/ags/my-style.css`

App.config({
  // onConfigParsed: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  style: css,
  windows: [
    // applauncher,
    Dock(),
    Bar(),
  ],
})
