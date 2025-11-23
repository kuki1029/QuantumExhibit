import { DifferentialSolver } from "./differentialSolver";

type OdeFunction = (t: number, y: number | number[]) => number;

export class RK4 extends DifferentialSolver {
  /**
   * Returns the constants or terms required for the ode scheme for scalar variables. RK4 in this case
   * and returns the addition term for it.
   * @param t - The current t value or t_n
   * @param y - The current y value or y_n
   * @param h - Step size
   * @returns Returns the term to be added to y0 for the next y value
   */
  odeMethodScalar(t: number, y: number, h: number): number;

  /**
   * Returns the constants or terms required for the ode scheme. RK4 in this case
   * and returns the addition term for it.
   * @param t - The current t value or t_n
   * @param y - The current y value or y_n
   * @param h - Step size
   * @returns Returns the term to be added to y0 for the next y value
   */
  odeMethodVector(t: number, y: number[], h: number): number[];
}
