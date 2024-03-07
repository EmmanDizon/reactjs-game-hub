import apiClient, { FetchResponse } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient.get<FetchResponse<Genre>>("/genres").then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 24H
    initialData: { count: genres.length, results: genres },
  });

export default useGenres;
