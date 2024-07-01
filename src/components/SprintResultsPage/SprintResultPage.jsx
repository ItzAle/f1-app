import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSprintResults } from "../../apiServices/racesApi";
import "./SprintResultsPage.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

function SprintResultsPage() {
  const { round } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fastestLapDriver, setFastestLapDriver] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // console.log("Fetching sprint results for round:", round);
        const fetchedResults = await getSprintResults(round);
        // console.log("Fetched results:", fetchedResults);

        if (Array.isArray(fetchedResults) && fetchedResults.length > 0) {
          setResults(fetchedResults);
          setFastestLapDriver(getFastestLapDriver(fetchedResults));
        } else {
          setError(new Error("No sprint results available for this round"));
        }
      } catch (error) {
        console.error("Error fetching sprint results:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [round]);

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

  const renderDriverName = (driver, isFastestLap) => {
    const className = isFastestLap ? "driver-name fastest-lap" : "driver-name";
    return (
      <Link to={`/driver/${driver.driverId}`} className={className}>
        {`${driver.code} `}
      </Link>
    );
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (results.length === 0) {
    return (
      <div className="no-results">No sprint results found for this round.</div>
    );
  }

  return (
    <div className="results-container">
      <h1>Sprint Race Results - Round {round}</h1>
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
          {results.map((result, index) => (
            <tr key={result.position}>
              <td>{result.position}</td>
              <td>
                {renderDriverName(
                  result.Driver,
                  result.Driver.driverId === fastestLapDriver?.Driver.driverId
                )}
              </td>
              <td>
                {index === 0
                  ? result.FastestLap?.Time?.time || "N/A"
                  : result.Time?.time || result.status || "N/A"}
              </td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SprintResultsPage;
