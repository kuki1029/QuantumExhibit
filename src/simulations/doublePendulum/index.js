import { useRef, useEffect, useState } from "react";
import { Application } from 'pixi.js';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import dpAnimation from "./dpAnimation.js";
import { Screen, SimColors } from "../../constants.js";
import "./style.css";

const defaultLength1 = 100;
const defaultLength2 = 200
const sliderBoxSize = 180;

const theme = localStorage.getItem("theme")
let sliderColor = (theme === 'light') ? SimColors.black : SimColors.white;

const pendAnimate = new dpAnimation(null, null, null, defaultLength1, defaultLength2)

export const DoublePendulum = () => {
  // Ref used to display the pixi.js code
  const ref = useRef(null);

  const [gravVal, setGravValue] = useState(9.8);
  const [lengthVal1, setLengthVal1] = useState(defaultLength1)
  const [lengthVal2, setLengthVal2] = useState(defaultLength2)

  // Handle changes when the slider is changed
  const handleGravSliderChange = (event, newValue) => {
    pendAnimate.setGravity(newValue)
    setGravValue(newValue);
  };

  // Handle changes when the slider is changed
  const handleLenSliderChange1 = (event, newValue) => {
    pendAnimate.setLength(newValue)
    setLengthVal1(newValue);
  };

  const handleLenSliderChange2 = (event, newValue) => {
    pendAnimate.setLength(newValue)
    setLengthVal2(newValue);
  };

  // Runs once
  useEffect(() => {
    // We need a function for this as pixiJS requires async setup to be initialized
    async function initializePixiApp() {
      const app = new Application();

      await pendAnimate.initPixi(app, Screen.width/2, Screen.height/4)
      pendAnimate.drawPivot()
      pendAnimate.drawPendulums()
      pendAnimate.drawRopes(0, defaultLength1, 0, defaultLength2)

      // Attach to the current DOM
      ref.current.appendChild(app.canvas);
    }

    initializePixiApp();
  }, []);

  // Return the actual code for the Pixi.JS. 
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Elegant Double Pendulum Simulataion</title>
        <meta name="description" content="A simple yet elegant simulation of the double pendulum. You can change different 
        parameters of the pendulum. An explanation behind the pendulum is show shown." />
      </Helmet>
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
                color={sliderColor}
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
                value={typeof lengthVal === 'number' ? lengthVal1 : 0}
                onChange={handleLenSliderChange1}
                size="small"
                step={1}
                min={5}
                max={400}
                color={sliderColor}
                valueLabelDisplay="auto"
              />
          </Box>
        </Stack>
        <Box sx={{ maxWidth: '105ch' }} m="auto" pb={20}>
          {/* <SimePendExplanation /> */}
        </Box>
      </div>
    </HelmetProvider>);
}
