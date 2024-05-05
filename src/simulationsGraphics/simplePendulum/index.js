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
const pivotColor = "#ffffff";
const ropeColor = pivotColor;
const pendulumColor = 0xff0033;
const animationSpeed = 100;
const backgroundColor = 0x0c0c0c; // TODO: Match dark theme. Need to make this responsive.
const sliderBoxSize = 180;

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
      rope.fill(ropeColor);
      rope.stroke({ width: 2 });
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
        pendulum.y = xCoord 
        pendulum.x = yCoord
        // Animate rope
        rope.clear();
        drawRope(yCoord + ((Screen.width - pivotSize) / 2), 
        xCoord + defaultLength)

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
      <MathJaxContext>
      <p>Some explanation for the above simulation.</p>
        <h2>Basic example with Latex</h2>
        <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
      </MathJaxContext>
    </div>);
}
