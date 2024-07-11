import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCircuits } from "../../apiServices/circuitService";
import "./CircuitList.css";
import Flag from "react-world-flags";
import countryCode from "../other/countryCode";
import Loader from "../Loader/Loader";

const CircuitList = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const data = await getCircuits();
        if (data && Array.isArray(data.circuits)) {
          setCircuits(data.circuits);
        } else {
          throw new Error("Expected data to be an array of circuits");
        } // No es necesario en produccion 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCircuits();
  }, []);


  // Cambiar el loader y ponerlo dentro del return!!
  if (loading) 
    return (
      <div>
        <Loader />
      </div>
    ); 


  if (error) return <div>Error: {error.message}</div>; // borrar error?

  return (
    <div className="circuit-list-container">
      <h1>F1 Circuits 2024</h1>
      <ul className="circuit-list">
        {circuits.map((circuit) => (
          <li key={circuit.circuitId} className="circuit-item">
            <Link to={`/circuits/${circuit.circuitId}`}>
              <h2>{circuit.circuitName}</h2>
              <p className="circuit-details">
                {circuit.city}, {circuit.country}
                <Flag
                  code={countryCode(circuit.country)}
                  className="race-flag"
                />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CircuitList;
