/**
 * posts feature 전용 타입
 * 공통 타입은 @/feature/shared/types에서 import
 */

import type { Category, Post } from "@/feature/shared/types";

// PostResponse
export interface PostResponse {
  items: Post[];
  nextCursor: string | null;
  prevCursor: string | null;
}

// 게시글 목록 조회 쿼리 파라미터
export interface GetPostsParams {
  limit?: number; // 페이지 크기 (1~100, 기본값: 10)
  prevCursor?: string; // 이전 페이지용 커서
  nextCursor?: string; // 다음 페이지용 커서
  sort?: "createdAt" | "title"; // 정렬 필드
  order?: "asc" | "desc"; // 정렬 방향
  category?: Category; // 카테고리 필터
  from?: string; // 시작 날짜 ($date-time)
  to?: string; // 종료 날짜 ($date-time)
  search?: string; // 제목/본문 검색어
}

// 게시글 작성 요청
export interface CreatePostRequest {
  title: string; // 최대 80자
  body: string; // 최대 2000자
  category: Category;
  tags: string[]; // 중복 제거, 최대 5개, 각 24자 이내
}

// 게시글 수정 요청
export interface UpdatePostRequest {
  title?: string;
  body?: string;
  category?: Category;
  tags?: string[];
}
