import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./components/NavBar/NavBar";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LandingPage />
  </BrowserRouter>
);

reportWebVitals();
