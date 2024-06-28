import {addArrays, 
        addScalarToArray, 
        multiplyArrayByScalar, 
        divideArrayByScalar, 
        applyParamsToAllFunc } from "./odeUtility";

// Test simple 1-length array addition
let actualRes = [6]
let computedRes = addArrays([1], [1], [1], [1], [1], [1])

test("Array Addition 1", () => {
    expect(actualRes).toBeCloseDeepArray(computedRes, 5);
});

test("Array Addition 2", () => {
    expect([4, 8, 12]).toBeCloseDeepArray(addArrays([1,2,3], [1,2,3], [1,2,3], [1,2,3]), 5);
});

test("Array Addition 3", () => {
    expect([2, 4, 6]).toBeCloseDeepArray(addArrays([1,2,3], [1,2,3]), 5);
});

test("Array Addition 4", () => {
    expect([2]).toBeCloseDeepArray(addArrays([2]), 5);
});

test("Array Addition 5", () => {
    expect([0]).toBeCloseDeepArray(addArrays(), 5);
});

test("Array AddScalar 1", () => {
    expect([1,1,1,1]).toBeCloseDeepArray(addScalarToArray(1, [0,0,0,0]), 5);
});

test("Array AddScalar 2", () => {
    expect([2,3,4,5]).toBeCloseDeepArray(addScalarToArray(1, [1,2,3,4]), 5);
});

test("Array AddScalar 3", () => {
    expect([-4]).toBeCloseDeepArray(addScalarToArray(-5, [1]), 5);
});

test("Array AddScalar 4", () => {
    expect([1,2,3,4]).toBeCloseDeepArray(addScalarToArray(0, [1,2,3,4]), 5);
});

test("Array MultiplyScalar 1", () => {
    expect([0,0,0,0]).toBeCloseDeepArray(multiplyArrayByScalar(0, [1,2,3,4]), 5);
});

test("Array MultiplyScalar 2", () => {
    expect([5,10,15,20]).toBeCloseDeepArray(multiplyArrayByScalar(5, [1,2,3,4]), 5);
});

test("Array DivideScalar 1", () => {
    expect([1/5,2/5,3/5,4/5]).toBeCloseDeepArray(divideArrayByScalar(5, [1,2,3,4]), 5);
});

test("Array ApplyFunc 1", () => {
    expect([5]).toBeCloseDeepArray(applyParamsToAllFunc([(t, y) => {return 5}], 1, 2), 5);
});

const func1 = (t, y) => {return t + y}
const func2 = (t, y) => {return 2 * t}
const func3 = (t, y) => {return y + 6}

test("Array ApplyFunc 2", () => {
    expect([10, 8, 12]).toBeCloseDeepArray(applyParamsToAllFunc([func1, func2, func3], 4, 6), 5);
});

const func4 = (t, y) => {return t + y[0]}
const func5 = (t, y) => {return 2 * t}
const func6 = (t, y) => {return y[1] + 6}

test("Array ApplyFunc 3", () => {
    expect([2, 2, 8]).toBeCloseDeepArray(applyParamsToAllFunc([func4, func5, func6], 1,  [1,2,3]), 5);
});

test("Array ApplyFunc 4", () => {
    expect([11]).toBeCloseDeepArray(applyParamsToAllFunc([func3], 3, 5), 5);
});

const func7 = (t, y) => {return y}
test("Array ApplyFunc 5", () => {
    expect([5]).toBeCloseDeepArray(applyParamsToAllFunc([func7], 3, 5), 5);
});

const func8 = (t, y) => {return y[0]}
test("Array ApplyFunc 6", () => {
    expect([5]).toBeCloseDeepArray(applyParamsToAllFunc([func8], 3, [5, 4]), 5);
});