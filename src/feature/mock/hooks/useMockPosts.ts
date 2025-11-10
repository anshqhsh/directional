import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { MockPostResponse } from "../types";

export const useMockPosts = () => {
  return useQuery<MockPostResponse>({
    queryKey: QUERY_KEYS.MOCK.POSTS,
    queryFn: mockApi.getPosts,
  });
};
