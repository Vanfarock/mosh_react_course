import httpService from "./httpService";
import config from "../config.json";

export async function getGenres() {
  const response = await httpService.get(`${config.apiEndpoint}api/genres`);
  return response.data;
}
