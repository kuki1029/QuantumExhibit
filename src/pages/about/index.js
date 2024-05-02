import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Image } from "react-bootstrap";
import togetherPicture from '../../assets/images/togetherPic.JPG'
import kunalPic from '../../assets/images/kunalPic.jpg'
import {
  aboutData,
  kunalData,
  chatData,
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
        {/* About Us Title */}
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About Us</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        {/* =============================== About Us section on About Us page =============================== */}
        <Row>
          <Col lg="5">
            <h3 className="color_sec py-4">{aboutData.title}</h3>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <Image
                src={togetherPicture}
                alt="Picture of Kunal and Chat."
                width="100%"
            />
          </Col>
          <Col lg="7" className="d-flex align-items">
            <div>
              <p>{aboutData.aboutme}</p>
            </div>
          </Col>
        </Row>
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
        {/* =============================== About Chat =============================== */}
        <Row className="sec_sp">
          <Col lang="5">
            <h3 className="color_sec py-4"> {chatData.title} </h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              <p>{chatData.aboutme}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
