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
