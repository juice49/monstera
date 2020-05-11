import { CssValue, CssObject, CustomPropRangeDefinition } from '../types'
import cssValueToString from './css-value-to-string'
import mapWithPrevious from './map-with-previous'

export default function generateCustomPropRange (
  name: string,
  definitions: CustomPropRangeDefinition[],
  breakpoints: CssValue[]
): CssObject {
  const values = mapWithPrevious<CustomPropRangeDefinition, CssValue[]>((previous, definition) => {
    if (Array.isArray(definition)) {
      return transformDefinition(definition)
    }

    const transformedDefinition = previous[previous.length - 1]
      .map(([value, unit]): CssValue => [value * definition, unit])

    return transformDefinition(transformedDefinition)
  }, definitions)

  return values.reduce<any>((reduced, definition, index) => {
    const breakpoint = breakpoints[index - 1]
    const rules = definitionToRules(definition, name)

    if (breakpoint) {
      return {
        ...reduced,
        [`@media (min-width: ${cssValueToString(breakpoint)})`]: {
          ...rules
        }
      }
    }

    if (index === 0) {
      return {
        ...reduced,
        ...rules
      }
    }
  }, {})
}

function definitionToRules (definition: CssValue[], name: string): CssObject {
  return definition.reduce((reduced, value: CssValue, index) => {
    const customPropertyName = name + (index + 1)

    return {
      ...reduced,
      [`--${customPropertyName}`]: cssValueToString(value)
    }
  }, {})
}

function transformDefinition (definition: (CssValue | number)[]) {
  return mapWithPrevious<CssValue | number, CssValue>((previous, value) => {
    if (Array.isArray(value)) {
      return value
    }

    const [previousValue, unit] = previous[previous.length - 1]
    return [previousValue * value, unit]
  }, definition)
}
