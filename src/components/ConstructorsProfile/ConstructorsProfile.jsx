import React, { useEffect, useState } from "react";
import teamsService from "../../apiServices/constructorsApi"; // Asegúrate de que la ruta sea correcta
import { useParams } from "react-router";
import Loader from "../Loader/Loader";
import driversImage2 from "../../components/other/driversImage2";
import permanentNumber from "../../components/other/permamentNumber";
import nationalityToCountryCode from "../../components/other/images";
import teamLogo from "../../components/other/teamLogo";
import helmets from "../../components/other/helmets";
import Flag from "react-world-flags";
import teamCars from "../other/teamCars";
import "../../assets/global.css";
import "./ConstructorsProfile.css";

function ConstructorsProfile() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [driver, setDriver] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        {driver.map((driver) => (
          <li key={driver.Driver.driverId}>
            {driver.Driver.givenName} {driver.Driver.familyName}
          </li>
        ))}
      </div>
    </>
  );
}

export default ConstructorsProfile;
