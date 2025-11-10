import { QueryClient } from "@tanstack/react-query";
import { calculateExponentialBackoff } from "./api";

// API 에러 타입 정의 (Axios 에러 타입)
interface ApiError {
  response?: {
    status?: number;
    data?: unknown;
  };
}

// React Query 클라이언트 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분간 캐시 유지 (300000ms)
      staleTime: 5 * 60 * 1000,
      // 1시간 후 가비지 컬렉션 (3600000ms)
      gcTime: 1 * 60 * 60 * 1000,
      // 에러시 재시도 설정
      retry: (failureCount, error: unknown) => {
        // 4xx 에러는 재시도하지 않음 (클라이언트 에러)
        if (error && typeof error === "object" && "response" in error) {
          const apiError = error as ApiError;
          if (
            apiError.response?.status &&
            apiError.response.status >= 400 &&
            apiError.response.status < 500
          ) {
            return false;
          }
        }
        // 최대 3번까지 재시도
        return failureCount < 3;
      },
      // 재시도 간격 (지수 백오프, 최대 30초)
      retryDelay: (attemptIndex) => calculateExponentialBackoff(attemptIndex),
      refetchInterval: 5 * 1000,
      // 윈도우 포커스시 refetch 비활성화
      refetchOnWindowFocus: false,
      // 네트워크 재연결시 refetch
      refetchOnReconnect: true,
      // 컴포넌트 마운트시 refetch
      refetchOnMount: true,
    },
  },
});
