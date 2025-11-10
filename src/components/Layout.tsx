import { Header } from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Header를 포함한 레이아웃 컴포넌트
 * 로그인 페이지를 제외한 모든 페이지에 사용
 */
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
