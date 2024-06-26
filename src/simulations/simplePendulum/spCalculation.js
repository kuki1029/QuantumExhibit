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
        this.angle = initialAngle;
        this.drag = drag;
        // This offset is to allow smooth transition between parameter changes
        this.offset = 0;
    }

    /**
     * Get the x and y point of pendulum. Makes use of small angle approximation
     * @param {number} time - The time in seconds at which the pos should be returned
     * @return {[number, number]} The x and y position of the pendulum in meters.
     */
    getCurrentPosition(time) {
        // Find current angle based on given time
        const omega = Math.sqrt(this.gravity / this.length)
        const theta = this.angle * Math.cos(time * omega + this.offset)
        // Convert to cartesian using r as length
        const x = this.length * Math.cos(theta)
        const y = this.length * Math.sin(theta)
        return [x,y]
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
        const omega1 = Math.sqrt(this.gravity / this.length)
        const omega2 = Math.sqrt(newGrav / this.length)
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
        const omega1 = Math.sqrt(this.gravity / this.length)
        const omega2 = Math.sqrt(this.gravity / newLen)
        this.offset = this.offset + (omega1 - omega2) * time
        this.length = newLen
    }


}
