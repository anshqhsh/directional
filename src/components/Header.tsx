import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, removeToken, hasToken } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(getUser());
  const [isLoggedIn, setIsLoggedIn] = useState(hasToken());

  // 토큰 상태 변경 감지
  useEffect(() => {
    const checkAuth = () => {
      setUser(getUser());
      setIsLoggedIn(hasToken());
    };

    // 초기 체크
    checkAuth();

    // storage 이벤트 리스너 (다른 탭에서 로그아웃한 경우)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    removeToken();

    // 상태 즉시 업데이트
    setUser(null);
    setIsLoggedIn(false);

    // 현재 경로에 해당하는 라우트 찾기
    const currentRoute = Object.values(ROUTES).find(
      (route) => route.path === location.pathname
    );

    // 현재 페이지가 isAuthRequired: true인 페이지면 홈으로 리다이렉트
    // 그 외에는 현재 페이지에 그대로 유지
    if (currentRoute?.isAuthRequired) {
      navigate(ROUTES.HOME.path, { replace: true });
    }
    // isAuthRequired: false인 페이지는 그대로 유지 (리다이렉트 없음)
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN.path, { replace: true });
  };

  const handleGoToHome = () => {
    navigate(ROUTES.HOME.path, { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1
            onClick={handleGoToHome}
            className="text-lg font-semibold cursor-pointer hover:opacity-80 transition-opacity"
          >
            Directional
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {user.email || user.userId}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogin}
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
