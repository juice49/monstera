import upperFirst from 'lodash.upperfirst'
import { Value, AdaptiveValue, Direction, CssValue, Mixin, CssObject, Theme } from '../types'
import mapValue from '../lib/map-value'
import resolveValue from '../lib/resolve-value'

type Property = 'margin' | 'padding'

type Combination = 
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'margin'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'm'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
  | 'padding'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'p'

interface Props extends Partial<Record<Combination, AdaptiveValue>> {
  theme: Theme
}

type Definition<T> = [string, T[]]
type PropertyDefinition = Definition<Property>
type DirectionDefinition = Definition<Direction>

const properties: (PropertyDefinition | Property)[] = [
  'margin',
  'padding',
  ['m', ['margin']],
  ['p', ['padding']]
]

const directions: (DirectionDefinition | Direction)[] = [
  'top',
  'right',
  'bottom',
  'left',
  ['t', ['top']],
  ['r', ['right']],
  ['b', ['bottom']],
  ['l', ['left']],
  ['x', ['left', 'right']],
  ['y', ['top', 'bottom']]
]

type Getters = Partial<Record<Combination, (value: any) => CssObject>>

function generateGetters (
  properties: (PropertyDefinition | Property)[],
  directions: (DirectionDefinition | Direction)[]
): Getters {
  const getters = {}

  properties.forEach(property => {
    const [propertyName, propertyValue] = makeDefinition<Property>(property)
    const getter = applyProperty(propertyValue[0])

    getters[propertyName] = getter(['top', 'right', 'bottom', 'left'])

    directions.forEach(direction => {
      const [directionName, directionValue] = makeDefinition<Direction>(direction)
      const short = [...propertyName, ...directionName].length === 2
      
      const maybeUpperFirst: (string: String) => string = short
        ? string => string
        : upperFirst

      const propName = [propertyName, maybeUpperFirst(directionName)].join('')
      getters[propName] = getter(directionValue)
    })
  })

  return getters
}

function isDefinition<T> (definition: any): definition is Definition<T> {
  return Array.isArray(definition) && Array.isArray(definition[1])
}

function makeDefinition<T> (
  definition: T | Definition<T>,
): Definition<T> {
  if (isDefinition<T>(definition)) {
    return definition
  }

  return ['' + definition, [definition]]
}

const getters = generateGetters(properties, directions)

const space: Mixin<Props> = props => {
  return Object.entries(props).reduce((reduced, [propName, prop]) => {
    const getter = getters[propName]

    if (typeof getter !== 'function') {
      return reduced
    }

    return {
      ...reduced,
      ...getter(prop, props.theme.breakpoints)
    }
  }, {})
}

export default space

function applyProperty (property: Property) {
  return function (directions: Direction[]) {
    return function (
      value: Value | AdaptiveValue,
      breakpoints: CssValue[]
    ): CssObject {
      return directions.reduce((styles, direction) => {
        const key = [property, direction]
          .filter(part => typeof part !== 'undefined')
          .join('-')

        return mapValue(
          value,
          breakpoints,
          // (value: CssValue | number) => [key, resolveValue('space', value)],
          (value: CssValue | number) => ({
            [key]: resolveValue('space', value)
          }),
          styles
        )
      }, {})
    }
  }
}
