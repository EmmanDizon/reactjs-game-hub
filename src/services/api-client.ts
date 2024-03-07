import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next?: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "95af713b7a4444a296bd57acd15e6703",
  },
  headers: { "Content-Type": "application/json" },
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll(config?: AxiosRequestConfig) {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  }
}

export default ApiClient;
