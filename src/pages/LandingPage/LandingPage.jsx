import React, { useEffect } from "react";
import "../../assets/global.css";
import RaceCountdown from "../../components/RaceCountDown/RaceCountDown";
import "./LandingPage.css";
import LastRaceResults from "../../components/LastRaceResults/LastRaceResults";
import { TwitterTimelineEmbed } from "react-twitter-embed";

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
        <LastRaceResults />
        <div className="twitter-feed-container">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="f1"
            options={{ height: "600px", width: "1000px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
