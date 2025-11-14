import { vars } from './vars.css'
import { sprinkles } from './sprinkles.css'
import * as _shared from './shared.css'

// Explicitly assign to constants (avoids any re-export shorthand that could create getter proxies)
export const sharedStyles = _shared
export const exportedVars = vars
export const exportedSprinkles = sprinkles
