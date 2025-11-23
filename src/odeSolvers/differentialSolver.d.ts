type OdeFunction = (t: number, y: number | number[]) => number;

export class DifferentialSolver {
  func: OdeFunction | OdeFunction[];
  y0: number | number[];
  t0: number;
  h: number;
  y: number | number[];
  t: number;
  isArray: boolean;

  /**
   * Creates a differential solver with given initial conditions. IC's can be changed
   * later on along with any other parameters. If func takes in vector variables,
   * the initial conditions must also be vectors. Func input params must match
   * initial conditions
   * @param func - Function that takes in parameters in format f(t, y) where y is a scalar or vector
   * @param y0 - The initial condition y value
   * @param t0 - The intial time value. Always scalar.
   * @param h - Stepsize. Always scalar.
   */
  constructor(func: OdeFunction | OdeFunction[], y0: number | number[], t0: number, h: number);

  /**
   * Does one step of the differential solver. Makes use of the class variables
   * @returns Returns y_{n+1} and t_{n+1} as a list [t, y]
   */
  step(): [number, number | number[]];

  /**
   * Provides the solved function y(t) between t0 and a final t value.
   * Does not use the class' variables and need to supply your own. This is to allow
   * one to solve the function without messing up the gradual stepping required for animations.
   * Just uses the function provided to class.
   * @param y0 - The initial condition y value. If list of params, func must be able to handle that
   * @param t0 - The intial time value
   * @param h - Stepsize
   * @param tf - Final t value for the returned y(t) function
   * @returns Returns a list of t and y points of the solved function between t0 and tf. [t, y]
   */
  solve(y0: number | number[], t0: number, h: number, tf: number): [number, number | number[]][];

  /**
   * Returns the constants or terms required for the ode scheme for scalar variables. RK4 in this case as the default
   * and returns the addition term for it. Usually changed in Child Class
   * @param t - The current t value or t_n
   * @param y - The current y value or y_n
   * @param h - Step size
   * @returns Returns the term to be added to y0 for the next y value
   */
  odeMethodScalar(t: number, y: number, h: number): number;

  /**
   * Returns the constants or terms required for the ode scheme. RK4 in this case as the default
   * and returns the addition term for it. Usually changed in Child Class
   * @param t - The current t value or t_n
   * @param y - The current y value or y_n
   * @param h - Step size
   * @returns Returns the term to be added to y0 for the next y value
   */
  odeMethodVector(t: number, y: number[], h: number): number[];

  /**
   * Changes the step size to new value
   * @param newH - New value for the step size
   */
  changeStepSize(newH: number): void;

  /**
   * Changes the step size to new value
   * @param newFunc - Function that takes in parameters in format f(t, y) where y is a scalar or vector
   */
  changeFunc(newFunc: OdeFunction | OdeFunction[]): void;

  /**
   * Reset the params to start over from new angle
   * @param newParams - Initial conditions to reset
   */
  resetParams(newParams: number | number[]): void;
}
