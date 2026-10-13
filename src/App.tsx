import { ErrorBoundary } from "react-error-boundary";
import { AppRouter } from "./providers/router/AppRouter";
import "./styles/global.scss";
import { logError } from "@/shared/lib/logError";
import { ErrorFallback } from "@/shared/ui/error-fallback/ErrorFallback";

function App() {
  return (
    <ErrorBoundary
      fallbackRender={(props) => <ErrorFallback {...props} fullScreen />}
      onError={logError}
    >
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
