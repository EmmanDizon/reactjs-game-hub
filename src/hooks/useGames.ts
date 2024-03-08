import ApiClient, { FetchResponse } from "../services/api-client";
import useGameQueryStore, { GameQuery } from "../store";
import { Platform } from "./usePlatforms";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const apiClient = new ApiClient<Game>("/games");

const fetchPage = (pageParam: number, gameQuery: GameQuery) => {
  return apiClient.getAll({
    params: {
      genres: gameQuery.genreId,
      parent_platforms: gameQuery.platformId,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText,
      page: pageParam,
    },
  });
};

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useInfiniteQuery<FetchResponse<Game>>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) => fetchPage(pageParam as number, gameQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useGames;
