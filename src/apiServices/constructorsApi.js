import axios from "axios";

const teamsApi = "https://ergast.com/api/f1/current/constructorStandings.json";
const teamsA = "https://ergast.com/api/f1/2024/constructors";

const teamsService = {
  getAll() {
    return fetch(teamsApi)
      .then((res) => res.json())
      .then((data) => data);
  },

  getbyId(id) {
    return axios.get(`${teamsA}/${id}.json`).then((res) => res.data);
  },
};

export default teamsService;
