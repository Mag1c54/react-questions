import { Link } from "react-router-dom";
import { FiGlobe, FiHelpCircle, FiUsers } from "react-icons/fi";
import type { Collection } from "../../model/types";
import "./CollectionCard.scss";
import { CollectionImage } from "../collection-image/CollectionImage";

const pluralize = (n: number, forms: [string, string, string]) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return forms[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return forms[1];
  return forms[2];
};

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  const {
    id,
    title,
    imageSrc,
    keywords,
    isFree,
    questionsCount,
    specializations,
  } = collection;

  return (
    <Link to={`/collections/${id}`} className="collection-card">
      <CollectionImage src={imageSrc} className="collection-card__image" />

      <div className="collection-card__content">
        {keywords.length > 0 && (
          <ul className="collection-card__tags">
            {keywords.slice(0, 3).map((keyword) => (
              <li key={keyword} className="collection-card__tag">
                {keyword}
              </li>
            ))}
          </ul>
        )}

        <h2 className="collection-card__title">{title}</h2>

        <div className="collection-card__meta">
          <span className="collection-card__meta-item">
            {isFree ? (
              <FiGlobe aria-hidden="true" />
            ) : (
              <FiUsers aria-hidden="true" />
            )}
            {isFree ? "Для всех" : "Для участников"}
          </span>
          <span className="collection-card__meta-item">
            <FiHelpCircle aria-hidden="true" />
            {questionsCount}{" "}
            {pluralize(questionsCount, ["вопрос", "вопроса", "вопросов"])}
          </span>
        </div>

        {specializations.length > 0 && (
          <p className="collection-card__specs">
            {specializations.map((s) => s.title).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
};
