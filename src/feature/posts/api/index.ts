import { api } from "@/lib/axios";
import type { PostResponse } from "../types";

export const postsApi = {
  getPosts: () => api.get<PostResponse>("/posts"),
};
