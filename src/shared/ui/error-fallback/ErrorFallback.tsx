import type { FallbackProps } from "react-error-boundary";
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
        <button
          type="button"
          className="error-fallback__btn error-fallback__btn--primary"
          onClick={resetErrorBoundary}
        >
          Попробовать снова
        </button>

        {fullScreen && (
          <button
            type="button"
            className="error-fallback__btn error-fallback__btn--outline"
            onClick={() => window.location.reload()}
          >
            Перезагрузить страницу
          </button>
        )}

        <a href="/" className="error-fallback__btn error-fallback__btn--outline">
          На главную
        </a>
      </div>
    </div>
  );
};
