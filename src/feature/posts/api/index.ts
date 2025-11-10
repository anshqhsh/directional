import { api } from "@/lib/axios";
import type {
  PostResponse,
  GetPostsParams,
  CreatePostRequest,
  UpdatePostRequest,
} from "../types";
import type { Post } from "@/feature/shared/types";

export const postsApi = {
  /**
   * 게시글 목록 조회
   */
  getPosts: (params?: GetPostsParams) => {
    const searchParams = new URLSearchParams();

    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.prevCursor)
      searchParams.append("prevCursor", params.prevCursor);
    if (params?.nextCursor)
      searchParams.append("nextCursor", params.nextCursor);
    if (params?.sort) searchParams.append("sort", params.sort);
    if (params?.order) searchParams.append("order", params.order);
    if (params?.category) searchParams.append("category", params.category);
    if (params?.from) searchParams.append("from", params.from);
    if (params?.to) searchParams.append("to", params.to);
    if (params?.search) searchParams.append("search", params.search);

    const queryString = searchParams.toString();
    const url = queryString ? `/posts?${queryString}` : "/posts";

    return api.get<PostResponse>(url);
  },

  /**
   * 게시글 상세 조회
   */
  getPost: (id: string) => api.get<Post>(`/posts/${id}`),

  /**
   * 게시글 작성
   */
  createPost: (data: CreatePostRequest) => api.post<Post>("/posts", data),

  /**
   * 게시글 수정
   */
  updatePost: (id: string, data: UpdatePostRequest) =>
    api.patch<Post>(`/posts/${id}`, data),

  /**
   * 게시글 삭제
   */
  deletePost: (id: string) => api.delete<void>(`/posts/${id}`),

  /**
   * 내 모든 게시글 삭제
   */
  deleteAllPosts: () => api.delete<void>("/posts"),
};
