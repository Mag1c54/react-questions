import type { FallbackProps } from "react-error-boundary";
import { Button } from "../button/Button";
import { buttonClassName } from "../button/buttonClassName";
import "./ErrorFallback.scss";

interface ErrorFallbackProps extends FallbackProps {
  fullScreen?: boolean;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  fullScreen = false,
}: ErrorFallbackProps) => {
  const message = error instanceof Error ? error.message : String(error);

  return (
    <div
      role="alert"
      className={`error-fallback ${fullScreen ? "error-fallback--fullscreen" : ""}`}
    >
      <h2 className="error-fallback__title">Что-то пошло не так</h2>
      <p className="error-fallback__text">
        Произошла непредвиденная ошибка. Попробуйте ещё раз или вернитесь на главную.
      </p>

      {import.meta.env.DEV && <pre className="error-fallback__details">{message}</pre>}

      <div className="error-fallback__actions">
        <Button type="button" onClick={resetErrorBoundary}>
          Попробовать снова
        </Button>

        {fullScreen && (
          <Button type="button" variant="outline" onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </Button>
        )}

        <a href="/" className={buttonClassName({ variant: "outline" })}>
          На главную
        </a>
      </div>
    </div>
  );
};
