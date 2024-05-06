import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio } from "../../content_option";
//TODO: Fix this page
export const Portfolio = () => {
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
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" />
                <div className="content">
                  <p>{data.description}</p>
                  <a href={data.link}>View project</a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
