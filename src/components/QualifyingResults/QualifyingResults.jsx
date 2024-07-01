import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQualifyingResults } from "../../apiServices/racesApi";
import "./QualifyingResults.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

function QualifyingResultsPage() {
  const { round } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const fetchedResults = await getQualifyingResults(round);

        if (Array.isArray(fetchedResults) && fetchedResults.length > 0) {
          setResults(fetchedResults);
        } else {
          setError(new Error("No qualifying results available for this round"));
        }
      } catch (error) {
        console.error("Error fetching qualifying results:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [round]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (results.length === 0) {
    return (
      <div className="no-results">
        No qualifying results found for this round.
      </div>
    );
  }

  return (
    <div className="results-container">
      <h1>Qualifying Results - Round {round}</h1>
      <Link className="qualy" to={`/race/${round}`}>
        View Race
      </Link>
      <table className="results-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Q1 Time</th>
            <th>Q2 Time</th>
            <th>Q3 Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result.position}>
              <td>{result.position}</td>
              <td>
                <Link to={`/driver/${result.Driver.driverId}`}>
                  {`${result.Driver.code}`}
                </Link>
              </td>
              <td>{result.Q1 || "N/A"}</td>
              <td>{result.Q2 || "N/A"}</td>
              <td>{result.Q3 || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QualifyingResultsPage;
