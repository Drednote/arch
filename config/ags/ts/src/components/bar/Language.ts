import { bash } from '../../utils/shell-utils'

const hyprland = await Service.import('hyprland')

const mappingCodes = {
  'English (US)': 'US',
  English: 'EN',
  Russian: 'RU',
}

function getLangCode(lang: string | undefined) {
  if (!lang) {
    return ''
  }
  const langCode = Object.entries(mappingCodes).find(([key, value]) => {
    if (lang.includes(key)) {
      return value
    }
  })
  return langCode ? langCode[1] : 'Unknown lang'
}

function Language() {
  // hyprland.connect('keyboard-layout', (_, ...args) => {
  //   console.log('args -> ', args)
  // })
  const lang = bash('$HYPR_CONFIG_HOME/scripts/lang get --layout')

  const code = getLangCode(lang)

  return Widget.Button({
    onClicked: () => bash('$HYPR_CONFIG_HOME/scripts/lang change'),
    child: Widget.Label({
      class_name: 'lang',
      setup: (self) =>
        self.hook(
          hyprland,
          (self, ...args) => {
            // there can be other arguments based on signals
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            self.label = getLangCode(args[1]) || code
          },
          'keyboard-layout',
        ),
    }),
  })
}

export default Language
