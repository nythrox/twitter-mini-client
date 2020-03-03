import mobx, { observable, action } from "mobx";
import { UserDto } from "../../../twittermini-api/src/modules/users/dtos/user.dto";
import React from "react";
import { cookies, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '../axios';
class AppStore {
  @observable user: UserDto | null = {
    name: "pumpkin",
    handle: "nythrox",
    id: 2
  };

  @action
  login(user: UserDto, accessToken: String, refreshToken: String ) {
    this.user = user;
    cookies.set(ACCESS_TOKEN_COOKIE, accessToken)
    cookies.set(REFRESH_TOKEN_COOKIE, refreshToken)
  }

  @action
  logout() {
    this.user = null;
    cookies.remove(ACCESS_TOKEN_COOKIE)
    cookies.remove(REFRESH_TOKEN_COOKIE)
  }

  
}

export const AppStoreInstance = new AppStore();

export const AppContext = React.createContext(AppStoreInstance);
