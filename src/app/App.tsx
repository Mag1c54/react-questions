import { ErrorBoundary } from "react-error-boundary";
import { AppRouter } from "./router/AppRouter";
import "./styles/global.scss";
import { logError } from "@/shared/lib";
import { ErrorFallback } from "@/shared/ui";

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
