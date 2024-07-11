import axios from "axios";

// limpiar console.log
export default async function handler(req, res) {
  try {
    console.log("Fetching data from f1connectapi...");
    const response = await axios.get(
      "https://f1connectapi.vercel.app/api/2024/circuits"
    );
    console.log("Data fetched from f1connectapi:", response.data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from f1connectapi:", error);
    res.status(500).json({ error: error.message });
  }
}
