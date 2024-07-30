import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import "./style.css";

export const Footer = () => {
  return (
    <Container maxWidth='xl'>
        <Box
        className="footerBox"
        sx={{
            width: "100%",
            height: "auto",
            marginTop: '2rem',
            paddingTop: "1rem",
            paddingBottom: "2rem",
            flexGrow: 1 
        }}
        >
        <Grid 
        direction="row"
            justifyContent="center"
            alignItems="center"
            container 
            spacing={2}>
            <Grid item xs={4}>
                <Link href="/" underline="none"> 
                    <h1 href="/" className="footerText">
                        Quantum <br></br>
                        Exhibit
                    </h1>
                </Link>
            </Grid> 
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography align='center' >
                            <Link href='/' underline="none">
                                Home
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align='center'>
                            <Link href='/simulation' underline="none">
                                Simulations
                            </Link>
                        </Typography>
                    </Grid> 
                    <Grid item xs={12}>
                        <Typography align='center'>
                            <Link href='https://github.com/kuki1029' target='_blank'  underline="none">
                                GitHub
                            </Link>
                        </Typography>
                    </Grid> 
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography align='center'>
                            <Link href='/about' underline="none">
                                About Us
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align='center'>
                            <Link href='/contact' underline="none">
                                Contact
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align='center'>
                            <Link href='https://www.linkedin.com/in/kunal-varkekar/' target='_blank' underline="none">
                                LinkedIn
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <p className="footerMadeByText">Made by Kunal Varkekar. 2024.</p>
            </Grid>
        </Grid>
        </Box>
    </Container>
  );
};

export default Footer;