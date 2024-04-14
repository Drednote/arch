export type Position = {
  x: number | string
  y: number | string
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type RuleText = 'move' | 'size' | string

export interface Rule {
  address: string | undefined
  rule: RuleText
  class: string
  key: string // 'windowrule' | 'windowrulev2'
  coordinates?: Position
}
