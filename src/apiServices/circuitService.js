import axios from "axios";

const API_URL = "https://f1connectapi.vercel.app/api/2024/circuits";

export const getCircuits = async () => {
  try {
    const response = await fetch("/api/circuits");
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseText = await response.text();
    console.log("Raw response:", responseText);
    try {
      const data = JSON.parse(responseText);
      console.log("Data received from API:", data);
      return data;
    } catch (e) {
      console.error("Error parsing JSON:", e, "Response text:", responseText);
      throw new Error("Failed to parse JSON response");
    }
  } catch (error) {
    console.error("Error fetching data from /api/circuits:", error);
    throw error;
  }
};
