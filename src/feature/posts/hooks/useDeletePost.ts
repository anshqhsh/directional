import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../api";
import { QUERY_KEYS } from "@/feature/query-keys";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postsApi.deletePost(id),
    onSuccess: (_, id) => {
      // 게시글 목록 및 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POSTS.DETAIL(id),
      });
    },
  });
};
