# pxt-alec-utils

General-purpose utility blocks for MakeCode Arcade games.

## Blocks

### Vectors & math

- `alecUtils.createVector(x, y)` — returns a `Vector2` with the given components. Dropping this block auto-creates a `set [myVector] to ...` pattern.
- `alecUtils.getComponent(axis, vector)` — returns the x or y component of a vector, selected from a dropdown.
- `alecUtils.negative(value)` — returns the negation of a number. Reads as "negative `<value>`" in blocks, which is clearer than the standard "`<value>` × -1" math expression.

### State Machine

Single global state machine for the whole project. States are defined dynamically — every state-taking block has a dropdown showing the states you've created so far, plus a **+ Create new...** option to add more.

- `alecUtils.setState(state)` — transition to a new state. Fires the exit handlers for the old state, then the enter handlers for the new state, then any any-change handlers. Setting the same state is a no-op.
- `alecUtils.currentState()` — returns the current state value (or `-1` before any state has been set).
- `alecUtils.isInState(state)` — boolean, true while the machine is in this state. Useful inside `if` blocks and update loops.
- `alecUtils.timeInCurrentState()` — milliseconds since the current state was entered. Great for time-based transitions like "after 2s in idle, wander."
- `alecUtils.onStateEntered(state, handler)` — runs when the machine enters this state.
- `alecUtils.onStateExited(state, handler)` — runs when the machine leaves this state.
- `alecUtils.onUpdateInState(state, handler)` — runs every frame, but only while the machine is in this state. State-scoped equivalent of `game.onUpdate`. Useful for movement, animation, AI ticks, and anything else that should pause when the state changes.
- `alecUtils.onAnyStateChange(handler)` — runs on every transition. Handler receives `oldState` and `newState` as draggable reporter arguments. On the first transition `oldState` is `-1`.

## Example

```typescript
let pos = alecUtils.createVector(50, 80)
let px = alecUtils.getComponent(alecUtils.Axis.X, pos)  // 50
let py = alecUtils.getComponent(alecUtils.Axis.Y, pos)  // 80

let score = 10
let penalty = alecUtils.negative(score)   // -10
```

### State machine example

In your project, drop the `set state to [▾]` block in `on start` and click the dropdown to create states like "Idle" and "Running". Then:

```typescript
alecUtils.onStateEntered(StateKind.Running, function () {
    game.splash("running!")
})

alecUtils.onStateExited(StateKind.Idle, function () {
    // tidy up idle-only effects
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    alecUtils.setState(StateKind.Running)
})

// Cleaner per-state update: only runs while in Running:
alecUtils.onUpdateInState(StateKind.Running, function () {
    player.vx = 60   // move every frame while running
})

// Time-based transition:
alecUtils.onUpdateInState(StateKind.Idle, function () {
    if (alecUtils.timeInCurrentState() > 2000) {
        alecUtils.setState(StateKind.Running)
    }
})
```

## Use as Extension

Open https://arcade.makecode.com/, click the gear → **Extensions**, and paste:

```
https://github.com/atc123guy/pxt-alec-utils#v0.3.0
```

Always pin to a specific tag with `#vX.Y.Z` to avoid MakeCode's aggressive caching.

## Supported targets

- for PXT/arcade
