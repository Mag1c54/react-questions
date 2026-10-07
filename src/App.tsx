
import { AppRouter } from "./providers/router/AppRouter";
import "./styles/global.scss";
import ErrorBoundary from "@/shared/ui/ErrorBoundary";

function App() {
  return (
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
  );
}

export default App;
