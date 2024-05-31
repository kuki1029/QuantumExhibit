import { addArrays } from "./odeUtility";

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

test("Array Addition 4", () => {
    expect([0]).toBeCloseDeepArray(addArrays(), 5);
});