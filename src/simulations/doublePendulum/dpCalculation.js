import { Constant } from "../../constants";
import { RK4 } from "../../odeSolvers/rk4";

/** Class contains information to draw a double pendulum
Can change the various parameters such as mass, 
length, gravity, and resistance*/
export default class DoublePendulumData { 
    /**
     * Creates a pendulum with the given parameters
     * @param {number} mass - Mass in Kg
     * @param {number} length - Length in meters
     * @param {number} initialAngle - The starting angle of the pendulum in radians. Default is pi/9.
     * @param {number} drag - The horizontal drag force on the pendulum in Newtons. Default is 0 N.
     * @param {number} gravity - Gravity in m/s^2. Default is 9.8
     */
    constructor(m1, m2, len1, len2, initialAngle1 = Math.PI/2, initialAngle2 = Math.PI/2, drag = 0, gravity = Constant.gravity) {
        Object.assign(this, { m1, m2, len1, len2, gravity, drag})
        this.params = [initialAngle1, initialAngle2, 0, 0]
        // This offset is to allow smooth transition between parameter changes
        this.offset = 0
        // Last two functions are invoked because they bind the required constants
        this.diffSolver = new RK4([this.thetaPrime1, this.thetaPrime2, this.alpha1(), this.alpha2()], this.params, 0, 0.001)
    }

    /**
     * Get the x and y point of pendulum. Makes use of small angle approximation
     * @param {number} time - The time in seconds at which the pos should be returned
     * @return {[number, number]} The x and y position of the pendulum in meters.
     */
    getCurrentPosition(time) {
        // Find current angle based on given time
        const omega = Math.sqrt(this.gravity / this.len1)
        const theta = this.angle * Math.cos(time * omega + this.offset)
        // Convert to cartesian using r as length
        const x = this.len1 * Math.cos(theta)
        const y = this.len1 * Math.sin(theta)
        return [x,y]
    }

    getPos1(time) {
        return { 
            x: Math.sin(this.params[0]) * this.len1, 
            y: Math.cos(this.params[0]) * this.len1}
    }

    getPos2(time) {
        return { 
            x: Math.sin(this.params[1]) * this.len2, 
            y: Math.cos(this.params[1]) * this.len2}
    }

    calculateNextPos() {
        for (let i = 0; i<10; i++) {
            this.params = this.diffSolver.step()[1]
        }
        // energy
        // const {m1, m2, len1, len2, gravity:g} = this
        // const ke = 0.5 * (m1 + m2) * len1**2 * this.params[2]**2 + 0.5 * m2 * len2**2 * this.params[3]**2 + m2*len1*len2*this.params[2]*this.params[3]*Math.cos(this.params[0]-this.params[1])
        // const pe = -1 * (m1 + m2) * g * len1 * Math.cos(this.params[0]) - m2*g*len2*Math.cos(this.params[1])
        // // Total Energy
        // console.log(ke + pe)

    }

    /**
     * Changes the gravity for the pendulum to specified value
     * @param {number} newGrav - The new gravity value to be used in m/s^2
     * @param {number} time - The current time in s to help calculate the offset
     */
    setGravity(newGrav, time) {
        if (newGrav < 0) {
            newGrav = newGrav * -1
        }
        // Find the phase for the new cos wave by setting the phase angle to 0
        const omega1 = Math.sqrt(this.gravity / this.len1)
        const omega2 = Math.sqrt(newGrav / this.len1)
        this.offset = this.offset + (omega1 - omega2) * time
        this.gravity = newGrav
    }

     /**
     * Changes the length for the pendulum to specified value
     * @param {number} newLen - The new length value to be used in m
     */
    setLength(newLen, time) {
        if (newLen < 0) {
            newLen = 5
        }
        // Find the phase for the new cos wave by setting the phase angle to 0
        const omega1 = Math.sqrt(this.gravity / this.len1)
        const omega2 = Math.sqrt(this.gravity / newLen)
        this.offset = this.offset + (omega1 - omega2) * time
        this.len1 = newLen
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

