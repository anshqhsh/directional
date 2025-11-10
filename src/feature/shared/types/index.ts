/**
 * 여러 feature에서 공통으로 사용하는 타입
 */
import type { CATEGORIES } from "@/constants/posts";

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// Post
export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: Category;
  tags: string[];
  createdAt: string; //$date-time ex) 2025-11-05T06:39:19.552Z
}

export interface JWTTokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}