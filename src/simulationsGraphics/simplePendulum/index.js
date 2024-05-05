import React, { useRef, useEffect } from "react";
import { Application, Graphics } from 'pixi.js';
import "./style.css";
import SimplePendulumData from '../../simulationsCalcs/simplePendulum/calculation.js'
import { Screen } from "../../constants.js";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";

const pivotSize = 20;
const defaultLength = 200;
const defaultMass = 1;
const pendulumSize = 10;
const animationSpeed = 100;
const sliderBoxSize = 180;
let pivotColor;
let pendulumColor;
let backgroundColor;
let ropeColor = pivotColor;

let redrawColors = false;

// Colors for simulation. If not light, assume dark
// We emit an event in the themeToggle component and listen to it here
// Whenever theme changes, we update our colors and redraw shapes
window.addEventListener('themeChanged', () => {
  const theme = localStorage.getItem("theme")
  redrawColors = true;
  if (theme === 'light') {
    pivotColor = "#000000";
    pendulumColor = 0x4169E1;
    backgroundColor = '#ffffff'; 
    ropeColor = pivotColor;
  } else {
    pivotColor = "#ffffff";
    pendulumColor = 0xff0033;
    backgroundColor = 0x0c0c0c;
    ropeColor = pivotColor;
  }
})

// totalTime used to update the animation
let totalTime = 0;

// SimplePendulum class
const pend = new SimplePendulumData(defaultMass, defaultLength);

// TODO: Add sliding option to change the length and speed
// TODO: Display the period and other properties on screen

// Create page with react syntax. Need to do it this way
// so that Pixi.js works well with React
export const SimplePendulum = () => {
  // Ref used to display the pixi.js code
  const ref = useRef(null);

  // Variables for sliders to change parameters
  const [gravVal, setGravValue] = React.useState(9.8);

  // Handle changes when the slider is changed
  const handleGravSliderChange = (event, newValue) => {
    pend.setGravity(newValue, totalTime)
    setGravValue(newValue);
  };

  // React hooks. Runs after render of page
  useEffect(() => {
    // Graphics instance for each object in the pendulum system
    const pivot = new Graphics();
    const pendulum = new Graphics();
    const rope = new Graphics();

    // Draw pivot at half width and a third of the height.
    // Rect draws at x, y of top left of rectangle so we subtract those
    // to make sure it properly draws in the center
    pivot.rect((Screen.width - pivotSize)/ 2, (Screen.height  - pivotSize)/ 3, pivotSize, pivotSize);
    pivot.fill(pivotColor);

    // This pendulum location is irrelevant as we update it in the app.ticker
    // to match the motion of a pendulum
    pendulum.circle((Screen.width - pivotSize)/ 2, (Screen.height  - pivotSize)/ 3, pendulumSize)
    pendulum.fill(pendulumColor)

    drawRope(Screen.width / 2, Screen.height / 3 + defaultLength)

    // Need a function for this as we cannot animate the line moving
    // by just changing one side. We redraw the line each time
    // the pendulum moves
    function drawRope(endpointX, endpointY) {
      rope.moveTo(Screen.width / 2, Screen.height / 3);
      rope.lineTo(endpointX, endpointY);
      rope.stroke({ width: 2, color: ropeColor });
    }

    // We need a function for this as pixiJS requires
    // async setup to be initialized
    async function initializePixiApp() {
      // Create a new application
      const app = new Application();
      // Initialize the application
      await app.init({ background: backgroundColor, width: Screen.width, 
                       height: Screen.height, antialias: true });
      // Append the application canvas to the document body
      ref.current.appendChild(app.canvas);
      // Add rect to the application
      app.stage.addChild(rope)
      app.stage.addChild(pivot)
      app.stage.addChild(pendulum)
      
      // Runs on each render loop. Used to animate
      app.ticker.add(() => {
        totalTime += app.ticker.elapsedMS / animationSpeed;
        // X, and y are switched as the angle is defind relative to y not x
        // as it usually is for polar to cartesian conversions
        const xCoord = pend.getCurrentPosition(totalTime)[0]
        const yCoord = pend.getCurrentPosition(totalTime)[1]
        pendulum.x = yCoord
        pendulum.y = xCoord
        // Animate rope
        rope.clear();
        drawRope(yCoord + ((Screen.width - pivotSize) / 2), 
        xCoord + defaultLength)

        // Redraw with new color to match theme
        if (redrawColors) {
          pendulum.fill(pendulumColor);
          pendulum.circle((Screen.width - pivotSize)/ 2, (Screen.height  - pivotSize)/ 3, pendulumSize)

          pivot.rect((Screen.width - pivotSize)/ 2, (Screen.height  - pivotSize)/ 3, pivotSize, pivotSize);
          pivot.fill(pivotColor);

          app.renderer.background.color = backgroundColor;
          
          redrawColors = false;
        }
      });
    }

    initializePixiApp();
  
    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
  }, []);

  // Return the actual code for the Pixi.JS. 
  return (
    <div>
      {/* Div for the canvas element. Pixi adds the canvas here through ref */}
      <div ref={ref} />
      {/* Align items in the row and center on page*/}
      <Stack 
        direction="row" 
        spacing={2} m="auto"
        alignItems="center"
        justifyContent="center">
        <Box sx={{ width: sliderBoxSize }} m="auto">
          {/* Slider Label */}
          <Typography>
            Gravity
          </Typography>
            {/* Gravity Slider */}
            <Slider
              value={typeof gravVal === 'number' ? gravVal : 0}
              onChange={handleGravSliderChange}
              size="small"
              step={0.1}
              min={0.1}
              color={pivotColor}
              valueLabelDisplay="auto"
            />
        </Box>
      </Stack>
      <Box sx={{ maxWidth: '105ch' }} m="auto" pb={20}>
        <MathJaxContext>
        <h1>A Simple Single Pendulum</h1>
        {/* Physics Explanation */}
        <p class="sPText">Our goal here was to recreate a simple pendulum using elementary physics principles. 
            We start by drawing the free body diagram for the pendulum:
        </p>
        
        <p class="sPText">
          From this free body diagram, we can derive the following equations:
        </p>
        <MathJax>{"\\[ F=ma  \\]"}</MathJax>
        <MathJax>{"\\[ -mg \\sin(\\theta) = ma  \\]"}</MathJax>
        <MathJax hideUntilTypeset={"first"}>
          {`Here, we need to apply a change of variables as we have two different variables for position
          on each side of the equation. We can replace acceleration with \\(L \\alpha \\) where \\( \\alpha \\) represents the
          angular acceleration. Thus, we have:
          \\[ -mg \\sin(\\theta) = mL \\alpha \\]`}
        </MathJax>
        <MathJax>{"\\[ -g \\sin(\\theta) = L \\alpha  \\]"}</MathJax>
        <p class="sPText">
          Now, we will represent this in differential form so that we have a solvable equation:
        </p>
        <MathJax>{
          `
          $$\\begin{aligned}
            -g \\sin(\\theta) &= L \\frac{\\text{d}^2 \\theta}{\\text{d} t^2} \\\\ 
            \\frac{\\text{d}^2 \\theta}{\\text{d} t^2}  + \\omega^2 \\sin(\\theta) &= 0 \\\\
          \\end{aligned}$$`  
        }
        </MathJax>
        <p class="sPText">
          Here we define <MathJax inline>{"\\( \\omega = \\sqrt{\\frac{g}{L}} \\)"}</MathJax> as is done when solving equations
          of these sorts. We run into a small issue when trying to find a solution for this differential equation which is that
          it cannot be analytically solved. We can apply various numerical integration methods to obtain a solution for this
          but for the purposes of this simple simulation, we decided to use the small angle approximation. In this approximation, 
          we assume that <MathJax inline>{"\\( \\sin (\\theta) \\approx \\theta  \\)"}</MathJax>. Thus, we get:
        </p>
        <MathJax>{
          `
          $$\\begin{aligned}
            \\frac{\\text{d}^2 \\theta}{\\text{d} t^2}  + \\omega^2 \\theta &= 0 \\\\
          \\end{aligned}$$`  
        }
        </MathJax>
        <p class="sPextT">
          This equation is now solvable, and the solution to it is given below:
        </p>
        <MathJax>{
          `
          $$\\begin{aligned}
            \\theta (t) &= \\theta _0 \\cos (\\omega t) \\\\
          \\end{aligned}$$`  
        }
        </MathJax>
        <p class="sPextT">
          We make use of this equation in our simulation. The initial angle is a result of solving the differential and we set 
          it to 20 degrees. We do not use real world time as the animation would be too slow, rather we multiply the time by
          some factor to help speed up the animations.
        </p>
        {/* Simulation Quirks */}
        <h2>
          Simulation Quirks
        </h2>
        <p>
          Aside from the actual physics involved, there are a few tricks we need to use while calculating for the position
          of the pendulum. These quirks help us display a smooth and beautiful animation to the user while keeping the 
          math simple in the backend. 
        </p>
        {/* Phase Angle Offset */}
        <h3>
          Phase Angle Offset
        </h3>
        <p>
          When changing the gravity, the <MathJax inline>{"\\( \\omega \\)"}</MathJax> term also changes as it depends on gravity.
          This means that the overall function is different and thus, the position at the same time will be different. The pendulum
          will just teleport to the new position which does not look visually appealing. 
        </p>
        </MathJaxContext>

        <p class="sPText">s</p>
      </Box>
    </div>);
}
