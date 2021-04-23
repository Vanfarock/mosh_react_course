import httpService from "./httpService";

const apiEndpoint = `/users`;

export function register(user) {
  return httpService.post(apiEndpoint, user);
}
