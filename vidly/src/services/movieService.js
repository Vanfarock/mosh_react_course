import httpService from "./httpService";
import config from "../config.json";

export async function getMovies() {
  const response = await httpService.get(`${config.apiEndpoint}api/movies`);
  return response.data;
}

export async function getMovie(id) {
  const response = await httpService.get(
    `${config.apiEndpoint}api/movies/${id}`
  );
  return response.data;
}

export async function saveMovie(movie) {
  const response = await httpService.post(
    `${config.apiEndpoint}api/movies`,
    movie
  );
  return response.data;
}

export async function deleteMovie(id) {
  const response = await httpService.delete(
    `${config.apiEndpoint}api/movies/${id}`
  );
  return response.data;
}
