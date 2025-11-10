import { Navigate } from "react-router-dom";
import { hasToken } from "@/lib/auth";
import { LoginForm } from "@/components/loginform";
import { ROUTES } from "@/constants/routes";

export const LoginPage = () => {
  // 이미 로그인되어 있으면 게시판으로 리다이렉트
  if (hasToken()) {
    return <Navigate to={ROUTES.POSTS.path} replace />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm className="min-w-sm" />
      </div>
    </div>
  );
};
