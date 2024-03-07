import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "95af713b7a4444a296bd57acd15e6703",
  },
  headers: { "Content-Type": "application/json" },
});
