import { useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from "@mui/material";
import dpAnimation from "./dpAnimation.js";
import "./style.css";
import { Canvas } from "./components/Canvas.js";
import { Options } from "./components/Options.js";
import { DefaultDoublePend } from "../../constants.js";

const defaultLength1 = DefaultDoublePend.defaultLen1
const defaultLength2 = DefaultDoublePend.defaultLen2

const pendAnimate = new dpAnimation(null, null, null, defaultLength1, defaultLength2)

const mountedStyle = {
    animation: "inAnimation 250ms ease-in"
  };

export const DoublePendulum = () => {
  // Ref used to display the pixi.js code
  const ref = useRef(null);

  const [gravVal, setGravValue] = useState(9.8);
  const [lengthVal1, setLengthVal1] = useState(defaultLength1)
  const [lengthVal2, setLengthVal2] = useState(defaultLength2)
  const [showOptions, setShowOptions] = useState(true)

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
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }} display="flex" justifyContent="center" alignItems="top">
            <Grid xs={4} sm={4} md={6}  >
                <Canvas pendAnimate={pendAnimate} val={showOptions} onSmash={handleShowOptions} />
            </Grid>
                {showOptions &&  <Options pendulum={pendAnimate} />}
        </Grid>
        <Box sx={{ maxWidth: '105ch' }} m="auto" pb={20}>
          {/* <SimePendExplanation /> */}
          {/* Talk about verification of accuracy. Talk abt animation */}
        </Box>
      </div>
    </HelmetProvider>);

    function handleShowOptions() {
        setShowOptions(!showOptions)
    }
}
