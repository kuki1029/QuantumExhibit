// Physics constants for black hole simulation
export const c = 1.0; // Speed of light (normalized)
export const G = 1.0; // Gravitational constant (normalized)
export const M = 10; // Black hole mass
export const rs = (2.0 * G * M) / (c * c); // Schwarzschild radius (event horizon)

// Simulation parameters
export const SIMULATION_STEPS_PER_FRAME = 10;

// Visual constants - Dark mode colors
export const RAY_COLOR_DARK = "#f7dd1b"; // Yellow for light rays in dark mode
export const RAY_COLOR_LIGHT = "#1655deff"; // Dark orange for light rays in light mode
export const EVENT_HORIZON_COLOR_DARK = "#ffffff"; // White for black hole in dark mode
export const EVENT_HORIZON_COLOR_LIGHT = "#000000"; // Black for black hole in light mode
