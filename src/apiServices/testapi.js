import axios from "axios";

const driversApi = "https://ergast.com/api/f1/current/driverstandings.json";
const drivers24 = "https://ergast.com/api/f1/2024/drivers.json";

const driversService = {
  getAll() {
    return fetch(driversApi)
      .then((res) => res.json())
      .then((data) => data);
  },

  getbyId(id) {
    return axios.get(drivers24 + `/${id}`).then((res) => res.data);
  },
};

export default driversService;
