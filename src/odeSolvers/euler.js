/**
 * Basic Class Implementation of Eulers Forward propagation method
 */

export class eulerforward{
    /** Preliminary euler method solver that takes in a function and an initial t value 
    * @param {function} func - Functional form of the derivative to be propagated
    * @param {number} y0 - Initial value of the function to be found
    * @param {number} t0 - Initial time value to start propagation
    * @param {number} h - Stepsize in time
    **/

    constructor(der, y0, t0, hstep){
        this.der = der
        this.y0 = y0
        this.t0 = t0
        this.h = h
    }

    /**
     * 
     * @param {function} func - Functional form of the derivative to be propagated
     * @param {number} y0 - Initial value of the function to be found
     * @param {number} t0 - Initial time value to start propagation
     * @param {number} h - Stepsize in time
     * @returns {number} - New y value at a time t0+h
     */
    step(func = this.func, y0 = this.y0, h = this.h0, t0=this.t0){
        const yt = y0 + h*func(t0)
        return yt

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


    /* firstder(func = this.func, ){ */

    


}   
