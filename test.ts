// Sandbox project for alec-utils.
// A: negate a random number.
// B: create a random vector and splash its x/y components.

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    const n = randint(1, 10)
    game.splash(n + "  ->  " + alecUtils.negative(n))
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    const v = alecUtils.createVector(randint(0, 100), randint(0, 100))
    game.splash(
        "x=" + alecUtils.getComponent(alecUtils.Axis.X, v) +
        ", y=" + alecUtils.getComponent(alecUtils.Axis.Y, v)
    )
})

// State machine demo. Up=Idle, Down=Running.
// Literal numbers because StateKind enum members only materialize in user projects via the dropdown.
const IDLE = 0
const RUNNING = 1

alecUtils.onStateEntered(IDLE, function () {
    game.splash("entered idle")
})

alecUtils.onStateEntered(RUNNING, function () {
    game.splash("entered running")
})

alecUtils.onAnyStateChange(function (oldState, newState) {
    console.log("transition " + oldState + " -> " + newState)
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    alecUtils.setState(IDLE)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    alecUtils.setState(RUNNING)
})
