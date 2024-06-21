import axios from "axios";

const teamsApi = "http://ergast.com/api/f1/current/constructorStandings.json";

const teamsService = {
  getAll() {
    return fetch(teamsApi)
      .then((res) => res.json())
      .then((data) => data);
  },

  getbyId(id) {
    return axios.get(teamsApi + `/${id}`).then((res) => res.data);
  },
};

export default teamsService;
