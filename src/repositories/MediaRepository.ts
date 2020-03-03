import { AxiosInstance } from "axios";
export default class MediaRepository {
  constructor(private axios: AxiosInstance) {}

  private url = this.axios.getUri();

  async uploadImage(file: File): Promise<number> {
    const formData = new FormData();
    formData.append("image", file);
    try {
      return (await this.axios.post(this.url + "media/upload", formData)).data;
    } catch (e) {
      throw e;
    }
  }
}
