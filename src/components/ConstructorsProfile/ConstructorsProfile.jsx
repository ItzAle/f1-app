import React, { useEffect, useState } from "react";
import teamsService from "../../apiServices/constructorsApi"; // Asegúrate de que la ruta sea correcta
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import driversImage2 from "../../components/other/driversImage2";
import permanentNumber from "../../components/other/permamentNumber";
import nationalityToCountryCode from "../../components/other/images";
import teamLogo from "../../components/other/teamLogo";
import Flag from "react-world-flags";
import teamCars from "../other/teamCars";
import "../../assets/global.css";
import "./ConstructorsProfile.css";
import { Link } from "react-router-dom";

function ConstructorsProfile() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [driver, setDriver] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalWins, setTotalWins] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchTeamAndDrivers = async () => {
      setLoading(true);
      try {
        const fetchedDrivers = await teamsService.getDriversByConstructor(id);
        if (fetchedDrivers.length > 0) {
          setTeam(
            fetchedDrivers[0].Constructors.find(
              (constructor) => constructor.constructorId === id
            )
          );
          setDriver(fetchedDrivers);

          const pointsSum = fetchedDrivers.reduce((sum, driver) => {
            const points = parseFloat(driver.points) || 0; // Asegurarse de que points es un número
            return sum + points;
          }, 0);
          setTotalPoints(pointsSum);

          const winsSum = fetchedDrivers.reduce((sum, driver) => {
            const wins = parseInt(driver.wins, 10) || 0; // Asegurarse de que wins es un número
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
      <div>
        <div className="teamContainer">
          <p className="teamName">{team.name}</p>
          {driver.map((driver) => (
            <div
              className="driver-logoProfileCardiv"
              key={driver.Driver.driverId}
            ></div>
          ))}
          {teamCars[team.name] && (
            <img
              className="teamCar"
              src={teamCars[team.name]}
              alt={team.name}
            />
          )}
        </div>
      </div>
      <div className="infoTeam">
        <h1>Drivers</h1>
        {driver.map((driver) => (
          <h1 key={driver.Driver.driverId}>
            <Link to={`/driver/${driver.Driver.driverId}`}>
              {driversImage2[driver.Driver.driverId] && (
                <img
                  className="driver-logoProfile"
                  src={driversImage2[driver.Driver.driverId]}
                  alt={driver.Driver.driverId}
                />
              )}
              {driver.Driver.givenName} {driver.Driver.familyName}
            </Link>
          </h1>
        ))}
        <Flag
          className="flag"
          code={nationalityToCountryCode[team.nationality]}
        />
        {teamLogo[team.name] && (
          <img className="teamLogo" src={teamLogo[team.name]} alt={team.name} />
        )}
        <h1>Total Wins: {totalWins} </h1>
        <h1>Total Points: {totalPoints} </h1>
      </div>
    </>
  );
}

export default ConstructorsProfile;
