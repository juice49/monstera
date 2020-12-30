import { Value, AdaptiveValue, CssValue, CssObject } from '../types'
import isCssValue from './is-css-value'
import cssValueToString from './css-value-to-string'

export default function mapValue(
  value: Value | AdaptiveValue,
  breakpoints: CssValue[],
  mapper: (value: CssValue | number) => CssObject,
  initialValue: CssObject = {},
): CssObject {
  if (isCssValue(value)) {
    const styles = mapper(value)

    return {
      ...initialValue,
      ...styles,
    }
  }

  return [].concat(value).reduce((reduced, unwrappedValue, index) => {
    const styles = mapper(unwrappedValue)

    return breakpoint(breakpoints[index - 1], styles, reduced)
  }, initialValue)
}

function breakpoint(
  breakpoint: CssValue | undefined,
  styles: CssObject,
  initialValue: CssObject = {},
): CssObject {
  if (typeof breakpoint === 'undefined') {
    return {
      ...initialValue,
      ...styles,
    }
  }

  const bpKey = `@media (min-width: ${cssValueToString(breakpoint)})`
  const nextValue: CssObject = { ...initialValue }

  if (typeof nextValue[bpKey] === 'undefined') {
    nextValue[bpKey] = {}
  }

  nextValue[bpKey] = {
    ...(nextValue[bpKey] as CssObject),
    ...styles,
  }

  return nextValue
}
