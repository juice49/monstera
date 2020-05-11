import { createContext } from 'react'
import { CssValue } from '../types'

export interface MonsteraConfig {
  breakpoints: CssValue[]
}

export const MonsteraContext = createContext<MonsteraConfig>({
  breakpoints: [
    [30, 'em'],
    [45, 'em'],
    [60, 'em']
  ]
})
