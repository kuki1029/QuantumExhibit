import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import "./style.css";

export const Footer = () => {
  return (
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
      <Grid container spacing={2}>
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
                        <Link href='https://github.com/kuki1029' underline="none">
                            Kunal's GitHub
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
                        <Link href='https://github.com/cluktuke' underline="none">
                            Chat's GitHub
                        </Link>
                    </Typography>
                </Grid> 
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <p className="footerMadeByText">Made by Chaitanya Luktuke & Kunal Varkekar. 2024.</p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;