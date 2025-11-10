import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RouteGuard } from "./components/RouteGuard";
import { Layout } from "./components/Layout";
import { ROUTES } from "./constants/routes";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { PostsPage } from "./pages/PostsPage";
import { ChartsPage } from "./pages/ChartsPage";
import { ErrorBoundary } from "./components/error";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN.path} element={<LoginPage />} />
          <Route
            path={ROUTES.HOME.path}
            element={
              <RouteGuard isAuthRequired={ROUTES.HOME.isAuthRequired}>
                <Layout>
                  <HomePage />
                </Layout>
              </RouteGuard>
            }
          />
          <Route
            path={ROUTES.POSTS.path}
            element={
              <RouteGuard isAuthRequired={ROUTES.POSTS.isAuthRequired}>
                <Layout>
                  <PostsPage />
                </Layout>
              </RouteGuard>
            }
          />
          <Route
            path={ROUTES.CHARTS.path}
            element={
              <RouteGuard isAuthRequired={ROUTES.CHARTS.isAuthRequired}>
                <Layout>
                  <ChartsPage />
                </Layout>
              </RouteGuard>
            }
          />
          {/* 404 */}
          <Route
            path="*"
            element={<Navigate to={ROUTES.LOGIN.path} replace />}
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
