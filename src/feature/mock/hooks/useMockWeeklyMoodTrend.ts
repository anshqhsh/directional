import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { MockWeeklyMoodTrendResponse } from "../types";

export const useMockWeeklyMoodTrend = () => {
  return useQuery<MockWeeklyMoodTrendResponse>({
    queryKey: QUERY_KEYS.MOCK.WEEKLY_MOOD_TREND,
    queryFn: mockApi.getWeeklyMoodTrend,
  });
};
