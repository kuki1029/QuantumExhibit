import {
    addArrays, 
    multiplyArrayByScalar, 
    applyParamsToAllFunc } from "./odeUtility";

/** Class implements a generic differential solver class that
 * can be extended for specific ode solving methods. The default is rk4 but can be
 * changed from Child class
*/
export class DifferentialSolver {
    /**
     * Creates a differential solver with given initial conditions. IC's can be changed
     * later on along with any other parameters. If func takes in vector variables,
     * the initial conditions must also be vectors. Func input params must match
     * initial conditions
     * @param {function(t, y) | function(t, [y])[]} func - Function that takes in parameters in format f(t, y) where y is a scalar or vector
     * @param {number | number[]} y0 - The initial condition y value
     * @param {number} t0 - The intial time value. Always scalar.
     * @param {number} h - Stepsize. Always scalar. 
    */
    constructor(func, y0, t0, h) {
        // Check if array or not
        if (Array.isArray(func)) {
            this.isArray = true
            if (!Array.isArray(y0)) {
                throw new TypeError("ERROR: Func and initial valyes, y0, must both be arrays or be scalar.")
            }
        } else {
            this.isArray = false
            if (Array.isArray(y0)) {
                throw new TypeError("ERROR: Func and initial valyes, y0, must both be arrays or be scalar.")
            }
        }
        Object.assign(this, { func, y0, t0, h })
        this.y = y0
        this.t = t0
    }

    /**
     * Does one step of the differential solver. Makes use of the class variables 
     * @returns {[number, number | number[]]} Returns y_{n+1} and t_{n+1} as a list [t, y]
     */
    step() {
        if (this.isArray) {
            this.y = addArrays(this.y, this.odeMethodVector(this.t, this.y, this.h))
        } else {
            this.y += this.odeMethodScalar(this.t, this.y, this.h)
        }
        this.t += this.h
        return [this.t, this.y]
    }

    /**
     * Provides the solved function y(t) between t0 and a final t value.
     * Does not use the class' variables and need to supply your own. This is to allow
     * one to solve the function without messing up the gradual stepping required for animations.
     * Just uses the function provided to class. 
     * @param {number | number[]} y0 - The initial condition y value. If list of params, func must be able to handle that
     * @param {number} t0 - The intial time value
     * @param {number} h - Stepsize
     * @param {number} tf - Final t value for the returned y(t) function
     * @returns {[number, number][] | [number[], number[]][]} - Returns a list of t and y points of the solved function between t0 and tf. [y, t]
     */
    solve(y0, t0, h, tf) {
        if (tf < t0) {
            throw new RangeError("The final time value should be greater than the initial time value")
        }

        let solved = []
        if (this.isArray) {
            while (t0 < tf + h) {
                solved.push([t0, y0])
                y0 = addArrays(y0, this.odeMethodVector(t0, y0, h))
                t0 += h
            }
        } else {
            while (t0 < tf + h) {
                solved.push([t0, y0])
                y0 += this.odeMethodScalar(t0, y0, h)
                t0 += h
            }
        }
        return solved
    }

    /**
     * Returns the constants or terms required for the ode scheme for scalar variables. RK4 in this case as the default
     * and returns the addition term for it. Usually changed in Child Class
     * @param {number} t - The current t value or t_n
     * @param {number} y - The current y value or y_n
     * @param {number} h - Step size
     * @returns {number} - Returns the term to be added to y0 for the next y value
     */
    odeMethodScalar(t, y, h) {
        const k1 = this.func(t, y)
        const k2 = this.func(t + (h/2), y + k1 * (h/2))
        const k3 = this.func(t + (h/2), y + k2 * (h/2))
        const k4 = this.func(t + h, y + k3 * h)
        return ((h/6) * (k1 + 2 * k2 + 2 * k3 + k4))
    }

    /**
     * Returns the constants or terms required for the ode scheme. RK4 in this case as the default
     * and returns the addition term for it. Usually changed in Child Class
     * @param {number} t - The current t value or t_n
     * @param {number[]} y - The current y value or y_n
     * @param {number} h - Step size
     * @returns {number[]} - Returns the term to be added to y0 for the next y value
     */
    odeMethodVector(t, y, h) {
        const timeStepHalf = t + (h/2)
        const k1 = applyParamsToAllFunc(this.func, t, y)
        const k2 = applyParamsToAllFunc(this.func, timeStepHalf, addArrays(y, multiplyArrayByScalar((h/2), k1)))
        const k3 = applyParamsToAllFunc(this.func, timeStepHalf, addArrays(y, multiplyArrayByScalar((h/2), k2)))
        const k4 = applyParamsToAllFunc(this.func, t + h, addArrays(y, multiplyArrayByScalar(h, k3)))
        return multiplyArrayByScalar((h/6), addArrays(k1, multiplyArrayByScalar(2, k2), 
                                                            multiplyArrayByScalar(2, k3), k4))
    }

    /**
     * Changes the step size to new value
     * @param newH New value for the step size
     */
    changeStepSize(newH) {
        this.h = newH
    }

    /**
     * Changes the step size to new value
     * @param {function(t, y) | function(t, [y])[]} newFunc - Function that takes in parameters in format 
     * f(t, y) where y is a scalar or vector
     */
    changeFunc(newFunc) {
        this.func = newFunc
    }

    /**
     * Reset the params to start over from new angle
     * @param {number | number[]} newParams - Initial conditions to reset
     */
    resetParams(newParams) {
        this.y = newParams
    }
}