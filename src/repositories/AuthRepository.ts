import { CreateUserDto } from "../../../twittermini-api/src/modules/users/dtos/create-user.dto";
import { LoginDto } from "../../../twittermini-api/src/modules/auth/dto/login.dto";
import { AxiosInstance } from "axios";
import { RefreshDto } from "../../../twittermini-api/src/modules/auth/dto/refresh.dto";
import axios from "axios";
import {
  AccessTokenDto,
  LoginResultDto,
  RegisterResultDto
} from "../../../twittermini-api/src/modules/auth/auth.service";
export default class AuthRepository {
  constructor(private axios: AxiosInstance) {}

  private url = this.axios.getUri();

  async refreshToken(refreshToken: string): Promise<AccessTokenDto> {
    try {
      const refreshData: RefreshDto = {
        refreshToken
      };
      return (await this.axios.post(this.url + "auth/refresh", refreshData)).data;
    } catch (e) {
      throw e;
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResultDto> {
    try {
      return (await this.axios.post(this.url + "auth/login", loginDto)).data;
    } catch (e) {
      throw e;
    }
  }

  async register(registerDto: CreateUserDto): Promise<RegisterResultDto> {
    try {
      return (await this.axios.post(this.url + "auth/register", registerDto)).data;
    } catch (e) {
      throw e;
    }
  }
}
