import { Constant, DefaultDoublePend } from "../../constants";
import { RK4 } from "../../odeSolvers/rk4";

/** Class contains information to draw a double pendulum
Can change the various parameters such as mass, 
length, gravity, and resistance*/
export default class DoublePendulumData { 
    /**
     * Creates a pendulum with the given parameters
     * @param {number} m1 - Mass of first pendulum in Kg
     * @param {number} m2 - Mass of second pendulum in Kg
     * @param {number} len1 - Length of first pendulum in meters
     * @param {number} len2 - Length of second pendulum in meters
     * @param {number} initialAngle1 - The starting angle of the first pendulum in radians. Default is pi/9.
     * @param {number} initialAngle2 - The starting angle of the second pendulum in radians. Default is pi/4.
     * @param {number} gravity - Gravity in m/s^2. Default is 9.8
     */
    constructor(m1, m2, len1, len2, initialAngle1 = Math.PI/9, initialAngle2 = Math.PI/4, gravity = Constant.gravity) {
        Object.assign(this, { m1, m2, len1, len2, gravity})
        this.params = [initialAngle1, initialAngle2, 0, 0]
        // Just to store the initial angles separately
        this.angle1 = initialAngle1
        this.angle2 = initialAngle2
        // Last two functions are invoked because they bind the required constants
        this.diffSolver = new RK4([this.thetaPrime1, this.thetaPrime2, this.alpha1(), this.alpha2()], this.params, 0, 0.001)
    }

    /**
     * @returns Returns the position in cartesian coordinates for the first pendulum relative to the pivot
     */
    getPos1() {
        return { 
            x: Math.sin(this.params[0]) * this.len1 * DefaultDoublePend.scaling, 
            y: Math.cos(this.params[0]) * this.len1 * DefaultDoublePend.scaling
        }
    }

    /**
     * @returns Returns the position in cartesian coordinates for the second pendulum 
     * relative to the first pendulum
     */
    getPos2() {
        return { 
            x: Math.sin(this.params[1]) * this.len2 * DefaultDoublePend.scaling, 
            y: Math.cos(this.params[1]) * this.len2 * DefaultDoublePend.scaling
        }
    }

    /**
     * Calls the differential solver and calculates the next timestep.
     * @returns The position of both pendula in cartesian coordinates. First pendulum
     * coords is relative to pivot. Second pendulum coords are relative to first pendulum
     */
    calculateNextPos() {
        for (let i = 0; i<10; i++) {
            this.params = this.diffSolver.step()[1]
        }
        return { 
            x1: Math.sin(this.params[0]) * this.len1 * DefaultDoublePend.scaling, 
            y1: Math.cos(this.params[0]) * this.len1 * DefaultDoublePend.scaling,
            x2: Math.sin(this.params[1]) * this.len2 * DefaultDoublePend.scaling, 
            y2: Math.cos(this.params[1]) * this.len2 * DefaultDoublePend.scaling
        }
    }

    /**
     * Changes the gravity for the pendulum to specified value.
     * Sends the changes params to the diffSolver as the constants have to be rebinded
     * @param {number} newGrav - The new gravity value to be used in m/s^2
     */
    setGravity(newGrav) {
        this.gravity = newGrav
        this.diffSolver.changeFunc([this.thetaPrime1, this.thetaPrime2, this.alpha1(), this.alpha2()])
    }

    /**
     * Changes the mass for the first pendulum
     * @param {number} newMass - The new mass in kg
     */
    setMass1(newMass) {
        this.m1 = newMass
        this.diffSolver.changeFunc([this.thetaPrime1, this.thetaPrime2, this.alpha1(), this.alpha2()])
    }

    /**
     * Changes the mass for the second pendulum
     * @param {number} newMass - The new mass in kg
     */
    setMass2(newMass) {
        this.m2 = newMass
        this.diffSolver.changeFunc([this.thetaPrime1, this.thetaPrime2, this.alpha1(), this.alpha2()])
    }

    /**
     * Changes the length for the first pendulum
     * @param {number} newLen - The new length in m
     */
    setLen1(newLen) {
        this.len1 = newLen
        this.diffSolver.changeFunc([this.thetaPrime1, this.thetaPrime2, this.alpha1(), this.alpha2()])
    }
    
        /**
     * Changes the length for the second pendulum
     * @param {number} newLen - The new length in m
     */
    setLen2(newLen) {
        this.len2 = newLen
        this.diffSolver.changeFunc([this.thetaPrime1, this.thetaPrime2, this.alpha1(), this.alpha2()])
    }

    /**
     * Changes the angle for the first pendulum. Resets all other parameters
     * @param {number} newAngle - New angle value in radians
     */
    setAngle1(newAngle) {
        this.params = [newAngle, this.params[1], 0, 0]
        this.angle1 = newAngle
        this.diffSolver.resetParams(this.params)
    }
        
    /**
     * Changes the angle for the second pendulum
     * @param {number} newLen - New angle value in radians
     */
    setAngle2(newAngle) {
        this.params = [this.params[0], newAngle, 0, 0]
        this.angle2 = newAngle
        this.diffSolver.resetParams(this.params)
    }

    /**
     * Changes the angle for the second pendulum
     * @return {number} - Returns total energy of system
     */
    getEnergy() {
        const {m1, m2, len1, len2, gravity:g} = this
        const ke = 0.5 * (m1 + m2) * len1**2 * this.params[2]**2 + 
            0.5 * m2 * len2**2 * this.params[3]**2 + 
            m2*len1*len2*this.params[2]*this.params[3]*Math.cos(this.params[0]-this.params[1])
        const pe = -1 * (m1 + m2) * g * len1 * Math.cos(this.params[0]) - m2*g*len2*Math.cos(this.params[1])
        // Total Energy
        return { ke, pe }
    }

    thetaPrime1(t, params) {
        return params[2]
    }

    thetaPrime2(t, params) {
        return params[3]
    }

    alpha1() {
        // Define local variables
        const { m1, m2, gravity: g, len1, len2 } = this;
        const sin = (theta) => {return Math.sin(theta)}
        const cos = (theta) => {return Math.cos(theta)}

        return function(t, params) {
            const top = -g*(2*m1 + m2)*sin(params[0]) - m2*g*sin(params[0] - 2*params[1]) - 
                2*sin(params[0]-params[1])*m2*
                (params[3]**2*len2 + params[2]**2*len1*cos(params[0] - params[1]))
            const bottom = len1*(2*m1 + m2 - m2*cos(2*params[0] - 2*params[1]))
            return top / bottom
        }
    }

    alpha2() {
        // Define local variables
        const { m1, m2, gravity: g, len1, len2 } = this;
        const sin = (theta) => {return Math.sin(theta)}
        const cos = (theta) => {return Math.cos(theta)}

        return function(t, params) {
            const top = 2*sin(params[0] - params[1])*(params[2]**2*len1*(m1 + m2) + 
                g*(m1 + m2)*cos(params[0]) + 
                params[3]**2*len2*m2*cos(params[0] - params[1]))
            const bottom = len2*(2*m1 + m2 - m2*cos(2*params[0] - 2*params[1]))
            return top / bottom
        }
    }
}

