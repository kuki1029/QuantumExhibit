import {addArrays, 
    multiplyArrayByScalar, 
    applyParamsToAllFunc } from "./odeUtility";
import { DifferentialSolver } from "./differentialSolver";

/** Class implements the Forward Euler method.
*/
export class ForwardEuler extends DifferentialSolver {

/**
 * Returns the constants or terms required for the ode scheme for scalar variables. Forward Euler in this case
 * and returns the addition term for it.
 * @param {number} t - The current t value or t_n
 * @param {number} y - The current y value or y_n
 * @param {number} h - Step size
 * @returns {number} - Returns the term to be added to y0 for the next y value
 */
odeMethodScalar(t, y, h) {
    return h * this.func(t, y)
}

/**
 * Returns the constants or terms required for the ode scheme. Forward Euler  in this case
 * and returns the addition term for it.
 * @param {number} t - The current t value or t_n
 * @param {number[]} y - The current y value or y_n
 * @param {number} h - Step size
 * @returns {number[]} - Returns the term to be added to y0 for the next y value
 */
odeMethodVector(t, y, h) {
    return multiplyArrayByScalar(h, applyParamsToAllFunc(this.func, t, y))
}

/**
 * Returns the constants or terms required for the ode scheme for scalar variables where the derivative is calculated. Forward Euler in this case
 * and returns the addition term for it.
 * @param {number} derv - The calculated derivative value
 * @param {number} h - Step size
 * @returns {number} - Returns the term to be added to y0 for the next y value
 */
PreCalc_odeMethodScalar(derv, h) {
    return h * derv
}
}