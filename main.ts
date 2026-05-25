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
}
