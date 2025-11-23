import { RK4 } from "../../odeSolvers/rk4";

const SIMULATION_STEPS_PER_FRAME = 10;

/** Class contains information to create a black hole simulation.
 * Allows to add more black holes, max of 3.
 * Allows to draw more rays.
 */
export default class Ray {
  x: number;
  y: number;
  r: number;
  theta: number;
  diffSolver: RK4;

  /**
   * Creates a pendulum with the given parameters
   * @param {number} mass - Mass in Kg
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.r = Math.hypot(x, y);
    this.theta = Math.asin(y / this.r);

    this.diffSolver = new RK4([], 3, 0, 0.001);
  }

  /**
   * Calls the differential solver and calculates the next pos for the ray.
   * @returns The position of the ray in cartesian coordinates
   */
  calculateNextPos() {}
}
