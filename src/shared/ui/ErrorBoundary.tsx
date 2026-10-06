import { Component, type ReactNode, type ErrorInfo } from "react";
import "./ErrorBoundary.scss";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="error-container">
          <h2 className="error-container__title">Что-то пошло не так.</h2>
          <p className="error-container__text">
            {this.state.error?.toString()}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
