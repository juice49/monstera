import { CssValue } from '../types'

export default function cssValueToString(cssValue: CssValue): string {
  return cssValue.join('')
}
