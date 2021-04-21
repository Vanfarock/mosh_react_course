import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}api/genres`;

export async function getGenres() {
  return await httpService.get(apiEndpoint);
}
