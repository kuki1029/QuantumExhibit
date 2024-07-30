import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from "@mui/material";
import dpAnimation from "./dpAnimation.js";
import "./style.css";
import { Canvas } from "./components/Canvas.js";
import { Options } from "./components/Options.js";
import { DefaultDoublePend } from "../../constants.js";
import { DoubPendExplanation } from "./components/dpExplanation.js";

const defaultLength1 = DefaultDoublePend.defaultLen1
const defaultLength2 = DefaultDoublePend.defaultLen2
const pendAnimate = new dpAnimation(null, null, null, defaultLength1, defaultLength2)
export const DoublePendulum = () => {
    const [showOptions, setShowOptions] = useState(false)
    const [showGraph, setShowGraph] = useState(false)

    // Query params for sharing
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        // Check all the query params and if they are valid function calls,
        // then calls the animate class to change those variables
        queryParams.entries().forEach(param => {
            const funcCall = pendAnimate['set' + param[0]].bind(pendAnimate)
            if (typeof funcCall === 'function') {
                if (isNaN(parseInt(param[1]))) {
                    funcCall(param[1] === 'true')
                } else {
                    funcCall(parseFloat(param[1]))
                }
            }
        })
    }, [])

    return (
        <HelmetProvider>
            <Helmet>
            <meta charSet="utf-8" />
            <title> Elegant Double Pendulum Simulataion</title>
            <meta name="description" content="A simple yet elegant simulation of the double pendulum. You can change different 
            parameters of the pendulum. An explanation behind the pendulum is also shown." />
            </Helmet>
            <div>
            {/* Shows the canvas and sliders. Slider are hidden until user clicks to show them*/}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }} display="flex" justifyContent="center" alignItems="top">
                <Grid xs={4} sm={4} md={6}  >
                    <Canvas pendAnimate={pendAnimate} val={showOptions} onSmash={handleShowOptions} showGraph={showGraph} />
                </Grid>
                    {showOptions && <Options pendulum={pendAnimate} showGraph={showGraph} setShowGraph={setShowGraph} />}
            </Grid>
            <Box sx={{ maxWidth: '105ch' }} m="auto" pb={20}>
                <DoubPendExplanation />
            </Box>
            </div>
        </HelmetProvider>
    );

    function handleShowOptions() {
        setShowOptions(!showOptions)
    }
}
