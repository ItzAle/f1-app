import React, { useEffect, useState } from "react";
import "./DriverStandings.css";
import "../../assets/global.css";
import driversService from "./../../apiServices/testapi";
import Flag from "react-world-flags";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

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
    Finnish: "FIN",
    American: "USA",
  };

  const teamLogo = {
    Mercedes:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
    "Red Bull": "https://upload.wikimedia.org/wikipedia/tr/4/42/Redbull.png",
    Ferrari:
      "https://i.pinimg.com/originals/4c/ab/f1/4cabf11ca2754891d4d9d20326eca835.png",
    "Aston Martin":
      "https://cdn.icon-icons.com/icons2/2402/PNG/512/aston_martin_logo_icon_145844.png",
    "Alpine F1 Team":
      "https://i.pinimg.com/736x/9e/21/ae/9e21ae5fbc8193811439951e8e170516.jpg",
    "RB F1 Team": "https://i.ibb.co/9qHqKXq/RBCA.png",
    Sauber: "https://i.ibb.co/4T4Yy80/Kick.png",
    McLaren: "https://i.ibb.co/HNXc4Sz/Mclaren.png",
    "Haas F1 Team": "https://i.ibb.co/pbvptB1/Haas.png",
    Williams: "https://i.ibb.co/PmzmNzk/Williams.png",
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
      })
      .catch((error) => {
        console.error("Error fetching driver standings:", error);
      });
  }, []);

  return (
    <div>
      <div className="div_ds">
        <h1 className="DS">Driver Standings</h1>
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
              <div className="team-logo">
                {teamLogo[driver.Constructors[0].name] ? (
                  <img
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
    </div>
  );
}

export default DriverStandings;
