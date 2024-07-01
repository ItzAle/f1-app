import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQualifyingResults } from "../../apiServices/racesApi";
import Flag from "react-world-flags";
import "./QualifyingPage.css";
import countryCode from "../other/countryCode";
import Loader from "../Loader/Loader";

function QualifyingPage() {
  const [quali, setQuali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuali = async () => {
      try {
        const fetchedQuali = await getAllQualifyingResults();

        const currentDate = new Date();

        const pastQuali = fetchedQuali
          .filter((quali) => new Date(quali.date) <= currentDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setQuali(pastQuali);
        setLoading(false);
        document.title = "Qualifyings";
      } catch (error) {
        console.error("Error fetching races:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchQuali();
  }, []);

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

  return (
    <div className="races-container">
      <h1>Qualifying</h1>
      <ul className="races-list">
        {quali.map((quali, index) => (
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
    </div>
  );
}

export default QualifyingPage;
