/**
 * posts feature 전용 타입
 * 공통 타입은 @/feature/shared/types에서 import
 */

import type { Post } from "@/feature/shared/types";

export type { Category, Post } from "@/feature/shared/types";
// PostResponse
export interface PostResponse {
  items: Post[];
  nextCursor: string | null;
  prevCursor: string | null;
}
