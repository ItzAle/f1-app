import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RaceCountDown.css";
import Loader from "../Loader/Loader";

const RaceCountdown = () => {
  const [nextRace, setNextRace] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        const response = await axios.get(
          "https://ergast.com/api/f1/current.json"
        );
        const races = response.data.MRData.RaceTable.Races;
        const upcomingRace = races.find(
          (race) =>
            new Date(race.date + "T" + race.time.replace(":00Z", "")) >
            new Date()
        );
        setNextRace(upcomingRace);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNextRace();
  }, []);

  useEffect(() => {
    if (!nextRace) return;

    const interval = setInterval(() => {
      const raceDate = new Date(
        nextRace.date + "T" + nextRace.time.replace(":00Z", "")
      );
      const now = new Date();
      const timeDiff = raceDate - now;

      if (timeDiff <= 0) {
        setTimeRemaining("Race is starting now!");
        clearInterval(interval);
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextRace]);

  return (
    <div className="countdown-container">
      {nextRace ? (
        <div className="countdown-content">
          <h1 className="NR">Next Race: {nextRace.raceName}</h1>
          <p className="raceC">
            {nextRace.date} at {nextRace.time.replace(":00Z", "")}
          </p>
          <h2 className="h2RC">Time remaining: {timeRemaining}</h2>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default RaceCountdown;
