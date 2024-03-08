import ApiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import { Genre } from "../entities/Genre";

const apiClient = new ApiClient<Genre>("/genres");

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () => apiClient.getAll(),

    staleTime: 24 * 60 * 60 * 1000, // 24H
    initialData: { count: genres.length, results: genres },
  });

export default useGenres;
