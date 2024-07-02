// Basic physics constants that can be exported to other files
export const Constant =  {
    "gravity": 9.8,     // m/s^2
    "c": 299792458      // m/s
}

// Screen size standards
export const Screen = {
    "width": 800,       // px
    "height": 600       // px
}

// Few basic colors for simulations to keep things consistent
export const SimColors = {
    "white": "#ffffff",
    "black": "#000000",
    "red": "#ff0033",
    "blue": "#4169E1",
    "bgLight": "#ffffff",
    "bgDark": "#0c0c0c"
}

// Specifically for double pendulum
export const DefaultDoublePend = {
    "mass1": 1,
    "mass2": 1,
    "defaultLen1": 1,
    "defaultLen2": 2,
    "defaultAngle1": Math.PI / 4,
    "defaultAngle2": Math.PI / 4,
    "scaling": 100,
    "pendulumSize": 10,
    "pivotSize": 20
}

