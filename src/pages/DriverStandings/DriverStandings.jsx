import React, { useEffect, useState } from "react";
import "./DriverStandings.css";
import "../../assets/global.css";
import driversService from "./../../apiServices/testapi";
import Flag from "react-world-flags";

function DriverStandings() {
  const [drivers, setDrivers] = useState([]);

  const nationalityToCountryCode = {
    Dutch: "NL",
    German: "DE",
    Spanish: "ES",
    Monegasque: "MC",
    British: "GB",
    Italian: "IT",
    Mexican: "MX",
    Japanese: "JP",
    French: "FR",
    Thai: "TH",
    Canadian: "CA",
    Australian: "AU",
    Chinese: "CN",
    Danish: "DK",
  };

  useEffect(() => {
    driversService
      .getAll()
      .then((data) => {
        const driversList =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDrivers(driversList);
      })
      .catch((error) => {
        console.error("Error fetching driver standings:", error);
      });
  }, []);

  return (
    <div>
      <div className="div_ds">
        <h1 className="DS">Driver Standings</h1>
        {drivers.map((driver) => (
          <div key={driver.Driver.driverId}>
            <ul>
              <li>
                {driver.position}.{driver.Driver.familyName} {driver.points}
                {driver.Constructors[0].name}{" "}
                <Flag
                  code={nationalityToCountryCode[driver.Driver.nationality]}
                />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverStandings;
