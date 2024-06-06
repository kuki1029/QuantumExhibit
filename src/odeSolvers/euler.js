/**
 * Basic Class Implementation of Eulers Forward propagation method
 */

import {addArrays, 
    multiplyArrayByScalar, 
    applyParamsToAllFunc } from "./odeUtility";


export class eulerforward{
    /** Preliminary euler method solver that takes in a function and an initial t value 
    * @param {function(t, y) | function(t, [y])[]} func - Functional form of the derivative to be propagated
    * @param {number | number[]} y0 - Initial value of the function to be found
    * @param {number} t0 - Initial time value to start propagation
    * @param {number} h - Stepsize in time
    **/

    constructor(func, y0, t0, h){
        // Array Checking
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

        Object.assign(this, { func, y0, t0, h})
        /* this.y0 = y0
        this.t0 = t0
        this.h = h */
    }

    /**
     * 
     * @param {function} func - Functional form of the derivative to be propagated
     * @param {number} y0 - Initial value of the function to be found
     * @param {number} t0 - Initial time value to start propagation
     * @param {number} h - Stepsize in time
     * @returns {number} - New y value at a time t0+h
     */
    step(){
        if (this.isArray) {
            this.y = addArrays(this.y, this.odeMethodVector(this.t, this.y, this.h))
        } else {
            this.y += this.odeMethodScalar(this.t, this.y, this.h)
        }
        this.t += this.h
        return [this.t, this.y]

    }

    /**
     * 
     * @param {function} func - Functional form of the derivative to be propagated
     * @param {number} y0 - Initial value of the function to be found
     * @param {number} t0 - Initial time value to start propagation
     * @param {number} h - Stepsize in time
     * @returns {number} - New y value at a time t0+h
     */
    
    solve(func = this.func, y0 = this.y0, h = this.h0, t0=this.t0, tlim){
        let y = y0
        let t = t0
        
        if (t0>tlim){
            throw new RangeError("The final time value should be greater than the initial time value")
        }
        let solved = []
        if (this.isArray) {
            while (t<tlim+h){
                solved.push([t, y])
                y = addArrays(y, this.odeMethodVector(t, y, h))
                t +=h
            }   
        }
        else{
            while (t<tlim+h){
                solved.push(t, y)
                y = y + this.odeMethodScalar(t, y, h))
                t += h
            }
        }
        
        return solved
    }
    /**To DO: Implement a first and second derivative calculator, customise for pendulum? */

    /**
     * Returns the constants or terms required for the ode scheme for scalar variables. Euler Method
     * and returns the addition term for it.
     * @param {number} t - The current t value or t_n
     * @param {number} y - The current y value or y_n
     * @param {number} h - Step size
     * @returns {number} - Returns the term to be added to y0 for the next y value
     */
    odeMethodScalar(t, y, h) {
        const y_del = h*this.func(t, y)
        
        return y_del
    }

    /**
     * Returns the constants or terms required for the ode scheme for scalar variables. Euler Method
     * and returns the addition term for it.
     * @param {number} t - The current t value or t_n
     * @param {number[]} y - The current y value or y_n
     * @param {number} h - Step size
     * @returns {number []} - Returns the term to be added to y0 for the next y value
     */
    odeMethodVector(t, y, h) {
        const y_del = multiplyArrayByScalar(h, applyParamsToAllFunc(this.func, t, y))
        
        return y_del
    }

    /**  Changes the step size to new value
     * @param newH New value for the step size
     */
    changeStepSize(newH) {
        this.h = newH
    }

    


}   
