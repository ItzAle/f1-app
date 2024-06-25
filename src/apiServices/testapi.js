import axios from "axios";

const driversApi = "https://ergast.com/api/f1/current/driverstandings.json";
const driversA = "https://ergast.com/api/f1/2024/drivers";

const driversService = {
  getAll() {
    return fetch(driversApi)
      .then((res) => res.json())
      .then((data) => data);
  },

  getbyId(id) {
    return axios.get(`${driversA}/${id}.json`).then((res) => res.data);
  },
};

export default driversService;
