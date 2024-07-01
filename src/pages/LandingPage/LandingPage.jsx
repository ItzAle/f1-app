import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/global.css";
import RaceCountdown from "../../components/RaceCountDown/RaceCountDown";
import TwitterFeed from "../../components/TwitterFeed/TwitterFeed";
import "./LandingPage.css";

function LandingPage() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = favicon;
    } else {
      const link = document.createElement("link");
      link.id = "favicon";
      link.rel = "icon";
      link.href = favicon;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div>
      <div className="landing-container">
        <RaceCountdown />
        <div className="buttons-container">
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
        <div className="twitter-feed-container">
          <TwitterFeed />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
