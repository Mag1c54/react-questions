import { Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import type { Collection } from "@/entities/collection/model/types";
import "./CollectionInfoWidget.scss";

const TELEGRAM_URL = "https://t.me/"; // подставь свою ссылку

interface CollectionInfoWidgetProps {
  collection: Collection;
}

export const CollectionInfoWidget = ({ collection }: CollectionInfoWidgetProps) => {
  const { specializations, isFree, company, createdBy, questionsCount, keywords } =
    collection;

  return (
    <div className="collection-info">
      {specializations.length > 0 && (
        <div className="collection-info__group">
          <h3 className="collection-info__label">Специализация</h3>
          <div className="collection-info__chips">
            {specializations.map((spec) => (
              <Link
                key={spec.id}
                to={`/collections?specializations=${spec.id}`}
                className="collection-info__chip collection-info__chip--link"
              >
                {spec.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="collection-info__group">
        <h3 className="collection-info__label">Доступ</h3>
        <div className="collection-info__chips">
          <span className="collection-info__chip">
            {isFree ? "Для всех" : "Для участников"}
          </span>
        </div>
      </div>

      {company && (
        <div className="collection-info__group">
          <h3 className="collection-info__label">Компания</h3>
          <div className="collection-info__chips">
            <span className="collection-info__chip collection-info__chip--company">
              {company.imageSrc && (
                <img src={company.imageSrc} alt="" className="collection-info__company-logo" />
              )}
              {company.title}
            </span>
          </div>
        </div>
      )}

      <div className="collection-info__group">
        <h3 className="collection-info__label">Автор</h3>
        <span className="collection-info__author">{createdBy.username}</span>
      </div>

      <div className="collection-info__group">
        <h3 className="collection-info__label">Количество вопросов</h3>
        <div className="collection-info__chips">
          <span className="collection-info__chip collection-info__chip--accent">
            {questionsCount}
          </span>
        </div>
      </div>

      {keywords.length > 0 && (
        <div className="collection-info__group">
          <h3 className="collection-info__label">Ключевые слова</h3>
          <ul className="collection-info__keywords">
            {keywords.map((keyword) => (
              <li key={keyword} className="collection-info__keyword">
                #{keyword}
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="collection-info__telegram"
      >
        <FaTelegramPlane className="collection-info__telegram-icon" aria-hidden="true" />
        <span>
          Подпишись на <span className="collection-info__telegram-name">Python Developer</span>{" "}
          в Telegram
        </span>
      </a>
    </div>
  );
};