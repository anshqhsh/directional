const TOKEN_KEY = "auth_token";

/**
 * 토큰 저장
 */
export const setToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("토큰 저장 실패:", error);
    // localStorage가 비활성화된 경우 처리
  }
};

/**
 * 토큰 조회
 */
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("토큰 조회 실패:", error);
    return null;
  }
};

/**
 * 토큰 삭제
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("토큰 삭제 실패:", error);
  }
};

/**
 * 토큰 존재 여부 확인
 */
export const hasToken = (): boolean => {
  return getToken() !== null;
};
