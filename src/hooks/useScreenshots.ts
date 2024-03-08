import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { SCreenshot } from "../entities/Screenshot";

const useScreenShots = (gameId: number) => {
  const apiClient = new ApiClient<SCreenshot>(`/games/${gameId}/screenshots`);

  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: () => apiClient.getAll(),
  });
};

export default useScreenShots;
