import { PostDto } from "../../../twittermini-api/src/modules/posts/dtos/post.dto";
import { AxiosInstance } from "axios";
import { UserDto } from "../../../twittermini-api/src/modules/users/dtos/user.dto";
export default class UserRepository {
  constructor(private axios: AxiosInstance) {}
  private url = this.axios.getUri();

  async getUserById(userId: number): Promise<UserDto> {
    try {
      return (await this.axios.get(this.url + "users/" + userId)).data;
    } catch (e) {
      throw e;
    }
  }
  async getUserByHandle(handle: string): Promise<UserDto> {
    try {
      return (await this.axios.get(this.url + "users/handle/" + handle)).data;
    } catch (e) {
      throw e;
    }
  }
}
