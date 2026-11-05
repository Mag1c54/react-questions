import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { logError } from "@/shared/lib";
import { ErrorFallback } from "@/shared/ui";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

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
