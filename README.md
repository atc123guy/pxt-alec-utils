# pxt-alec-utils

General-purpose utility blocks for MakeCode Arcade games.

## Blocks

- `alecUtils.negative(value)` — returns the negation of a number. Reads as "negative `<value>`" in blocks, which is clearer than the standard "`<value>` × -1" math expression.

## Example

```typescript
let score = 10
let penalty = alecUtils.negative(score)   // -10
```

## Use as Extension

Open https://arcade.makecode.com/, click the gear → **Extensions**, and paste:

```
https://github.com/atc123guy/pxt-alec-utils#v0.0.1
```

Always pin to a specific tag with `#vX.Y.Z` to avoid MakeCode's aggressive caching.

## Supported targets

- for PXT/arcade
