import axios from "axios";
import Cookies from "universal-cookie";
import AuthRepository from "./repositories/AuthRepository";
export const cookies = new Cookies();

export const REFRESH_TOKEN_COOKIE = "refreshToken";
export const ACCESS_TOKEN_COOKIE = "accessToken";

const TwitterMiniAPI = axios.create({
  url: "http://localhost:8080/api/v1/"
});

TwitterMiniAPI.interceptors.request.use(
  config => {
    const accessToken = cookies.get(ACCESS_TOKEN_COOKIE);
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

TwitterMiniAPI.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      const newAuthToken = await new AuthRepository(
        TwitterMiniAPI
      ).refreshToken(cookies.get(REFRESH_TOKEN_COOKIE));
      const accessToken = cookies.set(ACCESS_TOKEN_COOKIE, newAuthToken);
      // error.config.headers["Authorization"] = "Bearer " + newAuthToken;
      return TwitterMiniAPI.request(error.config);
    }

    return Promise.reject(error);
  }
);

export default TwitterMiniAPI;
