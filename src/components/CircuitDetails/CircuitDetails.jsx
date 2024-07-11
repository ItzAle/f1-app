import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCircuits } from "../../apiServices/circuitService"; // Adjust the import based on your file structure
import Loader from "../Loader/Loader";
import FastLap from "../other/FastLap";
import "./CircuitDetails.css";

const CircuitDetails = () => {
  const { id } = useParams();
  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // borrar consoles.log antes de produccion
  useEffect(() => {
    const fetchCircuit = async () => {
      try {
        const response = await getCircuits();
        console.log("Response received:", response);
        const circuits = response.circuits;
        console.log("Circuits array:", circuits);
        console.log("Type of circuits:", typeof circuits);
        console.log("Is circuits an array?", Array.isArray(circuits));
        console.log("Looking for circuit with id:", id);

        if (Array.isArray(circuits)) {
          const foundCircuit = circuits.find(
            (circuit) => circuit.circuitId === id
          );
          console.log("Found circuit:", foundCircuit);

          if (foundCircuit) {
            setCircuit(foundCircuit);
          } else {
            setError(new Error("Circuit not found"));
          }
        } else {
          setError(new Error("Circuits is not an array"));
        }
      } catch (error) {
        console.error("Error fetching circuit:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuit();
  }, [id]);

  if (loading) {
    // Cambiar Loader dentro del return
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {circuit ? (
        <div>
          <h1>{circuit.circuitName}</h1>
          <p>Country: {circuit.country}</p>
          <p>City: {circuit.city}</p>
          <p>Length: {circuit.circuitLength} meters</p>
          <p>Lap Record: {circuit.lapRecord}</p>
          <p>First Participation Year: {circuit.firstParticipationYear}</p>
          <p>Corners: {circuit.corners}</p>
          <p>Fastest Lap Driver: {circuit.fastestLapDriverId}</p>
          <p>Fastest Lap Team: {circuit.fastestLapTeamId}</p>
          <p>Fastest Lap Year: {circuit.fastestLapYear}</p>
          <a href={circuit.url} target="_blank" rel="noopener noreferrer">
            More info
          </a>
        </div>
      ) : (
        <div>Circuit not found</div>
      )}
    </div>
  );
};

export default CircuitDetails;
