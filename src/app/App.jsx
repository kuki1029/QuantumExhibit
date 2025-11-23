import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRoutes from "./routes";
import Headermain from "../header";
import Footer from "../components/footer";
import "./App.css";

const theme = createTheme();

export default function App() {
  return (
<<<<<<< HEAD:src/app/App.js
    <ThemeProvider theme={theme}>
      <Router basename={import.meta.env.BASE_URL}>
          <Headermain />
          <AppRoutes />
        <Footer />
      </Router>
    </ThemeProvider>
=======
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
        <Headermain />
        <AppRoutes />
      <Footer />
    </Router>
>>>>>>> main:src/app/App.jsx
  );
}
