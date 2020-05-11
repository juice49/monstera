# Monstera

Monstera is a CSS-in-JS helper library. I created it because I really like
Styled System, but I also really like CSS Custom Properties.

## Config

### Breakpoints

Monstera is designed to use CSS Custom Properties instead of a JavaScript theme
object.

Media query breakpoints cannot be stored in Custom Properties. Hopefully [CSS
Environment Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
will provide a way to store breakpoints in CSS.

For now, Monstera exposes a React context that can be used to define breakpoints.

```ts
import React from 'react'
import { MonsteraContext, MonsteraConfig } from 'monstera'

const monsteraConfig: MonsteraConfig = {
  breakpoints: [
    [30, 'em'],
    [45, 'em'],
    [60, 'em']
  ]
}

const App: React.FC = () => (
  <MonsteraContext.Provider value={monsteraConfig}>
    <p>The ringing in my ears is from another life.</p>
  </MonsterContext.Provider>
)
```

### CSS Custom Properties

#### Space

Define a space range using `--spaceN` Custom Properties. For example:

```ts
:root {
  --space1: 1rem;
  --space2: 1.5rem;
  --space3: 2.5rem;
}
```

## Utilities

## Mixins

## Todo

- Test Monstera with zero-runtime CSS-in-JS libraries, such as
[Linaria](https://linaria.now.sh).
