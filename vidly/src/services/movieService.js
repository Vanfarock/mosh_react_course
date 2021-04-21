import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}api/movies`;

export async function getMovies() {
  return await httpService.get(apiEndpoint);
}

export async function getMovie(id) {
  return await httpService.get(`${apiEndpoint}/${id}`);
}

export async function saveMovie(movie) {
  return await httpService.post(apiEndpoint, movie);
}

export async function deleteMovie(id) {
  return await httpService.delete(`${apiEndpoint}/${id}`);
}
