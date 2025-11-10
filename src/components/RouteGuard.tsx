import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { hasToken } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";

interface RouteGuardProps {
  children: ReactNode;
  isAuthRequired: boolean;
}

/**
 * 라우트 보호 컴포넌트
 * 현재 경로를 기반으로 isAuthRequired를 확인하여
 * 인증이 필요한데 토큰이 없으면 로그인 페이지로 리다이렉트
 * 인증이 필요 없으면 접근 허용
 */
export const RouteGuard = ({ children, isAuthRequired }: RouteGuardProps) => {
  const location = useLocation();
  const token = hasToken();

  // 현재 경로가 로그인 페이지면 처리하지 않음
  if (location.pathname === ROUTES.LOGIN.path) {
    return <>{children}</>;
  }

  // 인증이 필요한데 토큰이 없으면 로그인 페이지로 리다이렉트 (이전 경로 정보 포함)
  if (isAuthRequired && !token) {
    return (
      <Navigate to={ROUTES.LOGIN.path} replace state={{ from: location }} />
    );
  }

  // 인증이 필요 없으면 접근 허용
  return <>{children}</>;
};
