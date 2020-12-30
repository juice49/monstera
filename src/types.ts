import { CSSObject } from 'styled-components'

export type CssObject = CSSObject
export type CssValue = [number, string]
export type Value = CssValue | string | number
export type AdaptiveValue = Value[]
export type Direction = 'top' | 'right' | 'bottom' | 'left'
export type CustomPropRangeDefinition = (CssValue | number)[] | number
export type Mixin<T> = (props: T) => CssObject

export interface Theme {
  breakpoints: CssValue[]
}
