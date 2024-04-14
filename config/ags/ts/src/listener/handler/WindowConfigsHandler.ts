import { Client } from 'types/service/hyprland'
import { bash } from '../../utils/shell-utils'
import { Position, Rule } from './types'
import { Source } from 'types/@girs/glib-2.0/glib-2.0.cjs'

const hyprland = await Service.import('hyprland')

const warningText =
  '# THIS IS AUTO GENERATED FILE\n# DO NOT MODIFY THIS FILE MANUALLY\n'

export abstract class WindowConfigsHandler {
  protected constructor(filePath: string) {
    this.filePath = filePath

    bash(`touch -a ${filePath}`)

    this.parse(Utils.readFile(filePath))
  }

  private readonly filePath: string
  private dumpTimeout: Source | undefined = undefined

  protected rules: Rule[] = []

  protected abstract parseAction(action: string): [string, Position | undefined]

  protected abstract handleUpdate(rule: Rule, client: Client): boolean

  protected abstract getForInsert(client: Client): Rule

  protected abstract mapToLine(rule: Rule): string

  private parse(file: string) {
    file.split('\n').forEach((line) => {
      if (line && !line.startsWith('#')) {
        try {
          const [data, address] = line.split('#')
          const [rule, classifier] = data.split(',')
          const [, clazz] = classifier.split(':')
          const [key, action] = rule.split('=')
          const [ruleText, coordinates] = this.parseAction(action.trim())

          this.rules.push({
            rule: ruleText.trim(),
            address: hyprland.getClient(address) ? address.trim() : undefined,
            class: clazz.trim(),
            key: key.trim(),
            coordinates,
          })
        } catch (e) {
          console.error(e)
        }
      }
    })
    this.deleteExtraLines()
    this.logRules()
  }

  private logRules() {
    this.rules.forEach((rl, index) => console.log(index, ' -> ', rl))
  }

  private deleteExtraLines() {
    if (this.rules.length === 0) return
    const groupedByClass: { [key: Rule['class']]: Rule[] } = this.rules.reduce(
      (prev, rule) => {
        let prevElement: Rule[] | undefined = prev[rule.class]
        if (!prevElement) {
          prevElement = []
        }
        return { ...prev, [rule.class]: [...prevElement, rule] }
      },
      {} as { [key: Rule['class']]: Rule[] },
    )

    const result: Rule[] = []
    Object.keys(groupedByClass).forEach((classKey) => {
      const rulesForClass = groupedByClass[classKey]
      let lastWithUndefined: Rule = undefined
      let indexLastWithUndefined: number = undefined
      rulesForClass.forEach((value, index) => {
        if (value.address === undefined) {
          lastWithUndefined = value
          indexLastWithUndefined = index
        } else result.push(value)
      })
      if (lastWithUndefined) {
        result.splice(indexLastWithUndefined, 0, lastWithUndefined)
      }
    })

    this.rules = result
  }

  private doDump() {
    this.deleteExtraLines()
    if (this.dumpTimeout) {
      clearTimeout(this.dumpTimeout)
    }
    this.dumpTimeout = setTimeout(() => {
      const content = Object.values(this.rules).reduce((prev, cur) => {
        return prev + this.mapToLine(cur) + '\n'
      }, warningText)
      Utils.writeFile(content, this.filePath)
        //bashAsync(`echo "${content}" | tee ${this.filePath}`)
        .then(() => {
          // console.log('dumped')
        })
        .catch((err) => console.log('cannot dump window configs -> ', err))
    }, 1)
  }

  private getRule(address: string, clazz: string) {
    // console.log('this.rules get -> ', this.rules)
    let rule: Rule | undefined = this.rules.find((r) => r.address === address)
    // if (!rule) {
    //   rule = Object.values(this.rules).findLast((rule) => rule.class === clazz)
    // }
    return rule
  }

  upsertRule(client: Client) {
    // console.log('update -> ', client.address)
    const { address, class: clazz } = client
    const rule = this.getRule(address, clazz)
    let doDump: boolean
    if (!rule) {
      const forInsert = this.getForInsert(client)
      this.rules.push(forInsert)
      doDump = true
    } else {
      doDump = this.handleUpdate(rule, client)
      if (doDump)
        this.rules.push(this.rules.splice(this.rules.indexOf(rule), 1)[0])
    }
    // console.log('doDump -> ', doDump)
    if (doDump) this.doDump()
  }

  deleteRule(address: string) {
    // console.log('delete -> ', address)
    const index = this.rules.findIndex((r) => r.address === address)
    const rule = this.rules[index]
    const lastIndex = this.rules.findLastIndex((r) => r.class === rule.class)
    if (index >= lastIndex) {
      rule.address = undefined
    } else {
      this.rules.splice(index, 1)
    }
    this.doDump()
  }
}
