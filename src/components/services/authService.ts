import Cookies from "universal-cookie";
import { UserDto } from '../../../../twittermini-api/src/modules/users/dtos/user.dto';

const REFRESH_TOKEN_COOKIE = "refreshToken";
const ACCESS_TOKEN_COOKIE = "accessToken";
const USER_COOKIE = "user";
export class AuthService {
  private cookies = new Cookies();

  get user(): UserDto | undefined {
    return this.cookies.get(USER_COOKIE);
  }
  set user(user: UserDto | undefined) {
    if (!user) {
      this.cookies.remove(USER_COOKIE);
    } else {
      this.cookies.set(USER_COOKIE, user);
    }
  }

  get accessToken() {
    return this.cookies.get(ACCESS_TOKEN_COOKIE);
  }
  set accessToken(token: string) {
    this.cookies.set(ACCESS_TOKEN_COOKIE, token);
  }
  get refreshToken() {
    return this.cookies.get(REFRESH_TOKEN_COOKIE);
  }
  set refreshToken(token: string) {
    this.cookies.set(REFRESH_TOKEN_COOKIE, token);
  }
  login(user: UserDto,accessToken: String, refreshToken: String) {
    this.cookies.set(USER_COOKIE, user)
    this.cookies.set(ACCESS_TOKEN_COOKIE, accessToken);
    this.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken);
  }
  logout() {
    this.cookies.remove(USER_COOKIE)
    this.cookies.remove(ACCESS_TOKEN_COOKIE);
    this.cookies.remove(REFRESH_TOKEN_COOKIE);
  }
}
