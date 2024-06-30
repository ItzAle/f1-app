import React, { useEffect, useState } from "react";
import "./DriverStandings.css";
import "../../assets/global.css";
import driversService from "./../../apiServices/testapi";
import Flag from "react-world-flags";
import Loader from "../../components/Loader/Loader";
import nationalityToCountryCode from "../../components/other/images";
import teamLogo from "../../components/other/teamLogo";
import teamColorClass from "../../components/other/teamColorClass";
import { Link } from "react-router-dom";

function DriverStandings() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    driversService
      .getDriverStandings()
      .then((data) => {
        const driversList =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDrivers(driversList);
        setIsLoading(false);
        document.title = "Driver Standings";
      })
      .catch((error) => {
        console.error("Error fetching driver standings:", error);
      });
  }, []);

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = favicon;
    } else {
      const link = document.createElement("link");
      link.id = "favicon";
      link.rel = "icon";
      link.href = favicon;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="div_ds">
          <div className="DS">Driver Standings</div>
          <div className="standings">
            {drivers.map((driver) => (
              <Link
                to={`/driver/${driver.Driver.driverId}`}
                key={driver.Driver.driverId}
              >
                <div className="driver_div" key={driver.Driver.driverId}>
                  <span
                    className={`team-color ${
                      teamColorClass[driver.Constructors[0].name]
                    }`}
                  >
                    .
                  </span>
                  <p className="position">{driver.position}</p>
                  <Flag
                    className="flag"
                    code={nationalityToCountryCode[driver.Driver.nationality]}
                  />
                  <p className="driver">{driver.Driver.familyName}</p>
                  <div className="team-logo-div">
                    {teamLogo[driver.Constructors[0].name] ? (
                      <img
                        className="team-logo"
                        src={teamLogo[driver.Constructors[0].name]}
                        alt={driver.Constructors[0].name}
                      />
                    ) : (
                      driver.Constructors[0].name
                    )}
                  </div>
                  <p className="points">{driver.points}PTS</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverStandings;
