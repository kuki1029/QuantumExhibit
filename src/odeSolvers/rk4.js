

/** Class implements the Runge-Kutta method also known as
 * RK4. It is the more popular methods in the Range-Kutta family.
 */
export class rk4 {
    /**
     * Creates a rk4 solver with given initial conditions. IC's can be changed
     * later on along with any other parameters
     * @param {function} func - Mass in Kg
     * @param {number} y0 - The initial condition y value
     * @param {number} t0 - The intial time value
     * @param {number} h - Stepsize
    */
    constructor(func, y0, t0, h) {
        this.func = func
        this.y0 = y0
        this.t0 = t0
        this.t = t0
        this.y = y0
        this.h = h
    }

    //TODO: Check if array or not
    /**
     * Does one step of Runge-Kutta. Makes use of the class variables 
     * @returns {[number, number]} Returns y_{n+1} and t_{n+1} as a list
     */
    step() {
        return //TODO: Add the rk4 method here 
    }

    /**
     * Provides the solved function y(t) between t0 and a final t value.
     * Does not use the class' variables and need to supply your own. This is to allow
     * one to solve the function without messing up the gradual stepping required for animations.
     * Just uses the function provided to class. 
     * @param {number} y0 - The initial condition y value
     * @param {number} t0 - The intial time value
     * @param {number} h - Stepsize
     * @param {number} tf - Final t value for the returned y(t) function
     * @returns {[number, number][]} - Returns a list of y and t points of the solved function between t0 and tf
     */
    solve(y0, t0, h, tf) {
        solved = []
        let y = y0
        let t = t0
        while (t <= tf) {
            solved.push([y, t])
            // TODO: Add RK4 method here to figure out next y and t value

            t += h
        }
        return solved
    }

    


}