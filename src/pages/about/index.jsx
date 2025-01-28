import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Image } from "react-bootstrap";
import kunalPic from '../../assets/images/kunalPic.jpg'
import {
  kunalData,
} from "../../content_option";

export const About = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        {/* Meta data. Not shown in frontend */}
        <Helmet>
          <meta charSet="utf-8" />
          <title> About Us</title>
          <meta name="description" content="University Of Waterloo Students" />
        </Helmet>
        {/* =============================== About Kunal =============================== */}
        <Row>
          <Col lg="5">
            <h3 className="color_sec py-4">{kunalData.title}</h3>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <Image
                src={kunalPic}
                alt="Picture of Kunal."
                width="100%"
                heigh="100%"
            />
          </Col>
          <Col lg="7" className="d-flex align-items">
            <div>
              <p>{kunalData.aboutme}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
