import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRaces } from "../../apiServices/racesApi";
import Flag from "react-world-flags";
import "./RacesPage.css";
import countryCode from "../other/countryCode";

function RacesPage() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const fetchedRaces = await getRaces();

        const currentDate = new Date();

        const pastRaces = fetchedRaces
          .filter((race) => new Date(race.date) < currentDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setRaces(pastRaces);
        setLoading(false);
        document.title = "Races";
      } catch (error) {
        console.error("Error fetching races:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="races-container">
      <h1>Races</h1>
      <ul className="races-list">
        {races.map((race, index) => (
          <li key={`${race.round}-${index}`} className="race-item">
            <Link to={`/race/${race.round}`} className="race-link">
              <div className="race-info">
                <p className="race-name">{race.raceName}</p>
                <p className="race-date">
                  {new Date(race.date).toLocaleDateString()}
                </p>
                <p className="race-location">
                  {race.Circuit.Location.locality},{" "}
                  {race.Circuit.Location.country}{" "}
                  <Flag
                    code={countryCode(race.Circuit.Location.country)}
                    className="race-flag"
                  />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RacesPage;
