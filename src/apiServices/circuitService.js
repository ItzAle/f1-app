import axios from "axios";

const API_URL = "https://f1connectapi.vercel.app/api/2024/circuits";

export const getCircuits = async () => {
  const response = await fetch("/api/circuits");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log("Data received from API:", data); // Agrega este console.log para depuración
  return data;
};
