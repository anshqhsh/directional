import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";
import type { UpdatePostRequest } from "../types";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) =>
      postsApi.updatePost(id, data),
    onSuccess: (_, variables) => {
      // 게시글 목록 및 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POSTS.DETAIL(variables.id),
      });
    },
  });
};
