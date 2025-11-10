import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { Post } from "@/feature/shared/types";

export const usePostDetail = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<Post>({
    queryKey: QUERY_KEYS.POSTS.DETAIL(id),
    queryFn: () => postsApi.getPost(id),
    enabled: !!id && options?.enabled !== false,
  });
};
