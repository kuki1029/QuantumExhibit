import {expect} from '@jest/globals';
import { rk4 as ode } from "./rk4";

const step = 0.05
const start = 0
const end = 2

const numberOfValues =((end - start) / step) + 1
// Create list of t values from 0 to 2 in steps of 0.05
const t = Array.from(Array(numberOfValues).keys()).map((i) => (i * step) + start)

// ==================== BEGIN EXPONENTIAL FUNCTION TESTING ====================
{
const y0 = 1
const t0 = 0
const odeClass = new ode(funcExp, y0, t0, step)
const analyticalY = returnSolvedList(solvedFuncExp, t)
const numericalPoints = odeClass.solve(y0, t0, step, end)
const numericalY = numericalPoints.map((i) => i[1])
const numericalTime = numericalPoints.map((i) => i[0])
test("Solve ode y'(t) = y", () => {
    expect(numericalY).toBeCloseDeepArray(analyticalY, 5);
});

test("Checking time values", () => {
    expect(t).toBeCloseDeepArray(numericalTime, 5);
});

// Get all steps until t=2
const points = [[start, y0]]
for (var i = 0; i < end; i += step) {
    points.push(odeClass.step())
}
const stepNumericalY = points.map((i) => i[1])
const stepNumericalTime = points.map((i) => i[0])
test("Solve ode y'(t) = y with step method", () => {
    expect(stepNumericalY).toBeCloseDeepArray(analyticalY, 5);
});

test("Checking time values from step method", () => {
    expect(t).toBeCloseDeepArray(stepNumericalTime, 5);
});

function funcExp(t, y) {
    return y
}

function solvedFuncExp(t) {
    return Math.exp(t)
}
}
// ==================== END ====================.

// ==================== BEGIN DIFFICULT FUNCTION TESTING ====================
{
const y0 = 1
const t0 = 0
const odeClass = new ode(funcDifficult, y0, t0, step)
const analyticalY = returnSolvedList(solvedFuncDifficult, t)
const numericalPoints = odeClass.solve(y0, t0, step, end)
const numericalY = numericalPoints.map((i) => i[1])
const numericalTime = numericalPoints.map((i) => i[0])
test("Solve ode y'(t) = y + 4sin(3t)", () => {
    expect(numericalY).toBeCloseDeepArray(analyticalY, 5);
});

test("Checking time values", () => {
    expect(t).toBeCloseDeepArray(numericalTime, 5);
});

// Get all steps until t=2
const points = [[start, y0]]
for (var i = 0; i < end; i += step) {
    points.push(odeClass.step())
}
const stepNumericalY = points.map((i) => i[1])
const stepNumericalTime = points.map((i) => i[0])
console.log(analyticalY)
console.log(stepNumericalY)
test("Solve ode y'(t) = y with step method", () => {
    expect(stepNumericalY).toBeCloseDeepArray(analyticalY, 5);
});

test("Checking time values from step method", () => {
    expect(t).toBeCloseDeepArray(stepNumericalTime, 5);
});


function funcDifficult(t, y) {
    return y + 4 * Math.sin(3 * t)
}

// Solution to above equation
function solvedFuncDifficult(t) {
    return (1/5) * (((2 * Math.exp(t)) * 
                    (-3*Math.exp(-t)*Math.cos(3*t) - Math.exp(-t)*Math.sin((3*t)))) + 
                    (11 * Math.exp(t)))
}
}
// ==================== END ====================


// ==================== GENERAL UTILITY FUNCTIONS ====================
// Takes in list of t values and func and returns a list of y values corresponding to t values
// Good if you want to get a list of y values from the solved func
// lop is list of points
function returnSolvedList(func, lop) {
    const res = []
    lop.forEach(elem => {
        res.push(func(elem))
    });
    return res
}

// Custom test function to extend Jest to allow us to deep test arrays
function toBeCloseDeepArray(actual, expected, precision) {
  if (typeof actual !== 'object') {
    throw new TypeError('The actual value must be an array!');
  }
  else if (typeof expected !== 'object') {
    throw new TypeError('The expected values must be an array!');
  }
  else if (typeof precision !== 'number') {
    throw new TypeError('The precision value has to be a number!')
  }
  else if (actual.length !== expected.length) {
    throw new TypeError('The length of actual and expected need to be equal. ')
  }
  else if (typeof actual[0] !== 'number') {
    throw new TypeError('The elements within the array must be numbers!')
  }

  // Do testing
  let pass = true
  for (var i = 0; i < actual.length; i++) {
    let expectedDiff = Math.pow(10, -precision) / 2;
    let receivedDiff = Math.abs(expected[i] - actual[i]);
    pass = receivedDiff < expectedDiff;
    if (!pass) break;
  }
  
  if (pass) {
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          `${actual[i]} at index ${i}`,
        )} not to be  ${this.utils.printExpected(
          expected[i],
        )}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          actual[i],
        )} to be ${this.utils.printExpected(
          expected[i],
        )}`,
      pass: false,
    };
  }
}

expect.extend({
    toBeCloseDeepArray,
});

// ==================== END ====================







