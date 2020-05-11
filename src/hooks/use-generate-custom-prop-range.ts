import { useContext, useMemo } from 'react'
import generateCustomPropRange from '../lib/generate-custom-prop-range'
import { CustomPropRangeDefinition, CssObject } from '../types'
import { MonsteraContext } from '../lib/config'

export default function useGenerateCustomPropRange (
  name: string,
  definitions: CustomPropRangeDefinition[]
) {
  const config = useContext(MonsteraContext)

  return useMemo<CssObject>(() => {
    return generateCustomPropRange(name, definitions, config.breakpoints)
  }, [name, definitions, config.breakpoints]) 
}
