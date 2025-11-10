/**
 * 라우트 경로 상수
 * 모든 라우트 경로를 중앙에서 관리합니다.
 */
export const ROUTES = {
  // 공개 라우트
  HOME: {
    path: "/",
    name: "Home",
    isAuthRequired: false,
  },
  LOGIN: {
    path: "/login",
    name: "Login",
    isAuthRequired: false,
  },
  CHARTS: {
    path: "/charts",
    name: "Charts",
    isAuthRequired: true,
  },
  POSTS: {
    path: "/posts",
    name: "Posts",
    isAuthRequired: true,
  },
} as const;
