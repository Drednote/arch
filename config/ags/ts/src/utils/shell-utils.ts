/**
 * @returns execAsync(["bash", "-c", cmd])
 */
export async function bashAsync(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  const cmd =
    typeof strings === 'string'
      ? strings
      : strings.flatMap((str, i) => str + `${values[i] ?? ''}`).join('')

  return Utils.execAsync(['bash', '-c', cmd]).catch((err) => {
    console.error(cmd, err)
    return ''
  })
}

export function bash(cmd: string) {
  try {
    return Utils.exec(`bash -c "${cmd}"`)
  } catch (e) {
    console.error(cmd, e)
    return ''
  }
}

/**
 * @returns execAsync(cmd)
 */
export async function shAsync(cmd: string | string[]) {
  return Utils.execAsync(cmd).catch((err) => {
    console.error(typeof cmd === 'string' ? cmd : cmd.join(' '), err)
    return ''
  })
}
