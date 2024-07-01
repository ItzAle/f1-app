import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRaceResults, getSprintResults } from "../../apiServices/racesApi";
import "./RaceResultsPage.css";
import Loader from "../../components/Loader/Loader";

function RaceResultsPage() {
  const { race } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [sprintAvailable, setSprintAvailable] = useState(false);
  const [fastestLapDriver, setFastestLapDriver] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const raceResults = await getRaceResults(race);
        setResults(raceResults);
        setFastestLapDriver(getFastestLapDriver(raceResults));
        setLoading(false);

        const sprintResults = await getSprintResults(race);
        if (sprintResults && sprintResults.length > 0) {
          setSprintAvailable(true);
        } else {
          setSprintAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching race results:", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [race]);

  const getFastestLapDriver = (results) => {
    if (!Array.isArray(results) || results.length === 0) return null;

    return results.reduce((fastest, current) => {
      if (!fastest) return current;

      const fastestTime = fastest.FastestLap?.Time?.time;
      const currentTime = current.FastestLap?.Time?.time;

      if (!fastestTime) return current;
      if (!currentTime) return fastest;

      return currentTime < fastestTime ? current : fastest;
    }, null);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">Error: This Grand Prix has not taken place</div>
    );
  }

  const renderDriverName = (driver, isFastestLap) => {
    const className = isFastestLap ? "driver-name fastest-lap" : "driver-name";
    return (
      <Link to={`/driver/${driver.driverId}`} className={className}>
        {`${driver.code} `}
      </Link>
    );
  };

  return (
    <div className="results-container">
      <h1>Race Results - Round {race}</h1>
      <div className="SprintandQualy">
        <Link className="qualy" to={`/qualifying/${race}`}>
          View Qualy
        </Link>
        {sprintAvailable && (
          <div className="sprint-button-container">
            <Link to={`/sprint/${race}`} className="sprint-button">
              View Sprint Results
            </Link>
          </div>
        )}
      </div>
      <table className="results-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Time</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.position}>
              <td>{result.position}</td>
              <td>
                {renderDriverName(
                  result.Driver,
                  result.Driver.driverId === fastestLapDriver?.Driver.driverId
                )}
              </td>
              <td>{result.Time ? result.Time.time : result.status}</td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RaceResultsPage;
