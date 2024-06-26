import React, { useEffect, useState } from "react";
import driversService from "../../apiServices/testapi";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import driversImage2 from "../../components/other/driversImage2";
import permanentNumber from "../../components/other/permamentNumber";
import nationalityToCountryCode from "../../components/other/images";
import teamLogo from "../../components/other/teamLogo";
import helmets from "../../components/other/helmets";
import Flag from "react-world-flags";
import "../../assets/global.css";
import "./DriverProfile.css";
import NavBar from "../NavBar/NavBar";

function DriverProfile() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setError(error);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!driver) {
    return <div>No driver data available</div>;
  }

  const age = calculateAge(driver.Driver.dateOfBirth);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mainMainDriver">
          <div className="mainDiv">
            <div className="div_nameNumber">
              <h1 className="driver_name">
                {driver.Driver.givenName} {driver.Driver.familyName}
              </h1>
              {permanentNumber[driver.Driver.permanentNumber] ? (
                <img
                  className="permanentNumberDriver"
                  src={permanentNumber[driver.Driver.permanentNumber]}
                  alt={driver.Driver.permanentNumber}
                />
              ) : (
                driver.Driver.permanentNumber
              )}
            </div>

            {driversImage2[driver.Driver.driverId] && (
              <img
                className="driver-logoProfile"
                src={driversImage2[driver.Driver.driverId]}
                alt={driver.Driver.driverId}
              />
            )}
          </div>
          <div className="others">
            <Flag
              className="flag2"
              code={nationalityToCountryCode[driver.Driver.nationality]}
            />
            {helmets[driver.Driver.driverId] && (
              <img
                className="helmet"
                src={helmets[driver.Driver.driverId]}
                alt={driver.Driver.driverId}
              />
            )}
            {teamLogo[driver.Constructors[0].name] && (
              <img
                className="teamLogo"
                src={teamLogo[driver.Constructors[0].name]}
                alt={driver.Constructors[0].name}
              />
            )}
          </div>
          <div className="texts">
            <p>
              Date of Birth
              {driver.Driver.dateOfBirth} ({age})
            </p>
            <p>Wins: {driver.wins}</p>
            <p>Points: {driver.points}</p>
            <p>Position: {driver.position}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default DriverProfile;
