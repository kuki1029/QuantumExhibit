import { useRef, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from "@mui/material";
import dpAnimation from "./dpAnimation.js";
import { Screen, SimColors } from "../../constants.js";
import "./style.css";
import ToggleButton from '@mui/material/ToggleButton';

const defaultLength1 = 1;
const defaultLength2 = 2
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
  const [showOptions, setShowOptions] = useState(false)

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
      const app = await pendAnimate.initPixi(Screen.width/2, Screen.height/4)
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
        {/* AShow the canvas and sliders. Slider are hidden until user clicks to show them*/}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }} display="flex" justifyContent="center" alignItems="center">
            <Grid xs={4} sm={4} md={6}  >
                <Stack  spacing={2}>
                    <div ref={ref} display="flex" />
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                        >
                        <ToggleButton
                            value="check"
                            selected={showOptions}
                            onChange={() => {
                                setShowOptions(!showOptions);
                            }}
                            >
                            button                        
                        </ToggleButton>
                     </Stack>

                </Stack>
            </Grid>

        </Grid>
        <Box sx={{ maxWidth: '105ch' }} m="auto" pb={20}>
          {/* <SimePendExplanation /> */}
          {/* Talk about verification of accuracy.  */}
        </Box>
      </div>
    </HelmetProvider>);


}
