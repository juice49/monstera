import { CssValue } from '../types'
import cssValueToString from '../lib/css-value-to-string'
import isCssValue from '../lib/is-css-value'

/**
 * Resolve Value
 * 
 * @param name - The base CSS custom property name.
 * @param value - A CSS value, or a value to map to a CSS custom property.
 * @return Value that can be inserted into CSS.
 */
// theme value tuple? ['space', 4]
export default function resolveValue (
  name: string,
  value: CssValue | number
): string | number {
  if (isCssValue(value)) {
    return cssValueToString(value)
  }

  if (value === 0) {
    return 0
  }

  return maybeNegative(`var(--${name}${Math.abs(value)})`, value)
}

/**
 * Maybe Negative
 * 
 * @param value - String containing a CSS value (e.g. `var(--space1)`).
 * @param numericValue - Numeric value represented by teh string (e.g. `1`).
 * @return The value wrapped in a CSS `calc()` call to make it negative, or the original value.
 */
function maybeNegative (
  value: string,
  numericValue: number
): string {
  return numericValue < 0
    ? `calc(${value} * -1)`
    : value
}
