import React, { useEffect, useState } from "react";
import "./ConstructorStandings.css";
import "../../assets/global.css";
import teamsService from "./../../apiServices/constructorsApi";
import Flag from "react-world-flags";
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
    Austrian: "AT",
    Swiss: "CH",
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
    teamsService
      .getAll()
      .then((data) => {
        console.log("API Response:", data); // Add this line to check the API response structure
        const teamsList =
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setDrivers(teamsList);
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
          <NavBar />
          <div className="CS">Construcor Standings</div>
          <div className="standings">
            {drivers.map((team) => {
              return (
                <div
                  className="driver_div"
                  key={team.Constructor.constructorId}
                >
                  <span
                    className={`team-color ${
                      teamColorClass[team.Constructor.name]
                    }`}
                  >
                    .
                  </span>
                  <p className="position">{team.position}</p>
                  <Flag
                    className="flag"
                    code={
                      nationalityToCountryCode[team.Constructor.nationality]
                    }
                  />
                  <p className="team">{team.Constructor.name}</p>
                  <div className="team-logo-div">
                    {teamLogo[team.Constructor.name] ? (
                      <img
                        className="team-logo"
                        src={teamLogo[team.Constructor.name]}
                        alt={team.Constructor.name}
                      />
                    ) : (
                      team.Constructor.name
                    )}
                  </div>
                  <p className="points">{team.points}PTS</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverStandings;
