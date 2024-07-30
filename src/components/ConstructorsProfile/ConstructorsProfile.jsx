import React, { useEffect, useState } from "react";
import teamsService from "../../apiServices/constructorsApi";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import driversImage2 from "../../components/other/driversImage2";
// import permanentNumber from "../../components/other/permamentNumber";
// import nationalityToCountryCode from "../../components/other/images";
// import teamLogo from "../../components/other/teamLogo";
// import Flag from "react-world-flags";
import teamCars from "../other/teamCars";
import "../../assets/global.css";
import "./ConstructorsProfile.css";
import { Link } from "react-router-dom";
import teamLogo from "../other/teamLogo";

function ConstructorsProfile() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalWins, setTotalWins] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchTeamAndDrivers = async () => {
      setLoading(true);
      try {
        const fetchedDrivers = await teamsService.getDriversByConstructor(id);
        const filteredDrivers = fetchedDrivers.filter(
          (driver) => driver.Driver.driverId !== "bearman"
        );
        if (filteredDrivers.length > 0) {
          setTeam(
            filteredDrivers[0].Constructors.find(
              (constructor) => constructor.constructorId === id
            )
          );
          setDrivers(filteredDrivers);

          const pointsSum = filteredDrivers.reduce((sum, driver) => {
            const points = parseFloat(driver.points) || 0;
            return sum + points;
          }, 0);
          setTotalPoints(pointsSum);

          const winsSum = filteredDrivers.reduce((sum, driver) => {
            const wins = parseInt(driver.wins, 10) || 0;
            return sum + wins;
          }, 0);
          setTotalWins(winsSum);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching driver data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTeamAndDrivers();
  }, [id]);

  useEffect(() => {
    if (team) {
      document.title = ` ${team.name}`;
    }
    if (team && teamLogo[team.name]) {
      const favicon = document.getElementById("favicon");
      if (favicon) {
        favicon.href = teamLogo[team.name];
      } else {
        const link = document.createElement("link");
        link.id = "favicon";
        link.rel = "icon";
        link.href = teamLogo[team.name];
        document.head.appendChild(link);
      }
    }
  }, [team]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!team) {
    return <div>No team data available</div>;
  }

  return (
    <>
      {/* <div className="teamContainer">
        {teamCars[team.name] && (
          <img className="teamCar" src={teamCars[team.name]} alt={team.name} />
        )}
        <p className="teamName">{team.name}</p>
      </div> */}
      <h1 className="teamName">{team.name}</h1>
      <div className="otherDivDesktop">
        <div className="driversContainer">
          {drivers.map((driver) => (
            <div className="driver-card" key={driver.Driver.driverId}>
              <Link to={`/driver/${driver.Driver.driverId}`}>
                {driversImage2[driver.Driver.driverId] && (
                  <img
                    className="driver-logoProfileCar"
                    src={driversImage2[driver.Driver.driverId]}
                    alt={driver.Driver.driverId}
                  />
                )}
                <div className="driver-card-content">
                  <p className="driver-card-title">
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="infoTeam">
          <div className="info-card">
            <h1 className="info-title">Total Wins</h1>
            <p className="info-value">{totalWins}</p>
          </div>
          <div className="info-card">
            <h1 className="info-title">Total Points</h1>
            <p className="info-value">{totalPoints}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConstructorsProfile;
