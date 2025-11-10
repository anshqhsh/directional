import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { CreatePostRequest } from "../types";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postsApi.createPost(data),
    onSuccess: () => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS.ALL });
    },
  });
};
