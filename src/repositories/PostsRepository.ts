import { PostDto } from "../../../twittermini-api/src/modules/posts/dtos/post.dto";
import { AxiosInstance } from "axios";
import { CreatePostDto } from "../../../twittermini-api/src/modules/posts/dtos/add-post.dto";
export default class PostsRepository {
  constructor(private axios: AxiosInstance) {}
  private url = this.axios.getUri();

  async getPostsFromUser(userId: number): Promise<PostDto[]> {
    try {
      return (await this.axios.get(this.url + "users/" + userId + "/posts"))
        .data;
    } catch (e) {
      throw e;
    }
  }

  async getAllPosts(): Promise<PostDto[]> {
    try {
      return (await this.axios.get(this.url + "posts")).data;
    } catch (e) {
      throw e;
    }
  }

  async createPost(createPostDto: CreatePostDto): Promise<number> {
    try {
      return (await this.axios.post(this.url + "posts", createPostDto)).data;
    }
    catch(e) {
      throw e;
    }
  }

  async getPost(id: number): Promise<PostDto> {
    try {
      return (await this.axios.get(this.url + "posts/" + id)).data;
    }
    catch (e) {
      throw e;
    }
  }
}
