import React, { useEffect, useState } from "react";
import driversService from "../../apiServices/testapi";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import driversImage from "../../components/other/driversImage";
import permanentNumber from "../../components/other/permamentNumber";
import nationalityToCountryCode from "../../components/other/images";
import Flag from "react-world-flags";

function DriverProfile() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    driversService
      .getDriverStandings()
      .then((data) => {
        const standings =
          data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ||
          [];
        const fetchedDriver = standings.find(
          (standing) => standing.Driver.driverId === id
        );
        setDriver(fetchedDriver);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!driver) {
    return <div>No driver data available</div>;
  }

  const age = calculateAge(driver.Driver.dateOfBirth);

  return (
    <div>
      <h1>
        {driver.Driver.givenName} {driver.Driver.familyName}
      </h1>
      <p>Nationality: {driver.Driver.nationality}</p>
      <p>
        Date of Birth: {age} ({driver.Driver.dateOfBirth})
      </p>
      <p>Wins: {driver.wins}</p>
      <div>
        <Flag
          className="flag"
          code={nationalityToCountryCode[driver.Driver.nationality]}
        />
      </div>
      <div>
        {driversImage[driver.Driver.driverId] ? (
          <img
            className="driver-logo"
            src={driversImage[driver.Driver.driverId]}
            alt={driver.Driver.driverId}
          />
        ) : (
          driver.Driver.driverId
        )}
      </div>
      <div>
        {permanentNumber[driver.Driver.permanentNumber] ? (
          <img
            className="permanentNumber"
            src={permanentNumber[driver.Driver.permanentNumber]}
            alt={driver.Driver.driverId}
          />
        ) : (
          driver.Driver.driverId
        )}
      </div>
    </div>
  );
}

export default DriverProfile;
