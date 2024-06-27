// import axios from "axios";

// const teamsApi = "https://ergast.com/api/f1/current/constructorStandings.json";
// const teamsA = "https://ergast.com/api/f1/2024/constructors";

// const teamsService = {
//   getAll() {
//     return fetch(teamsApi)
//       .then((res) => res.json())
//       .then((data) => data);
//   },

//   getbyId(id) {
//     return axios.get(`${teamsA}/${id}.json`).then((res) => res.data);
//   },
// };
import axios from "axios";

const teamsApi = "https://ergast.com/api/f1/current/constructorStandings.json";
const driversApi = "https://ergast.com/api/f1/current/driverStandings.json";
const teamsA = "https://ergast.com/api/f1/2024/constructors";

const getDriversByConstructor = async (constructorId) => {
  try {
    const response = await axios.get(driversApi);
    const drivers =
      response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    return drivers.filter((driver) =>
      driver.Constructors.some(
        (constructor) => constructor.constructorId === constructorId
      )
    );
  } catch (error) {
    console.error("Error fetching drivers by constructor:", error);
    throw error;
  }
};

const teamsService = {
  getAll() {
    return fetch(teamsApi)
      .then((res) => res.json())
      .then((data) => data);
  },

  getbyId(id) {
    return axios.get(`${teamsA}/${id}.json`).then((res) => res.data);
  },

  getDriversByConstructor,
};

export default teamsService;
