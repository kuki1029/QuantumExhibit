import { Constant } from "../../constants";
import { ForwardEuler } from "../../odeSolvers/forwardEuler";

const eulobj = new ForwardEuler()

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

        let 
    }

    /**
     * Internally updates the position of pendulum 1.
     * @param {number} time - The time in seconds at which the pos should be returned
     */
    updatepos_pend1(time) {
        const theta_dd1_num = -1*this.gravity*(2*this.mass1+this.mass2)*Math.sin(this.theta1)-this.mass2*this.gravity*Math.sin(this.theta1-2*this.theta2)-2*Math.sin(this.theta1-this.theta2)*this.mass2*(this.theta_d2*this.theta_d2*this.length2+this.theta_d1*this.theta_d1*this.length1*Math.cos(this.theta1-this.theta2))
        const theta_dd1_denom = this.length1*(2*this.mass1+this.mass2-this.mass2*Math.cos(2*this.theta1-2*this.theta2))

        const theta_dd1 = theta_dd1_num/theta_dd1_denom

        this.theta_d1 += eulobj.PreCalc_odeMethodScalar(h=this.h, derv=theta_dd1)    
        this.theta1 += eulobj.PreCalc_odeMethodScalar(h=this.h, derv=this.theta_d1)    
    }

    /**
     * Internally updates the position of pendulum 1.
     * @param {number} time - The time in seconds at which the pos should be returned
     */
    updatepos_pend2(time) {
        const theta_dd2_num = 2*Math.sin(this.theta1-this.theta2)*(this.theta_d1*this.theta_d1*this.length1*(this.mass1+this.mass2)+this.gravity*(this.mass1+this.mass2)*Math.cos(this.theta1)+this.theta_d2*this.theta_d2*this.length2*this.mass2*Math.cos(this.theta1-this.theta2))
        const theta_dd2_denom = this.length1*(2*this.mass1+this.mass2-this.mass2*Math.cos(2*this.theta1-2*this.theta2))

        const theta_dd2 = theta_dd2_num/theta_dd2_denom

        this.theta_d2 += eulobj.PreCalc_odeMethodScalar(h=this.h, derv=theta_dd2)    
        this.theta2 += eulobj.PreCalc_odeMethodScalar(h=this.h, derv=this.theta_d2)    
    }

    /**
     * Returns xy position of the specified pendulum based on its current angle and length\
     * @param {number} PendulumIndex - Index number of the pendulum you want the xy position of
     * @returns {[number, number]} - x, y position of the pendulum relative to its pivot(based on its length)
     */
    get_xy(PendulumIndex) {
        let xy;
        
        if (PendulumIndex == 1){
            xy = [this.length1*Math.sin(this.theta1), this.length1*Math.cos(this.theta1)]
        }

        if (PendulumIndex == 2){
            xy = [this.length2*Math.sin(this.theta2), this.length2*Math.cos(this.theta2)]
        }
        
        return xy; 
    }

}
