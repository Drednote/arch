const entry = App.configDir + '/ts/src/main.ts'
const outdir = '/tmp/ags'

// main scss file
const scss = `${App.configDir}/ts/src/main.scss`

// target css file
const css = `/tmp/ags/my-style.css`

try {
  await Utils.execAsync(`mkdir -p ${outdir}`)

  // make sure sassc is installed on your system
  await Utils.execAsync(`sassc ${scss} ${css}`)

  await Utils.execAsync([
    'bun', 'build', entry,
    '--outdir', outdir,
    '--external', 'resource://*',
    '--external', 'gi://*'
  ])
  await import(`file://${outdir}/main.js`)
} catch (error) {
  console.error(error)
}

export {}