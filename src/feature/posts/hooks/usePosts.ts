import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { PostResponse } from "../types";

export const usePosts = () => {
  return useQuery<PostResponse>({
    queryKey: QUERY_KEYS.POSTS.ALL,
    queryFn: postsApi.getPosts,
  });
};
