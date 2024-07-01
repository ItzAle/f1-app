import axios from "axios";

const driversA = "https://ergast.com/api/f1/current/driverStandings.json";

const driversService = {
  getDriverStandings() {
    return axios.get(driversA).then((res) => res.data);
  },

  getbyId(id) {
    return axios
      .get(`https://ergast.com/api/f1/2024/drivers/${id}.json`)
      .then((res) => res.data);
  },
};

export default driversService;
