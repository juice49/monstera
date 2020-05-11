import { useContext } from 'react'
import { Value, AdaptiveValue, Mixin } from '../types'
import mapValue from '../lib/map-value'
import resolveValue from '../lib/resolve-value'
import { MonsteraContext } from '../lib/config'

export interface Props {
  gap: Value | AdaptiveValue,
  direction: 'inline' | 'block'
}

const properties = {
  inline: 'margin-left',
  block: 'margin-top'
}

const stack: Mixin<Props> = props => {
  const config = useContext(MonsteraContext)
  const property = properties[props.direction]

  return mapValue(
    props.gap,
    config.breakpoints,
    value => ({
      '> * + *': {
        [property]: resolveValue('space', value)
      }
    })
  )
}

export default stack
