import { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio } from "../../content_option";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


// TODO: Add filter options for types and by who later on when theres more
export const Portfolio = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLightTheme, setTheme] = useState((localStorage.getItem("theme") === 'light') ? true : false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // We emit an event in the themeToggle component and listen to it here
  window.addEventListener('themeChanged', () => {
    setTheme((localStorage.getItem("theme") === 'light') ? true : false)
  })

  return (
    <HelmetProvider>
      <Container className="About-header">
        {/* ================= Meta Data ================= */}
        <Helmet>
          <meta charSet="utf-8" />
          <title> Simulations  </title>{" "}
          <meta name="description" content="University Of Waterloo Students" />
        </Helmet>
        {/* ================= Title ================= */}
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Simulations </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        {/* ================= Loop to show all data ================= */}
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          {dataportfolio.map((data, i) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={i}>
              <Card className="simCard"  sx={{ maxWidth: 345}}>
                <CardHeader
                className="cardText"
                  action={
                    <div>
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      className="cardText">
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}>
                      <MenuItem component={"a"} target="_blank" onClick={handleClose} href="https://github.com/kuki1029">Kunal's GitHub</MenuItem>
                      <MenuItem component={"a"} target="_blank" onClick={handleClose} href="https://github.com/cluktuke">Chat's GitHub</MenuItem>
                    </Menu>
                    </div>
                  }
                  title={data.title}
                />
                {isLightTheme ? 
                  <CardMedia
                  component="img"
                  image={data.img}
                  alt={data.alt}
                  sx={{ padding: 3 }}
                  /> 
                  :
                  <CardMedia
                    component="img"
                    image={data.imgLight}
                    alt={data.alt}
                    sx={{ padding: 3 }}
                  /> 
                }
                
                <CardContent>
                  <Typography variant="body2" color="text.secondary" className="cardText">
                    {data.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent : 'space-between', p: 1 }} disableSpacing>
                  <Button variant="outlined" color='inherit'>
                    Learn More
                  </Button>
                    By {data.By}
                </CardActions>
              </Card>
              </Grid>
            );
          })}
        </Grid>
        </Box>
      </Container>
    </HelmetProvider>
  );
};
