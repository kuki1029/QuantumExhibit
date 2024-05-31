/**
 * Adds all arrays element wise. Arrays must be same length. 
 * @param {...number[]} llon List of list of number. Arrays of same length to add element wise
 * @returns {number[]} Returns a single array that contains the addition of all passed in arrays
 */
function addArrays(...llon) {
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

/**
 * Adds a scalar value to every element of the array. 
 * @param {number} scalar The number you want to add to every element of the array
 * @param {number[]} arr The array to which you want to add the scalar value to every element
 * @returns {number[]} Returns a single array with the scalar added to every element
 */
function addScalarToArray(scalar, arr) {
    if (typeof scalar !== 'number') {return new TypeError("Scalar needs to be a number.")}
    else if (typeof arr !== 'object') {return new TypeError("Arr needs to be an array of numbers")}

    const newArray = []
    arr.forEach(elem => newArray.push(elem + scalar))
    return newArray
}

/**
 * Multiply every element in the array by a scalar value. 
 * @param {number} scalar The number you want to multiply the array elements by
 * @param {number[]} arr The array for which you want every element to be multiplied by
 * @returns {number[]} Returns a single array with every element multipled by the scalar
 */
function multiplyArrayByScalar(scalar, arr) {
    if (typeof scalar !== 'number') {return new TypeError("Scalar needs to be a number.")}
    else if (typeof arr !== 'object') {return new TypeError("Arr needs to be an array of numbers")}

    const newArray = []
    arr.forEach(elem => newArray.push(elem * scalar))
    return newArray
}

/**
 * Divide every element in the array by a scalar value. 
 * @param {number} scalar The number you want to divide the array elements by
 * @param {number[]} arr The array for which you want every element to be divided by
 * @returns {number[]} Returns a single array with every element divided by the scalar
 */
function divideArrayByScalar(scalar, arr) {
    return multiplyArrayByScalar(1/scalar, arr)
}

/**
 * Given a list of func, the params will be applied to every func in the list. The return 
 * values will be returned in a list
 * @param {function[]} func List of functions that need to be called
 * @param {number[]} params The parameters that function takes in. They will be passed in separatly
 * Should be t, y values. 
 * @returns {number[]} Returns a single array with the result of every function call
 */
function applyParamsToAllFunc(func, ...params) {
    if (typeof func !== 'object') {return new TypeError("Func needs to be list of functions")}
    if (typeof func[0] !== 'function') {return new TypeError("Elements within func need to be function declarations")}

    const res = []
    func.forEach((elem, i) => {
        if (typeof params[0] === 'number') {
            res.push(elem.apply(null, params))
        } else {
            const newParams = [params[0][i], params[1]]
            res.push(elem.apply(null, newParams))
        }
    })
    return res
}

export {addArrays, 
        addScalarToArray, 
        multiplyArrayByScalar, 
        divideArrayByScalar,
        applyParamsToAllFunc, }