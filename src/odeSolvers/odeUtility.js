import { testImageFormat } from "pixi.js";

/**
 * Adds all arrays element wise. Arrays must be same length. 
 * @param {...number[]} llon List of list of number. Arrays of same length to add element wise
 * @returns {number[]} Returns a single array that contains the addition of all passed in arrays
 */
function addArrays(...llon) { //TODO: Add type checking
    // Check if all arrays are same length
    if (llon.length === 0) {
        return [0]
    }
    const length = llon[0].length

    const totalSum = new Array(llon[0].length).fill(0);
    for (let i = 0; i < llon.length; i++) {
        // Throw error for common misuse cases
        if ((llon[i].length) !== length) {throw new RangeError("Array lengths do not match.")}
        if ((typeof llon[i]) !== 'object') {throw new TypeError("All element in the passed in list need to be arrays")}
        
        for (let j = 0; j < llon[0].length; j++) {
            totalSum[j] += llon[i][j]
        }
    }
    return totalSum
}

export { addArrays }