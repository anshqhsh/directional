/**
 * 인증 응답 타입
 */
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
