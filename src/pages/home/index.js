import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introData } from "../../content_option";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Home = () => {
    const matches = useMediaQuery('(min-width:900px)');

    // Need different layouts for mobile vs laptop so we have conditional rendering
    return (
        <HelmetProvider>
            <section id="home" className="home">
                <Helmet>
                    <meta charSet="utf-8" />
                        <title> Quantum Exhibit</title>
                    <meta name="description" content="University Of Waterloo Students" />
                </Helmet>
                {matches ? 
                <Container maxWidth="xl">
                    <Stack 
                        direction="row" 
                        spacing={2} m="auto"
                        alignItems="center"
                        justifyContent="center">
                        <Box  minWidth={100} maxWidth='50%'>
                            <h2 className="mb-1x">{introData.title}</h2>
                            {/* ================= Animated Text ================= */}
                            <h1 className="fluidz-48 mb-1x">
                            <Typewriter
                                options={{
                                strings: [
                                    introData.animated.first,
                                    introData.animated.second,
                                    introData.animated.third,
                                ],
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 10,
                                }}
                            /></h1>
                            <p className="mb-1x">{introData.description}</p>
                            {/* ================= Buttons ================= */}
                            <div className="intro_btn-action">
                                <Link to="/simulation" className="text_2">
                                    <div id="button_p" className="ac_btn btn ">
                                    Our Simulations
                                        <div className="ring one"></div>
                                        <div className="ring two"></div>
                                        <div className="ring three"></div>
                                    </div>
                                </Link>
                                <Link to="/contact">
                                    <div id="button_h" className="ac_btn btn">
                                    Contact Me
                                        <div className="ring one"></div>
                                        <div className="ring two"></div>
                                        <div className="ring three"></div>
                                    </div>
                                </Link>
                            </div>
                        </Box>
                        <Box  m="auto">
                        <div>
                            <img className="homeImage" src={introData.your_img_url}></img> 
                        </div>
                        </Box>
                    </Stack>
                </Container>
                :
                <Container>
                    <Box>
                        <h1 className="mb-1x">{introData.title}</h1>
                        {/* ================= Animated Text ================= */}
                        <h2 className="fluidz-48 mb-1x">
                        <Typewriter
                            options={{
                            strings: [
                                introData.animated.first,
                                introData.animated.second,
                                introData.animated.third,
                            ],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 10,
                            }}
                        /></h2>
                        <div>
                            <img className="homeImage" src={introData.your_img_url}></img> 
                        </div>
                        <p className="mb-1x">{introData.description}</p>
                        {/* ================= Buttons ================= */}
                        <div className="intro_btn-action">
                            <Link to="/simulation" className="text_2">
                                <div id="button_p" className="ac_btn btn ">
                                Our Simulations
                                    <div className="ring one"></div>
                                    <div className="ring two"></div>
                                    <div className="ring three"></div>
                                </div>
                            </Link>
                            <Link to="/contact">
                                <div id="button_h" className="ac_btn btn">
                                Contact Me
                                    <div className="ring one"></div>
                                    <div className="ring two"></div>
                                    <div className="ring three"></div>
                                </div>
                            </Link>
                        </div>
                    </Box>
            </Container>
             }
            </section>
        </HelmetProvider>
    );
};  
