import Axios from "axios";

export const ergastAxios = Axios.create({
  baseURL: "https://ergast.com/api/f1",
});

export const wikiImageAxios = Axios.create({
  baseURL: "https://en.wikipedia.org/w/",
});
