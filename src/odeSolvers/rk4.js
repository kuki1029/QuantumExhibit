

/** Class implements the Runge-Kutta method also known as
 * RK4. It is the more popular methods in the Range-Kutta family.
 */
export class rk4 {
    /**
     * Creates a rk4 solver with given initial conditions. IC's can be changed
     * later on along with any other parameters
     * @param {function} func - Function that takes in parameters in format f(t, y) where y is a scalar or vector
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
     * @returns {[number, number][]} - Returns a list of t and y points of the solved function between t0 and tf. [y, t]
     */
    solve(y0, t0, h, tf) {
        // TODO: Add check to make sure tf > t0
        let solved = []
        // Add h here to account for floating point errors
        while (t0 < tf + h) {
            solved.push([t0, y0])
            // TODO: Add RK4 method here to figure out next y and t value
            const k1 = this.func(t0, y0)
            const k2 = this.func(t0 + (h/2), y0 + k1 * (h/2))
            const k3 = this.func(t0 + (h/2), y0 + k2 * (h/2))
            const k4 = this.func(t0 + h, y0 + k3 * h)
            y0 = y0 + (h/6) * (k1 + 2 * k2 + 2 * k3 + k4)
            t0 += h
        }
        return solved
    }
}

// TODO: Change step size
// TODO: Change func
// TODO: Handle arrays in func. 
// TODO: Take in arrays into input and also scalar. depending on how many eqns passed