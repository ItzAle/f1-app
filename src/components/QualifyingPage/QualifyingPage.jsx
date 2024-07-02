import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQualifyingResults } from "../../apiServices/racesApi";
import Flag from "react-world-flags";
import "./QualifyingPage.css";
import countryCode from "../other/countryCode";
import Loader from "../Loader/Loader";
import "../../assets/global.css";

function QualifyingPage() {
  const [quali, setQuali] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByLatest, setSortByLatest] = useState(false);

  useEffect(() => {
    const fetchQuali = async () => {
      try {
        const fetchedQuali = await getAllQualifyingResults();

        const currentDate = new Date();

        const pastQuali = fetchedQuali
          .filter((quali) => new Date(quali.date) <= currentDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setQuali(pastQuali);
        setisLoading(false);
        document.title = "Qualifyings";
      } catch (error) {
        console.error("Error fetching races:", error);
        setError(error);
        setisLoading(false);
      }
    };

    fetchQuali();
  }, []);

  const toggleSortOrder = () => {
    setSortByLatest(!sortByLatest);
  };

  const sortedQuali = sortByLatest
    ? [...quali].sort((a, b) => new Date(b.date) - new Date(a.date))
    : quali;

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="races-container">
      <h1>Qualifying</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button className="toggle-button" onClick={toggleSortOrder}>
            {sortByLatest
              ? "Show Qualifyings in Original Order"
              : "Show Qualifyings by Order"}
          </button>
          <ul className="race-list">
            {sortedQuali.map((quali, index) => (
              <li key={`${quali.round}-${index}`} className="race-item">
                <Link to={`/qualifying/${quali.round}`} className="race-link">
                  <div className="race-info">
                    <p className="race-name">{quali.raceName}</p>
                    <p className="race-date">
                      {new Date(quali.date).toLocaleDateString()}
                    </p>
                    <p className="race-location">
                      {quali.Circuit.Location.locality},{" "}
                      {quali.Circuit.Location.country}{" "}
                      <Flag
                        code={countryCode(quali.Circuit.Location.country)}
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

export default QualifyingPage;
