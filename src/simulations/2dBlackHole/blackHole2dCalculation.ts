/** Class contains information to create a black hole simulation.
 * Allows to add more black holes, max of 3.
 * Allows to draw more rays.
 */
export default class BlackHoleCalculation {
  mass: number;

  /**
   * Creates a pendulum with the given parameters
   * @param {number} mass - Mass in Kg
   */
  constructor(mass: number) {
    this.mass = mass;
  }
}
