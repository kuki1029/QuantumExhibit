/**
 * Basic Class Implementation of Eulers Forward propagation method
 */

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
        let ynought = y0
        let t = tlim
        let y_tph = 0
        let y_num = []
        let t_vals = []
        while (t<=tlim){
            y_tph = ynought + h*func(t)
            y_num = y_num.push(y_tph)
            t_vals = t_vals.push(t)

            ynought = y_tph
            t = t + h
        }
        
        return [y_num, t_vals]
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
        const y_del = y + h*this.func(t, y)
        
        return y_del
    }

    /* firstder(func = this.func, ){ */

    


}   
