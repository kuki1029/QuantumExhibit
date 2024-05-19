import React, { useRef, useEffect, useState } from "react";
import { Application, Graphics } from 'pixi.js';
import "./style.css";
import { Screen } from "../../constants.js";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import { SimePendExplanation } from "./spExplanation.js";
import simpPendAnimation from "./spAnimation.js";
import SimplePendulumData from "../../simulationsCalcs/simplePendulum/calculation.js";


const sliderBoxSize = 180;

// Set intial colors based on users theme
const theme = localStorage.getItem("theme")
let pivotColor = (theme === 'light') ? "#000000" : "#ffffff";
let pendulumColor = (theme === 'light') ? 0x4169E1 : 0xff0033;
let backgroundColor = (theme === 'light') ? '#ffffff' : '#0c0c0c';
let ropeColor = pivotColor;
let redrawColors = false;

// totalTime used to update the animation
let totalTime = 0;

// SimplePendulum class
const pend = new SimplePendulumData(defaultMass, defaultLength);

// Create page with react syntax. Need to do it this way
// so that Pixi.js works well with React
export const SimplePendulum = () => {
  // Ref used to display the pixi.js code
  const ref = useRef(null);

  // Variables for sliders to change parameters
  const [gravVal, setGravValue] = useState(9.8);
  const [lengthVal, setLengthVal] = useState(defaultLength)

  // Handle changes when the slider is changed
  const handleGravSliderChange = (event, newValue) => {
    pend.setGravity(newValue, 0)
    setGravValue(newValue);
  };

  // Handle changes when the slider is changed
  const handleLenSliderChange = (event, newValue) => {
    pend.setLength(newValue, 0)
    setLengthVal(newValue);
  };

  // Runs once
  useEffect(() => {
    // We need a function for this as pixiJS requires
    // async setup to be initialized
    async function initializePixiApp() {
      // Create a new application
      const app = new Application();

      const pendAnimate = new simpPendAnimation(app, Screen.width/2, Screen.height/3)
      await pendAnimate.initPixi()
      pendAnimate.drawPivot()
      pendAnimate.drawPendulum()
      pendAnimate.drawRope(0, defaultLength)
  
      // Attach to the current DOM
      ref.current.appendChild(app.canvas);
    }

    initializePixiApp();
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
        {/* Length Slider */}
        <Box sx={{ width: sliderBoxSize }} m="auto">
          {/* Slider Label */}
          <Typography>
            Length
          </Typography>
            {/* Length Slider */}
            <Slider
              value={typeof lengthVal === 'number' ? lengthVal : 0}
              onChange={handleLenSliderChange}
              size="small"
              step={1}
              min={5}
              max={400}
              color={pivotColor}
              valueLabelDisplay="auto"
            />
        </Box>
      </Stack>
      <Box sx={{ maxWidth: '105ch' }} m="auto" pb={20}>
        <SimePendExplanation />
      </Box>
    </div>);
}
// TODO: Check for spelling errors and grammar
