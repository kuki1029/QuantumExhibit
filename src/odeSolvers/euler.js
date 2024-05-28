/**
 * Basic Class Implementation of Eulers Forward propagation method
 */

export class eulerforward{
    /** Preliminary euler method solver that takes in a function and an initial t value 
    * @param {function} der - Functional form of the derivative to be propagated
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
     * @param {function} der - Functional form of the derivative to be propagated
     * @param {number} y0 - Initial value of the function to be found
     * @param {number} t0 - Initial time value to start propagation
     * @param {number} h - Stepsize in time
     * @returns {number} - New y value at a time t0+h
     */
    step(der = this.der, y0 = this.y0, h = this.h0, t0=this.t0){
        const yt = y0 + h*der(t0)
        return yt

    }

    /**To DO: Implement a first and second derivative calculator, customise for pendulum? */


    /* firstder(func = this.func, ){ */

    


}   
