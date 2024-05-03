import { Constant } from "../../constants";

/** Class contains information to draw a simple pendulum
Can change the various parameters such as mass, 
length, gravity, and resistance*/
export default class SimplePendulumData { 
    /**
     * Creates a pendulum with the given parameters
     * @param {number} mass - Mass in Kg
     * @param {number} length - Length in meters
     * @param {number} initialAngle - The starting angle of the pendulum in radians. Default is pi/9.
     * @param {number} drag - The horizontal drag force on the pendulum in Newtons. Default is 0 N.
     * @param {number} gravity - Gravity in m/s^2. Default is 9.8
     */
    constructor(mass, length, initialAngle = Math.PI/9, drag = 0, gravity = Constant.gravity) {
        this.mass = mass;
        this.length = length;
        this.gravity = gravity;
        // TODO: Add actual solving instead of approximation and give user the choice to see difference
        this.angle = initialAngle;
        this.drag = drag
        this.omega = Math.sqrt(this.gravity / this.length)

    }

    /**
     * Get the x and y point of pendulum. Makes use of small angle approximation
     * @param {number} time - The time in seconds at which the pos should be returned
     * @return {[number, number]} The x and y position of the pendulum in meters.
     */
    getCurrentPosition(time) {
        // TODO: Make small angle approximation a choice and implement proper way
        // Find current angle based on given time
        const theta = this.angle * Math.cos(time * this.omega)
        // Convert to cartesian using r as length
        const x = this.length * Math.cos(theta)
        const y = this.length * Math.sin(theta)
        return [x,y]
    }

    /**
     * Changes the gravity for the pendulum to specified value
     * @param {number} newGrav - The new gravity value to be used in m/s^2
     */
    setGravity(newGrav) {
        // TODO: Might need a time offset to allow for smooth transition
        // when switching gravity
        this.gravity = newGrav
    }


    // TODO: Func for change gravity, change drag, reset initial angle
    // TODO: Get the current position in x, y
    // TODO: change mass or length
    // TODO: incorporate drag into the equations
    // TODO: write a paper explaining all the math
    // Make a testing file 
}
