import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path={ROUTES.HOME.path} element={<HomePage />} />
            <Route path={ROUTES.POSTS.path} element={<PostsPage />} />
            <Route path={ROUTES.CHARTS.path} element={<ChartsPage />} />
          </Route>
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
