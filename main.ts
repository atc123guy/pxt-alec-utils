/**
 * General-purpose utility blocks.
 */
//% color=#5C9C9C icon="" block="alec utils"
namespace alecUtils {

    export class Vector2 {
        public x: number
        public y: number
    }

    export enum Axis {
        //% block="x"
        X,
        //% block="y"
        Y
    }

    /**
     * Create a 2D vector with x and y components.
     */
    //% block="vector x $x y $y"
    //% blockSetVariable=myVector
    //% weight=100
    export function createVector(x: number, y: number): Vector2 {
        const v = new Vector2()
        v.x = x
        v.y = y
        return v
    }

    /**
     * Get the x or y component of a vector.
     */
    //% block="get $axis of $v"
    //% weight=95
    export function getComponent(axis: Axis, v: Vector2): number {
        if (!v) return 0
        if (axis === Axis.X) return v.x
        return v.y
    }

    /**
     * Returns the negative of a number. Reads as "negative <value>" in blocks
     * instead of the awkward "<value> * -1" math expression.
     */
    //% block="negative $value"
    //% weight=90
    export function negative(value: number): number {
        return -value
    }

    // ---------------------------------------------------------------------
    // State Machine
    // ---------------------------------------------------------------------

    //% shim=ENUM_GET
    //% blockId=alecutils_state_enum_shim
    //% block="$arg"
    //% enumName="StateKind"
    //% enumMemberName="state"
    //% enumPromptHint="e.g. Idle, Running, Jumping..."
    //% enumInitialMembers="Idle, Running"
    //% blockHidden=true
    export function _stateEnumShim(arg: number): number {
        return arg
    }

    let _currentState: number = -1
    let _stateEnteredAt: number = 0
    let _enterStates: number[] = []
    let _enterFns: (() => void)[] = []
    let _exitStates: number[] = []
    let _exitFns: (() => void)[] = []
    let _anyChangeFns: ((oldState: number, newState: number) => void)[] = []

    /**
     * Transition to a new state. Fires exit handlers for the old state,
     * then enter handlers for the new state, then any-change handlers.
     * Setting the same state is a no-op.
     */
    //% block="set state to $state"
    //% state.shadow="alecutils_state_enum_shim"
    //% weight=80
    //% group="State Machine"
    export function setState(state: number): void {
        if (state === _currentState) return
        const previous = _currentState
        if (previous !== -1) {
            for (let i = 0; i < _exitStates.length; i++) {
                if (_exitStates[i] === previous) _exitFns[i]()
            }
        }
        _currentState = state
        _stateEnteredAt = game.runtime()
        for (let i = 0; i < _enterStates.length; i++) {
            if (_enterStates[i] === state) _enterFns[i]()
        }
        for (let i = 0; i < _anyChangeFns.length; i++) {
            _anyChangeFns[i](previous, state)
        }
    }

    /**
     * Returns the current state value. Returns -1 before any state has been set.
     */
    //% block="current state"
    //% weight=75
    //% group="State Machine"
    export function currentState(): number {
        return _currentState
    }

    /**
     * True when the machine is currently in the given state.
     */
    //% block="state is $state"
    //% state.shadow="alecutils_state_enum_shim"
    //% weight=70
    //% group="State Machine"
    export function isInState(state: number): boolean {
        return _currentState === state
    }

    /**
     * Milliseconds since the current state was entered.
     * Returns 0 before any state has been set.
     */
    //% block="time in current state (ms)"
    //% weight=65
    //% group="State Machine"
    export function timeInCurrentState(): number {
        if (_currentState === -1) return 0
        return game.runtime() - _stateEnteredAt
    }

    /**
     * Run code when the given state is entered.
     */
    //% block="on state $state entered"
    //% state.shadow="alecutils_state_enum_shim"
    //% weight=60
    //% group="State Machine"
    export function onStateEntered(state: number, handler: () => void): void {
        _enterStates.push(state)
        _enterFns.push(handler)
    }

    /**
     * Run code when the given state is exited.
     */
    //% block="on state $state exited"
    //% state.shadow="alecutils_state_enum_shim"
    //% weight=55
    //% group="State Machine"
    export function onStateExited(state: number, handler: () => void): void {
        _exitStates.push(state)
        _exitFns.push(handler)
    }

    /**
     * Run code on any state transition. The handler receives the old and new state values.
     * On the very first transition, oldState is -1.
     */
    //% block="on any state change from $oldState to $newState"
    //% draggableParameters="reporter"
    //% weight=50
    //% group="State Machine"
    export function onAnyStateChange(handler: (oldState: number, newState: number) => void): void {
        _anyChangeFns.push(handler)
    }
}
