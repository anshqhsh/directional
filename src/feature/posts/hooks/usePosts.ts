import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { GetPostsParams, PostResponse } from "../types";

export const usePosts = (params?: GetPostsParams) => {
  return useQuery<PostResponse>({
    queryKey: QUERY_KEYS.POSTS.LIST(params),
    queryFn: () => postsApi.getPosts(params),
  });
};
