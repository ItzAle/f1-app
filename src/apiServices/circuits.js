import axios from "axios";

// limpiar console.log
export default async function handler(req, res) {
  try {
    console.log("Fetching data from f1connectapi...");
    const response = await axios.get(API_URL);
    console.log("Data fetched from f1connectapi:", response.data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data from f1connectapi:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
}
