# pxt-alec-utils

General-purpose utility blocks for MakeCode Arcade games.

## Blocks

- `alecUtils.createVector(x, y)` — returns a `Vector2` with the given components. Dropping this block auto-creates a `set [myVector] to ...` pattern.
- `alecUtils.getComponent(axis, vector)` — returns the x or y component of a vector, selected from a dropdown.
- `alecUtils.negative(value)` — returns the negation of a number. Reads as "negative `<value>`" in blocks, which is clearer than the standard "`<value>` × -1" math expression.

## Example

```typescript
let pos = alecUtils.createVector(50, 80)
let px = alecUtils.getComponent(alecUtils.Axis.X, pos)  // 50
let py = alecUtils.getComponent(alecUtils.Axis.Y, pos)  // 80

let score = 10
let penalty = alecUtils.negative(score)   // -10
```

## Use as Extension

Open https://arcade.makecode.com/, click the gear → **Extensions**, and paste:

```
https://github.com/atc123guy/pxt-alec-utils#v0.1.0
```

Always pin to a specific tag with `#vX.Y.Z` to avoid MakeCode's aggressive caching.

## Supported targets

- for PXT/arcade
