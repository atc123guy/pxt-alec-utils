// Sandbox project for alec-utils. Press A to negate a random number and show it.

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    const n = randint(1, 10)
    game.splash(n + "  ->  " + alecUtils.negative(n))
})
