import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { logError } from "@/shared/lib/logError";
import { ErrorFallback } from "@/shared/ui/error-fallback/ErrorFallback";
import { Header } from "@/widgets/header/ui/Header";
import { Footer } from "@/widgets/footer/ui/Footer";

export const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="app">
      <Header />

      <ErrorBoundary
        fallbackRender={(props) => <ErrorFallback {...props} />}
        onError={logError}
        resetKeys={[pathname]}
      >
        <Outlet />
      </ErrorBoundary>

      <Footer />
    </div>
  );
};
