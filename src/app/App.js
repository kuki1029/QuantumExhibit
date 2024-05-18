import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import Footer from "../components/footer";
import "./App.css";

// TODO: Add footer

// function _ScrollToTop(props) {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return props.children;
// }
// const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <ScrollToTop> */}
        <Headermain />
        <AppRoutes />
      {/* </ScrollToTop> */}
      <Footer />
    </Router>
  );
}
