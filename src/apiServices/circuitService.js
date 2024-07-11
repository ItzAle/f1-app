import axios from "axios";

// Borrar cors (probar en produccion)
const API_URL = "https://f1connectapi.vercel.app/api/2024/circuits";

export const getCircuits = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
