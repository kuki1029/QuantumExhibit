import { Constant } from "../../constants";
import { ForwardEuler } from "../../odeSolvers/forwardEuler";

export default class DoublePendulum {
     /**
     * Creates a double pendulum with the given parameters
     * @param {number} mass1 - Mass in Kg
     * @param {number} length1 - Length in meters
     * @param {number} initialAngle1 - The starting angle of the pendulum in radians. Default is pi/9.
     * @param {number} mass2 - Mass in Kg
     * @param {number} length2 - Length in meters
     * @param {number} initialAngle2 - The starting angle of the pendulum in radians. Default is pi/9.
     * @param {number} h - Iteration constant for numerical solution.
     * @param {number} drag - The horizontal drag force on the pendulum in Newtons. Default is 0 N.
     * @param {number} gravity - Gravity in m/s^2. Default is 9.8
     */
     constructor(mass1, length1, mass2, length2, initialAngle1 = Math.PI/9, initialAngle2 = Math.PI/9, drag = 0, gravity = Constant.gravity, h=0.01) {
        this.mass1 = mass1;
        this.length1 = length1;
        this.mass2 = mass2;
        this.length2 = length2;
        this.gravity = gravity;
        this.theta1 = initialAngle1;
        this.theta2 = initialAngle2;
        this.theta_d1 = 0;
        this.theta_d2 = 0;

        this.h = h
        this.drag = drag;
        // This offset is to allow smooth transition between parameter changes
        this.offset = 0;
    }

    /**
     * Get the x and y point of pendulum. Makes use of small angle approximation
     * @param {number} time - The time in seconds at which the pos should be returned
     * @return {[number, number]} The x and y position of the pendulum in meters.
     */
    updatepos_pend1(time) {
        const theta_dd1_num = -1*this.gravity*(2*this.mass1+this.mass2)*Math.sin(this.theta1)-this.mass2*this.gravity*Math.sin(this.theta1-2*this.theta2)-2*Math.sin(theta_1-theta_2)*m2*(omega2*omega2*L2+omega1*omega1*L1*Math.cos(theta_1-theta_2))
        
        return [x,y]
    }
}
