import ApiClient, { FetchResponse } from "../services/api-client";
import { GameQuery } from "../App";
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
      genres: gameQuery.genre?.id,
      parent_platforms: gameQuery.platform?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText,
      page: pageParam,
    },
  });
};

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<FetchResponse<Game>>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) => fetchPage(pageParam as number, gameQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
  });

export default useGames;
