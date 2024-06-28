import {addArrays, 
        multiplyArrayByScalar, 
        applyParamsToAllFunc } from "./odeUtility";
import { DifferentialSolver } from "./differentialSolver";

/** Class implements the Runge-Kutta method also known as
 * RK4. It is the more popular methods in the Range-Kutta family.
 */
export class RK4 extends DifferentialSolver {

    /**
     * Returns the constants or terms required for the ode scheme for scalar variables. RK4 in this case
     * and returns the addition term for it.
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
     * Returns the constants or terms required for the ode scheme. RK4 in this case
     * and returns the addition term for it.
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
}