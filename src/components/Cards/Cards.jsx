import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

function Cards() {
  return (
    <div className="landing-container">
      <h1>Welcome to the F1 App</h1>
      <Link to="/driverstandings" className="landing-button">
        Driver Standings
      </Link>
      <Link to="/constructorstandings" className="landing-button">
        Constructor Standings
      </Link>
      <Link to="/qualifying" className="landing-button">
        Qualifyings
      </Link>
      <Link to="/race" className="landing-button">
        Race Results
      </Link>
    </div>
  );
}

export default Cards;
