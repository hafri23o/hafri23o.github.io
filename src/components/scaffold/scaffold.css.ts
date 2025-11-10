import { style } from '@vanilla-extract/css'
import { sprinkles } from '~/styles/styles.css'

export const container = style([
  sprinkles({
    surface: 'surface',
  }),
  style({
    contain: 'strict',
    gridArea: '1 / 1',
    minHeight: '100vh', //  let it expand vertically
    width: '100%',
    transformOrigin: 'center center',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `
      'top-bar top-bar'
      'nav-rail content'
      'bottom-bar bottom-bar'
    `,
    overflow: 'hidden', //  keep this if you only want inner scrolling (see below)
  }),
])

export const topBar = style({
  gridArea: 'top-bar',
  display: 'flex',
  flexDirection: 'column',
})

export const navRail = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gridArea: 'nav-rail',
})

export const bottomBar = style({
  gridArea: 'bottom-bar',
})

export const content = style({
  gridArea: 'content',
  flex: 1,
  overflowY: 'auto',   // allow vertical scrolling
  overflowX: 'hidden',
  display: 'block',    //  don't use flex here — flex containers don’t scroll easily
  height: 'auto',      //  let height grow
})
