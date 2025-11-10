/**
 * React Query의 query key를 중앙 관리하는 파일
 * 타입 안정성을 위해 객체 형태로 관리합니다.
 */
export const QUERY_KEYS = {
  // auth
  AUTH: {
    LOGIN: ["auth", "login"] as const,
  },

  // posts
  POSTS: {
    ALL: ["posts"] as const,
    LIST: (params?: unknown) => ["posts", "list", params] as const,
    DETAIL: (id: string) => ["posts", id] as const,
  },

  // mock
  MOCK: {
    POSTS: ["mock", "posts"] as const,
    COFFEE_CONSUMPTION: ["mock", "coffee-consumption"] as const,
    WEEKLY_MOOD_TREND: ["mock", "weekly-mood-trend"] as const,
    TOP_COFFEE_BRANDS: ["mock", "top-coffee-brands"] as const,
  },
} as const;
