import React, { useEffect, useState } from "react";
import "./ConstructorStandings.css";
import "../../assets/global.css";
import teamsService from "./../../apiServices/constructorsApi";
import Flag from "react-world-flags";
import Loader from "../../components/Loader/Loader";
import nationalityToCountryCode from "../../components/other/images";
import teamColorClass from "../../components/other/teamColorClass";
import teamLogo from "../../components/other/teamLogo";
import { Link } from "react-router-dom";

function DriverStandings() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    teamsService
      .getAll()
      .then((data) => {
        //console.log("API Response:", data);
        const teamsList =
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setDrivers(teamsList);
        setIsLoading(false);
        document.title = "Constructor Standings";
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
          <div className="CS">Constructor Standings</div>
          <div className="standings">
            {drivers.map((team) => {
              return (
                <Link
                  to={`/constructor/${team.Constructor.constructorId}`}
                  key={team.Constructor.constructorId}
                >
                  <div
                    className="constructor_div"
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
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverStandings;
