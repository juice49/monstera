import { CssValue } from '../types'

export default function isCssValue (value: any): value is CssValue {
  return Array.isArray(value)
    && value.length === 2
    && typeof value[0] === 'number'
    && typeof value[1] === 'string'
}
