import { Value, AdaptiveValue, Mixin, Theme } from '../types'
import mapValue from '../lib/map-value'
import resolveValue from '../lib/resolve-value'

export interface Props {
  gap: Value | AdaptiveValue
  direction: 'inline' | 'block'
  theme: Theme
}

const properties = {
  inline: 'margin-left',
  block: 'margin-top',
}

const stack: Mixin<Props> = props => {
  const property = properties[props.direction]

  return mapValue(props.gap, props.theme.breakpoints, value => ({
    '> * + *': {
      [property]: resolveValue('space', value),
    },
  }))
}

export default stack
