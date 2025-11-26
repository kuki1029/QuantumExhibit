import { RK4 } from "../../odeSolvers/rk4";
import { c, rs } from "./constants";

/** Class contains information to create a black hole simulation.
 * Allows to add more black holes, max of 3.
 * Allows to draw more rays.
 */
export class Ray {
  x: number;
  y: number;
  r: number;
  phi: number;
  dr: number;
  dphi: number;
  E: number; // conserved energy
  L: number; // conserved angular momentum
  diffSolver: RK4;

  /**
   * Creates a pendulum with the given parameters
   * @param {number} x - x value of ray
   * @param {number} y - y value of ray
   */
  constructor(x: number, y: number, velocityAngle: number) {
    this.x = x;
    this.y = y;

    this.r = Math.hypot(x, y);
    this.phi = Math.atan2(y, x);

    // velocity components (light speed)
    const vx = c * Math.cos(velocityAngle);
    const vy = c * Math.sin(velocityAngle);

    // velocity to polar coordinates
    this.dr = vx * Math.cos(this.phi) + vy * Math.sin(this.phi);
    this.dphi = (-vx * Math.sin(this.phi) + vy * Math.cos(this.phi)) / this.r;

    // conserved quantities
    this.L = this.r * this.r * this.dphi; // Angular momentum
    const f = 1.0 - rs / this.r;

    // Check for numerical issues
    if (f <= 0) {
      console.warn("Starting inside or at event horizon");
    }

    const term1 = (this.dr * this.dr) / (f * f);
    const term2 = (this.r * this.r * this.dphi * this.dphi) / f;
    const dt_dlambda_squared = term1 + term2;

    if (dt_dlambda_squared < 0) {
      console.error("Negative dt_dlambda^2:", dt_dlambda_squared);
      console.log("dr:", this.dr, "dphi:", this.dphi, "r:", this.r, "f:", f);
    }

    const dt_dlambda = Math.sqrt(Math.max(0, dt_dlambda_squared));
    this.E = f * dt_dlambda;  

    // Initialize RK4 solver with state vector [r, phi, dr, dphi]
    this.diffSolver = new RK4(
      [this.rPrime, this.phiPrime, this.drPrime, this.dphiPrime],
      [this.r, this.phi, this.dr, this.dphi],
      0, // initial affine parameter λ = 0
      1 // step size dλ
    );
  }

  /**
   * Calls the differential solver and calculates the next pos for the ray.
   * @returns The position of the ray in cartesian coordinates, or null if ray crossed event horizon
   */
  calculateNextPos() {
    const [, state] = this.diffSolver.step();

    // State should always be a list of variables as thats what we initialize it with
    if (!Array.isArray(state)) {
      return null
    }

    // Extract new state: [r, phi, dr, dphi]
    this.r = state[0];
    this.phi = state[1];
    this.dr = state[2];
    this.dphi = state[3];

    // Check if ray has crossed the Schwarzschild radius (event horizon)
    if (this.r <= rs) {
      return null;
    }

    // console.log(params);
    // Convert back to Cartesian coordinates
    this.x = this.r * Math.cos(this.phi);
    this.y = this.r * Math.sin(this.phi);
    return { x: this.x, y: this.y };
  }

  /**
   * dr/dλ = dr (radial velocity)
   */
  rPrime = (_lambda: number, state: number[]) => {
    return state[2]; // dr
  };

  /**
   * dφ/dλ = dphi (angular velocity)
   */
  phiPrime = (_lambda: number, state: number[]) => {
    return state[3]; // dphi
  };

  /**
   * d²r/dλ² (radial acceleration from Schwarzschild geodesic)
   */
  drPrime = (_lambda: number, state: number[]) => {
    const r = state[0];
    const dr = state[2];
    const dphi = state[3];

    const f = 1.0 - rs / r;
    const dt_dlambda = this.E / f;

    return (
      -(rs / (2 * r * r)) * f * (dt_dlambda * dt_dlambda) +
      (rs / (2 * r * r * f)) * (dr * dr) +
      (r - rs) * (dphi * dphi)
    );
  };

  /**
   * d²φ/dλ² (angular acceleration)
   */
  dphiPrime = (_lambda: number, state: number[]) => {
    const r = state[0];
    const dr = state[2];
    const dphi = state[3];

    return (-2.0 * dr * dphi) / r;
  };
}
