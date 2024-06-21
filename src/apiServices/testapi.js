import axios from "axios";

const driversApi = "https://ergast.com/api/f1/current/driverstandings.json";

const driversService = {
  getAll() {
    return fetch(driversApi)
      .then((res) => res.json())
      .then((data) => data);
  },

  getbyId(id) {
    return axios.get(driversApi + `/${id}`).then((res) => res.data);
  },
};

export default driversService;
