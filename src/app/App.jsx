import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import AppRoutes from "./routes";
import Headermain from "../header";
import Footer from "../components/footer";
import "./App.css";

export default function App() {
  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
        <Headermain />
        <AppRoutes />
      <Footer />
    </Router>
  );
}
