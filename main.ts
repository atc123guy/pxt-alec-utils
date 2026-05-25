/**
 * General-purpose utility blocks.
 */
//% color=#5C9C9C icon="" block="alec utils"
namespace alecUtils {
    /**
     * Returns the negative of a number. Reads as "negative <value>" in blocks
     * instead of the awkward "<value> * -1" math expression.
     */
    //% block="negative $value"
    //% weight=100
    export function negative(value: number): number {
        return -value
    }
}
