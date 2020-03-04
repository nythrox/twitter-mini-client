import axios from "axios";
import AuthRepository from "./repositories/AuthRepository";
import { AuthService } from "./components/services/authService";


const authService = new AuthService();

const TwitterMiniAPI = axios.create({
  url: "http://localhost:8080/api/v1/"
});

TwitterMiniAPI.interceptors.request.use(
  config => {
    const accessToken = authService.accessToken;
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
      ).refreshToken(authService.refreshToken);
      authService.accessToken = newAuthToken.accessToken;
      // error.config.headers["Authorization"] = "Bearer " + newAuthToken;
      return TwitterMiniAPI.request(error.config);
    }

    return Promise.reject(error);
  }
);

export default TwitterMiniAPI;
