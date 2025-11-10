import { Navigate, useLocation } from "react-router-dom";
import { hasToken } from "@/lib/auth";
import { LoginForm } from "@/components/loginform";
import { ROUTES } from "@/constants/routes";

export const LoginPage = () => {
  const location = useLocation();
  const token = hasToken();

  // 이미 로그인되어 있으면 이전 페이지 또는 홈으로 리다이렉트
  if (token) {
    const from = (location.state as { from?: { pathname: string } })?.from
      ?.pathname;
    const redirectTo =
      from && from !== ROUTES.LOGIN.path ? from : ROUTES.HOME.path;
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm className="min-w-sm" />
      </div>
    </div>
  );
};
