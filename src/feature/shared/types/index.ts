/**
 * 여러 feature에서 공통으로 사용하는 타입
 */

// Category
export type Category = "NOTICE" | "QNA" | "FREE";

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
