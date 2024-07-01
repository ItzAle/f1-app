import axios from "axios";

const BASE_URL = "https://ergast.com/api/f1";

export const getCurrentSeasonRaces = async () => {
  const response = await axios.get(`${BASE_URL}/current.json`);
  return response.data.MRData.RaceTable.Races;
};

export const getRaceResults = async (round) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current/${round}/results.json`
    );
    return response.data.MRData.RaceTable.Races[0].Results;
  } catch (error) {
    console.error("Error fetching race results:", error);
    throw error;
  }
};

export const getSprintResults = async (round) => {
  try {
    const response = await axios.get(`${BASE_URL}/2024/${round}/sprint.json`);
    console.log("API response:", response.data);

    const raceData = response.data.MRData.RaceTable.Races[0];
    return raceData.SprintResults;
  } catch (error) {
    console.error("Error fetching sprint results:", error);
    throw error;
  }
};
export const getRaces = async () => {
  const response = await axios.get("https://ergast.com/api/f1/current.json");
  return response.data.MRData.RaceTable.Races;
};

export const getSprintRaces = async () => {
  const response = await axios.get(
    "https://ergast.com/api/f1/2024/sprint.json"
  );
  return response.data.MRData.RaceTable.Races;
};
