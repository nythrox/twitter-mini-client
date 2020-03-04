import mobx, { observable, action, decorate, computed } from "mobx";
import { UserDto } from "../../../twittermini-api/src/modules/users/dtos/user.dto";
import React from "react";
import { AuthService } from "../components/services/authService";
import { Login } from "../components/login/Login";
class AppStore {
  private authService = new AuthService();

  @observable user?: UserDto = this.authService.user;

  @action
  login(user: UserDto, accessToken: String, refreshToken: String) {
    this.authService.login(user, accessToken, refreshToken);
    this.user = this.authService.user;
  }
  @action.bound
  logout() {
    this.authService.logout();
    this.user = this.authService.user;
  }
}
export const AppStoreInstance = new AppStore();

export const AppContext = React.createContext(AppStoreInstance);
