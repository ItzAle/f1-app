import React, { useEffect, useState } from "react";
import driversService from "../../apiServices/testapi";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";

function DriverProfile() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    driversService
      .getbyId(id)
      .then((data) => {
        const fetchedDriver = data.MRData.DriverTable.Drivers[0];
        setDriver(fetchedDriver);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!driver) {
    return <div>No driver data available</div>;
  }

  const age = calculateAge(driver.dateOfBirth);

  return (
    <div>
      <h1>
        {driver.givenName} {driver.familyName}
      </h1>
      <p>Nationality: {driver.nationality}</p>
      <p>
        Date of Birth: {age} ({driver.dateOfBirth})
      </p>
    </div>
  );
}

export default DriverProfile;
