import { useQuery } from "@tanstack/react-query";
import { mockApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { MockPostResponse } from "../types";

interface UseMockPostsOptions {
  count?: number;
}

export const useMockPosts = (options?: UseMockPostsOptions) => {
  return useQuery<MockPostResponse>({
    queryKey: [...QUERY_KEYS.MOCK.POSTS, options?.count],
    queryFn: () => mockApi.getPosts(options?.count),
  });
};
