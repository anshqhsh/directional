/**
 * 지수 백오프 재시도 간격 계산 (React Query retryDelay용)
 * @description 음수 시도 횟수는 0으로 처리
 * @param attemptIndex 재시도 횟수 (0부터 시작)
 * @param baseDelay 기본 대기 시간 (밀리초, 기본값: 1000ms)
 * @param maxDelay 최대 대기 시간 (밀리초, 기본값: 30000ms)
 * @returns 대기 시간 (밀리초)
 */
export const calculateExponentialBackoff = (
  attemptIndex: number,
  baseDelay: number = 1000,
  maxDelay: number = 30000
): number => {
  const validAttemptIndex = Math.max(0, attemptIndex);
  return Math.min(baseDelay * 2 ** validAttemptIndex, maxDelay);
};
