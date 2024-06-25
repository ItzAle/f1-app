import React, { useEffect, useState } from "react";
import driversService from "../../apiServices/constructorsApi";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";

function ConstructorsProfile() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    driversService
      .getbyId(id)
      .then((data) => {
        const fetchedDriver = data.MRData.ConstructorTable.Constructors[0];
        setTeam(fetchedDriver);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!team) {
    return <div>No driver data available</div>;
  }

  return (
    <div>
      <h1>{team.name}</h1>
      <p>Nationality: {team.nationality}</p>
    </div>
  );
}

export default ConstructorsProfile;
