import {expect} from '@jest/globals';
import { ForwardEuler as ode } from "./forwardEuler";

const step = 0.05
const start = 0
const end = 0.2
// Define this here as different methods have different precisions
// Zero implies a precision of 1. Forward Euler isn't too accurate so we need this.
const precision = 0

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
    expect(numericalY).toBeCloseDeepArray(analyticalY, precision);
});

test("Checking time values", () => {
    expect(t).toBeCloseDeepArray(numericalTime, precision);
});

// Get all steps until t=2
const points = [[start, y0]]
for (var i = 0; i < end; i += step) {
    points.push(odeClass.step())
}
const stepNumericalY = points.map((i) => i[1])
const stepNumericalTime = points.map((i) => i[0])
test("Solve ode y'(t) = y with step method", () => {
    expect(stepNumericalY).toBeCloseDeepArray(analyticalY, precision);
});

test("Checking time values from step method", () => {
    expect(t).toBeCloseDeepArray(stepNumericalTime,precision);
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
    expect(numericalY).toBeCloseDeepArray(analyticalY, precision);
});

test("Checking time values1", () => {
    expect(t).toBeCloseDeepArray(numericalTime, precision);
});

// Get all steps until t=2
const points = [[start, y0]]
for (var i = 0; i < end; i += step) {
    points.push(odeClass.step())
}
const stepNumericalY = points.map((i) => i[1])
const stepNumericalTime = points.map((i) => i[0])
test("Solve ode y'(t) = y with step method1", () => {
    expect(stepNumericalY).toBeCloseDeepArray(analyticalY, precision);
});

test("Checking time values from step method1", () => {
    expect(t).toBeCloseDeepArray(stepNumericalTime, precision);
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

// ==================== BEGIN DIFFICULT FUNCTION TESTING ====================
{
const y0 = 1
const x0 = 1
const t0 = 0
const odeClass = new ode([funcCoupledY, funcCoupledX], [y0, x0], t0, step)
const analyticalY = returnSolvedList(solvedCoupledExp, t)
const numericalPoints = odeClass.solve([y0, x0], t0, step, end)
const numericalY = numericalPoints.map(i => i[1]).map(i => i[0])
const numericalX = numericalPoints.map(i => i[1]).map(i => i[1])
const numericalTime = numericalPoints.map((i) => i[0])
test("Solve coupled ode. y'=x, x'=y. Testing x points", () => {
    expect(numericalY).toBeCloseDeepArray(analyticalY, precision);
});

test("Solve coupled ode. y'=x, x'=y. Testing Y points", () => {
    expect(numericalX).toBeCloseDeepArray(analyticalY, precision);
});

test("Checking time values 2", () => {
    expect(t).toBeCloseDeepArray(numericalTime, precision);
});

// Get all steps until t=2
const points = [[start, [x0, y0]]]
for (var i = 0; i < end; i += step) {
    points.push(odeClass.step())
}
const stepNumericalY = points.map((i) => i[1]).map(i => i[0])
const stepNumericalTime = points.map((i) => i[0])
test("Solve ode y'(t) = y with step method 2", () => {
    expect(stepNumericalY).toBeCloseDeepArray(analyticalY, precision);
});

test("Checking time values from step method 2", () => {
    expect(t).toBeCloseDeepArray(stepNumericalTime, precision);
});


function funcCoupledY(t, y) {
    return y[1]
}

function funcCoupledX(t, y) {
    return y[0]
}

// Solution to above equation
function solvedCoupledExp(t) {
    return Math.exp(t)
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
// ==================== END ====================







