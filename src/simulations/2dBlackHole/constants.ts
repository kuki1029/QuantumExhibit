// Physics constants for black hole simulation
export const c = 1.0; // Speed of light (normalized)
export const G = 1.0; // Gravitational constant (normalized)
export const M = 10; // Black hole mass
export const rs = (2.0 * G * M) / (c * c); // Schwarzschild radius (event horizon)

// Simulation parameters
export const SIMULATION_STEPS_PER_FRAME = 10;

// Visual constants
export const RAY_COLOR = 0xf7dd1b; // Color for light rays and their trails
export const EVENT_HORIZON_COLOR = 0xffffff; // Color for black hole event horizon circle
