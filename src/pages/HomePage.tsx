import { Link } from "react-router-dom";
import { hasToken } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import { MockPostsSection } from "@/components/posts/MockPostsSection";

export const HomePage = () => {
  const isLoggedIn = hasToken();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 게시판 카드 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              게시판
            </h2>
            <p className="text-gray-600 mb-4">
              게시글 작성, 조회, 수정, 삭제가 가능한 게시판입니다.
            </p>
            {isLoggedIn ? (
              <Link
                to={ROUTES.POSTS.path}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                게시판으로 이동
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN.path}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                로그인 후 이용
              </Link>
            )}
          </div>

          {/* 데이터 시각화 카드 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              데이터 시각화
            </h2>
            <p className="text-gray-600 mb-4">
              스택형 바 / 면적 차트 / 멀티 라인 차트
            </p>
            <Link
              to={ROUTES.CHARTS.path}
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              차트 보기
            </Link>
          </div>
        </div>

        {/* Mock 게시판 섹션 */}
        <MockPostsSection />
      </div>
    </div>
  );
};
