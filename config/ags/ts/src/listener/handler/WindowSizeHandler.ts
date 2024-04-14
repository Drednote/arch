import { Client } from 'types/service/hyprland'
import { Position, Rule } from './types'
import { WindowConfigsHandler } from './WindowConfigsHandler'

export class WindowSizeHandler extends WindowConfigsHandler {
  constructor(filePath: string) {
    super(filePath)
  }

  protected getForInsert(client: Client): Rule {
    const [x, y] = client.size
    return {
      address: client.address,
      class: client.class,
      key: 'windowrulev2',
      rule: 'size',
      coordinates: { x, y },
    }
  }

  protected handleUpdate(rule: Rule, client: Client): boolean {
    const [x, y] = client.size
    const { coordinates } = rule
    if (coordinates) {
      const { x: oldX, y: oldY } = coordinates
      if (x !== oldX || y !== oldY) {
        coordinates.x = x
        coordinates.y = y
        return true
      }
    }
    return false
  }

  protected mapToLine(rule: Rule): string {
    let content = `${rule.key}=size ${rule.coordinates?.x} ${rule.coordinates?.y},class:${rule.class}`
    if (rule.address) {
      content += `#${rule.address}`
    }
    return content
  }

  protected parseAction(action: string): [string, Position | undefined] {
    const split = action.split(' ')
    return [split[0], { x: split[1], y: split[2] }]
  }
}
