import React, { useEffect, useState } from "react";
import "./DriverStandings.css";
import "../../assets/global.css";
import driversService from "./../../apiServices/testapi";
import Flag from "react-world-flags";
import { Vortex } from "react-loader-spinner";
import Loader from "../../components/Loader/Loader";
import NavBar from "../../components/NavBar/NavBar";

function DriverStandings() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function LoadingFalse() {
    setIsLoading(false);
  }

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
    Finnish: "FIN",
    American: "USA",
  };

  const teamLogo = {
    Mercedes: "https://i.ibb.co/6Ng9CYg/Mercedes.png",
    "Red Bull": "https://i.ibb.co/xSxMjL0/RedBull.png",
    Ferrari: "https://i.ibb.co/vxqXDv1/Ferrari.png",
    "Aston Martin": "https://i.ibb.co/JcYs0fx/Astonmartin.png",
    "Alpine F1 Team": "https://i.ibb.co/zVtK673/Alpine.png",
    "RB F1 Team": "https://i.ibb.co/R9RSjXY/RCBA.png",
    Sauber: "https://i.ibb.co/m5XVJVG/sauber.png",
    McLaren: "https://i.ibb.co/QCZdDCw/McLaren.png",
    "Haas F1 Team": "https://i.ibb.co/JR9LGXQ/Haas.png",
    Williams: "https://i.ibb.co/W2HWGmz/Williams.png",
  };

  // const driverImages = {
  //   VER: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
  // };

  const teamColorClass = {
    Mercedes: "mercedes",
    "Red Bull": "redbull",
    Ferrari: "ferrari",
    "Aston Martin": "astonmartin",
    "Alpine F1 Team": "alpine",
    "RB F1 Team": "rb",
    Sauber: "sauber",
    McLaren: "mclaren",
    "Haas F1 Team": "haas",
    Williams: "williams",
  };

  useEffect(() => {
    driversService
      .getAll()
      .then((data) => {
        const driversList =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDrivers(driversList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver standings:", error);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="div_ds">
          <div className="DS">{<NavBar />}Driver Standings</div>
          <div className="standings">
            {drivers.map((driver) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverStandings;
