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
    <ThemeProvider theme={theme}>
      <Router basename={import.meta.env.BASE_URL}>
          <Headermain />
          <AppRoutes />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
