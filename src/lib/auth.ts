import type { JWTTokenPayload } from "@/feature/shared/types";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "auth_token";

/**
 * JWT 토큰 디코딩
 */
export const decodeJWT = (token: string): JWTTokenPayload | null => {
  try {
    // jwt-decode 라이브러리를 사용하여 JWT 디코딩
    const decoded = jwtDecode<JWTTokenPayload>(token);

    // JWT payload에서 사용자 정보 추출
    return decoded;
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return null;
  }
};

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
export const getUser = (): JWTTokenPayload | null => {
  const token = getToken();
  if (!token) {
    return null;
  }
  return decodeJWT(token);
};

export const removeUser = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("사용자 정보 삭제 실패:", error);
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
    removeUser(); // 토큰 삭제 시 사용자 정보도 삭제
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
