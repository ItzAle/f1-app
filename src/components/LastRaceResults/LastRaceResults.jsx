// LastRaceResults.jsx

import React, { useEffect, useState } from "react";
import { getLastRaceResults, getRaceInfo } from "../../apiServices/racesApi";
import driverImages from "../../components/other/driversImage";
import teamLogo from "../../components/other/teamLogo";
import "./LastRaceResults.css"; // Importa el archivo CSS
import { Link } from "react-router-dom";

function LastRaceResults() {
  const [results, setResults] = useState([]);
  const [raceInfo, setRaceInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const raceInfo = await getRaceInfo();
        const fetchedResults = await getLastRaceResults();
        setResults(fetchedResults);
        setRaceInfo(raceInfo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching last race results:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);
  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (loading) {
    return <div className="loading-message">Loading race results...</div>;
  }

  if (results.length === 0) {
    return <div>No results found for the last race.</div>;
  }

  const topThree = results.slice(0, 3);
  const otherResults = results.slice(3);

  return (
    <div className="last-race-results">
      <h2>Last Race Results - {raceInfo.Circuit.circuitName}</h2>
      <div className="top-three-container">
        {topThree.map((result, index) => (
          <div key={index} className={`top-three-item position-${index + 1}`}>
            <Link to={`/driver/${result.Driver.driverId}`}>
              <img
                src={driverImages[`${result.Driver.driverId}`]}
                alt={`${result.Driver.givenName} ${result.Driver.familyName}`}
                className="driver-image"
              />
              <div className="driver-info">
                <p className="driver-name">{`${result.Driver.givenName} ${result.Driver.familyName}`}</p>
                <p className="driver-team">{result.Constructor.name}</p>
                <p className="driver-time">
                  {result.Time?.time || result.status}
                </p>
                <p className="driver-points">{result.points} pts</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <ul className="results-list">
        {otherResults.map((result) => (
          <Link to={`/driver/${result.Driver.driverId}`}>
            <li key={result.position} className="result-item">
              <div className="result-position">{result.position}</div>
              <div className="result-driver">
                <img
                  src={driverImages[`${result.Driver.driverId}`]}
                  alt={`${result.Driver.givenName} ${result.Driver.familyName}`}
                />
                <span className="driver-name-span">{`${result.Driver.givenName} ${result.Driver.familyName}`}</span>
              </div>
              <div className="result-constructor">
                {" "}
                <img
                  className="team-logo-results"
                  src={teamLogo[`${result.Constructor.name}`]}
                  alt={`${result.Constructor.name}`}
                />
              </div>
              <div className="result-time">
                {result.Time?.time || result.status}
              </div>
              <div className="result-points">{result.points} pts</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default LastRaceResults;
