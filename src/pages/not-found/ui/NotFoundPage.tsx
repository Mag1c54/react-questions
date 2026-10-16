import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found__card">
        <img src="/404.png" alt="404 Страница не найдена" className="not-found__image" />

        <p className="not-found__text">Страница не найдена</p>

        <Link to="/" className="not-found__btn">
          Вернуться назад
        </Link>
      </div>
    </div>
  );
};
