import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRaces } from "../../apiServices/racesApi";
import Flag from "react-world-flags";
import "./RacesPage.css";
import countryCode from "../other/countryCode";
import Loader from "../Loader/Loader";

function RacesPage() {
  const [races, setRaces] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByLatest, setSortByLatest] = useState(false);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const fetchedRaces = await getRaces();

        const currentDate = new Date();

        const pastRaces = fetchedRaces
          .filter((race) => new Date(race.date) < currentDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setRaces(pastRaces);
        setisLoading(false);
        document.title = "Races";
      } catch (error) {
        console.error("Error fetching races:", error);
        setError(error);
        setisLoading(false);
      }
    };

    fetchRaces();
  }, []);

  const toggleSortOrder = () => {
    setSortByLatest(!sortByLatest);
  };

  const sortedRaces = sortByLatest
    ? [...races].sort((a, b) => new Date(b.date) - new Date(a.date))
    : races;

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="races-container">
      <h1>Races</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button className="toggle-button" onClick={toggleSortOrder}>
            {sortByLatest
              ? "Show Races in Original Order"
              : "Show Races by Latest"}
          </button>
          <ul className="races-list">
            {sortedRaces.map((race, index) => (
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
        </>
      )}
    </div>
  );
}

export default RacesPage;
